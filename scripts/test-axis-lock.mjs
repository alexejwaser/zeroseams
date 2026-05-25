/**
 * Playwright/Electron test for Shift+drag axis lock (issue #29).
 * Tests that holding Shift during drag constrains movement to
 * horizontal, vertical, or 45° diagonal.
 *
 * Run: node scripts/test-axis-lock.mjs
 * Requires: npm run build first
 */
import { _electron as electron } from 'playwright'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'

const ROOT = path.resolve(fileURLToPath(import.meta.url), '../..')
const ELECTRON_BIN = path.join(ROOT, 'node_modules/electron/dist/Electron.app/Contents/MacOS/Electron')
const SHOTS = '/tmp/zeroseams-axis-lock-tests'
fs.mkdirSync(SHOTS, { recursive: true })

let passed = 0, failed = 0
const failures = []

function ok(cond, msg) {
  if (cond) { console.log(`  ✓ ${msg}`); passed++ }
  else       { console.log(`  ✗ ${msg}`); failed++; failures.push(msg) }
}
function near(a, b, tol, msg) {
  const diff = Math.abs(a - b)
  if (diff <= tol) { console.log(`  ✓ ${msg}  (${a.toFixed(1)} ≈ ${b.toFixed(1)})`); passed++ }
  else             { console.log(`  ✗ ${msg}  (got ${a.toFixed(1)}, want ${b.toFixed(1)}, Δ=${diff.toFixed(2)})`); failed++; failures.push(`${msg}: got=${a.toFixed(1)} want=${b.toFixed(1)}`) }
}

const app = await electron.launch({
  executablePath: ELECTRON_BIN,
  args: [path.join(ROOT, 'out/main/index.js')],
  timeout: 30_000,
})
const page = app.windows().find(w => !w.url().startsWith('devtools://')) ?? await app.firstWindow()

const wait = (ms) => new Promise(r => setTimeout(r, ms))
const ss = (n) => page.screenshot({ path: `${SHOTS}/${n}.png` }).then(() => console.log(`    📸 ${n}`))

await page.waitForSelector('canvas', { timeout: 12_000 })
await wait(1500)

const storeReady = await page.evaluate(() => typeof window.__canvasStore__ !== 'undefined')
if (!storeReady) {
  console.error('FATAL: __canvasStore__ not exposed.')
  await app.close()
  process.exit(1)
}
console.log('✓ Store exposed')

// ─── Helpers ─────────────────────────────────────────────────────────────────

const getObjects = () => page.evaluate(() => window.__canvasStore__?.getState().objects ?? {})

const getStageInfo = () => page.evaluate(() => {
  const stage = window.Konva?.stages?.[0]
  if (!stage) return null
  const r = stage.container().getBoundingClientRect()
  return { left: r.left, top: r.top, sx: stage.scaleX(), sy: stage.scaleY(), tx: stage.x(), ty: stage.y() }
})

/** Konva canvas coords → page pixel coords */
const k2p = async (kx, ky) => {
  const s = await getStageInfo()
  return { x: s.left + s.tx + kx * s.sx, y: s.top + s.ty + ky * s.sy }
}

const resetCanvas = () => page.evaluate(() => {
  const s = window.__canvasStore__?.getState()
  if (!s) return
  for (const id of s.objectOrder) s.removeObject(id)
  s.setSelected(null)
})

/** Add a rect shape at given canvas coords, returns id. */
const addRect = (kx, ky, kw, kh) => page.evaluate(([kx, ky, kw, kh]) => {
  const id = crypto.randomUUID()
  window.__canvasStore__.getState().addObject({
    id, type: 'shape', kind: 'rect', scope: 'global',
    x: kx, y: ky, width: kw, height: kh,
    fill: '#4488ff', stroke: 'transparent', strokeWidth: 2,
    cornerRadius: 0, rotation: 0, opacity: 1, visible: true, locked: false,
    zIndex: 0,
  })
  return id
}, [kx, ky, kw, kh])

/** Click a point in Konva canvas coords to select it. */
async function clickAt(kx, ky, opts = {}) {
  const p = await k2p(kx, ky)
  if (opts.shift) await page.keyboard.down('Shift')
  await page.mouse.click(p.x, p.y)
  if (opts.shift) await page.keyboard.up('Shift')
  await wait(150)
}

/**
 * Drag from Konva canvas (fromKx, fromKy) to (toKx, toKy).
 * If shiftDuring=true, holds Shift throughout the drag.
 */
async function drag(fromKx, fromKy, toKx, toKy, { shiftDuring = false, steps = 15 } = {}) {
  const from = await k2p(fromKx, fromKy)
  const to = await k2p(toKx, toKy)
  if (shiftDuring) await page.keyboard.down('Shift')
  await page.mouse.move(from.x, from.y)
  await page.mouse.down()
  await wait(50)
  await page.mouse.move(to.x, to.y, { steps })
  await wait(50)
  await page.mouse.up()
  if (shiftDuring) await page.keyboard.up('Shift')
  await wait(400)
}

// ═══════════════════════════════════════════════════════════════════════════════
// TEST SUITE
// ═══════════════════════════════════════════════════════════════════════════════

console.log('\n═══ Axis Lock: Shift+drag ════════════════════════════════════════\n')

// ──────────────────────────────────────────────────────────────────────────────
// 1. Horizontal lock — drag mostly right, small Y component
// ──────────────────────────────────────────────────────────────────────────────
console.log('TEST 1: Horizontal axis lock (Shift + mostly-horizontal drag)')
await resetCanvas(); await wait(200)

const id1 = await addRect(200, 200, 80, 80)
await wait(100)
await page.keyboard.press('v'); await wait(80)
await clickAt(240, 240)  // click center of rect to select
await wait(150)

const startObjs1 = await getObjects()
const startY1 = startObjs1[id1]?.y ?? 200

// Drag right 100px, down 15px — mostly horizontal, shift held
await drag(240, 240, 340, 255, { shiftDuring: true })
await ss('01-horizontal-lock')

const objs1 = await getObjects()
const obj1 = objs1[id1]
ok(obj1 !== undefined, 'object still exists after drag')
near(obj1.y, startY1, 4, 'Y unchanged (horizontal lock)')
ok(obj1.x > 250, 'X increased (moved right)')
console.log(`  Final pos: x=${obj1.x?.toFixed(1)}, y=${obj1.y?.toFixed(1)}`)

// ──────────────────────────────────────────────────────────────────────────────
// 2. Vertical lock — drag mostly down, small X component
// ──────────────────────────────────────────────────────────────────────────────
console.log('\nTEST 2: Vertical axis lock (Shift + mostly-vertical drag)')
await resetCanvas(); await wait(200)

const id2 = await addRect(200, 200, 80, 80)
await wait(100)
await page.keyboard.press('v'); await wait(80)
await clickAt(240, 240)
await wait(150)

const startObjs2 = await getObjects()
const startX2 = startObjs2[id2]?.x ?? 200

// Drag down 100px, right 12px — mostly vertical
await drag(240, 240, 252, 340, { shiftDuring: true })
await ss('02-vertical-lock')

const objs2 = await getObjects()
const obj2 = objs2[id2]
ok(obj2 !== undefined, 'object still exists after drag')
near(obj2.x, startX2, 4, 'X unchanged (vertical lock)')
ok(obj2.y > 240, 'Y increased (moved down)')
console.log(`  Final pos: x=${obj2.x?.toFixed(1)}, y=${obj2.y?.toFixed(1)}`)

// ──────────────────────────────────────────────────────────────────────────────
// 3. 45° diagonal lock
// ──────────────────────────────────────────────────────────────────────────────
console.log('\nTEST 3: 45° diagonal lock (Shift + diagonal drag)')
await resetCanvas(); await wait(200)

const id3 = await addRect(200, 200, 80, 80)
await wait(100)
await page.keyboard.press('v'); await wait(80)
await clickAt(240, 240)
await wait(150)

const startObjs3 = await getObjects()
const startX3 = startObjs3[id3]?.x ?? 200
const startY3 = startObjs3[id3]?.y ?? 200

// Drag at roughly 45°: dx=80, dy=70 — should lock to 45°
await drag(240, 240, 320, 310, { shiftDuring: true })
await ss('03-diagonal-lock')

const objs3 = await getObjects()
const obj3 = objs3[id3]
ok(obj3 !== undefined, 'object still exists after drag')
const dx3 = obj3.x - startX3
const dy3 = obj3.y - startY3
ok(dx3 > 10 && dy3 > 10, 'moved on both axes (diagonal)')
// For 45° lock: |dx| ≈ |dy|
near(Math.abs(dx3), Math.abs(dy3), 8, '|ΔX| ≈ |ΔY| (45° diagonal)')
console.log(`  Final delta: dx=${dx3.toFixed(1)}, dy=${dy3.toFixed(1)}`)

// ──────────────────────────────────────────────────────────────────────────────
// 4. Free drag without Shift — not constrained
// ──────────────────────────────────────────────────────────────────────────────
console.log('\nTEST 4: Free drag without Shift (no constraint)')
await resetCanvas(); await wait(200)

const id4 = await addRect(200, 200, 80, 80)
await wait(100)
await page.keyboard.press('v'); await wait(80)
await clickAt(240, 240)
await wait(150)

const startObjs4 = await getObjects()
const startX4 = startObjs4[id4]?.x ?? 200
const startY4 = startObjs4[id4]?.y ?? 200

// Drag right 80, down 30 — should move freely (non-axis-aligned)
await drag(240, 240, 320, 270, { shiftDuring: false })
await ss('04-free-drag')

const objs4 = await getObjects()
const obj4 = objs4[id4]
ok(obj4 !== undefined, 'object still exists after drag')
const dx4 = obj4.x - startX4
const dy4 = obj4.y - startY4
ok(Math.abs(dx4) > 10, 'X changed in free drag')
ok(Math.abs(dy4) > 5, 'Y changed in free drag (not locked)')
console.log(`  Free drag delta: dx=${dx4.toFixed(1)}, dy=${dy4.toFixed(1)}`)

// ──────────────────────────────────────────────────────────────────────────────
// 5. Multi-select horizontal lock via imperative drag path
// ──────────────────────────────────────────────────────────────────────────────
console.log('\nTEST 5: Multi-select horizontal axis lock (Shift drag on selected group)')
await resetCanvas(); await wait(200)

// Add two rects
const id5a = await addRect(100, 200, 60, 60)
const id5b = await addRect(250, 200, 60, 60)
await wait(100)
await page.keyboard.press('v'); await wait(80)

// Select first rect, then Shift+click second to add
await clickAt(130, 230)
await wait(150)
await clickAt(280, 230, { shift: true })
await wait(150)

const sel5 = await page.evaluate(() => window.__canvasStore__?.getState().selectedIds ?? [])
ok(sel5.length === 2, `Two objects selected (got ${sel5.length})`)

const startObjs5 = await getObjects()
const startY5a = startObjs5[id5a]?.y ?? 200
const startY5b = startObjs5[id5b]?.y ?? 200

// Now drag both right (not holding Shift for the drag since we used Shift for selection)
// For multi-select drag, we need to click+drag WITHOUT using Shift to add objects
// because Shift during drag = axis lock. Click first rect center, drag right with Shift
// But first ensure selection is still multi-select (check)
const sel5check = await page.evaluate(() => window.__canvasStore__?.getState().selectedIds ?? [])
ok(sel5check.length === 2, 'Multi-select intact before drag')

// Drag from center of first rect, right 100px, down 15px — horizontal lock
await drag(130, 230, 230, 245, { shiftDuring: true })
await ss('05-multiselect-horizontal')

const objs5 = await getObjects()
const obj5a = objs5[id5a]
const obj5b = objs5[id5b]
ok(obj5a !== undefined && obj5b !== undefined, 'Both objects survive multi-select drag')
near(obj5a.y, startY5a, 8, 'Rect A: Y unchanged (horizontal lock)')
near(obj5b.y, startY5b, 8, 'Rect B: Y unchanged (horizontal lock)')
ok(obj5a.x > 130, 'Rect A: X increased (moved right)')
console.log(`  A: x=${obj5a.x?.toFixed(1)}, y=${obj5a.y?.toFixed(1)}`)
console.log(`  B: x=${obj5b.x?.toFixed(1)}, y=${obj5b.y?.toFixed(1)}`)

// ──────────────────────────────────────────────────────────────────────────────
// 6. Regression: single rect drag without snap breaks nothing
// ──────────────────────────────────────────────────────────────────────────────
console.log('\nTEST 6: Regression — normal drag still commits position correctly')
await resetCanvas(); await wait(200)

const id6 = await addRect(300, 300, 80, 80)
await wait(100)
await page.keyboard.press('v'); await wait(80)
await clickAt(340, 340)
await wait(150)

await drag(340, 340, 440, 380, { shiftDuring: false })
await ss('06-regression-normal-drag')

const objs6 = await getObjects()
const obj6 = objs6[id6]
ok(obj6 !== undefined, 'object exists after normal drag')
ok(obj6.x > 330, 'X position updated')
ok(obj6.y > 300, 'Y position updated')
console.log(`  Final pos: x=${obj6.x?.toFixed(1)}, y=${obj6.y?.toFixed(1)}`)

// ──────────────────────────────────────────────────────────────────────────────
// 7. Regression: multi-select without Shift drag still works freely
// ──────────────────────────────────────────────────────────────────────────────
console.log('\nTEST 7: Regression — multi-select free drag (no axis lock)')
await resetCanvas(); await wait(200)

const id7a = await addRect(100, 300, 60, 60)
const id7b = await addRect(250, 300, 60, 60)
await wait(100)
await page.keyboard.press('v'); await wait(80)
await clickAt(130, 330)
await wait(150)
await clickAt(280, 330, { shift: true })
await wait(150)

const startObjs7 = await getObjects()
const startX7a = startObjs7[id7a]?.x ?? 100
const startY7a = startObjs7[id7a]?.y ?? 300

// Free drag (no shift) — should move both X and Y
await drag(130, 330, 200, 390, { shiftDuring: false })
await ss('07-multiselect-free')

const objs7 = await getObjects()
const obj7a = objs7[id7a]
const obj7b = objs7[id7b]
ok(obj7a !== undefined && obj7b !== undefined, 'Both objects survive free multi-select drag')
const dx7 = obj7a.x - startX7a
const dy7 = obj7a.y - startY7a
ok(Math.abs(dx7) > 5, 'X changed in free multi-select drag')
ok(Math.abs(dy7) > 5, 'Y changed in free multi-select drag (not locked)')
console.log(`  A delta: dx=${dx7.toFixed(1)}, dy=${dy7.toFixed(1)}`)

// ─── Results ─────────────────────────────────────────────────────────────────
console.log('\n═══════════════════════════════════════════════════════════════════')
console.log(`Total: ${passed + failed} | ✓ ${passed} passed | ✗ ${failed} failed`)
if (failures.length) {
  console.log('\nFailures:')
  failures.forEach(f => console.log(`  - ${f}`))
}
console.log('═══════════════════════════════════════════════════════════════════')

await app.close()
process.exit(failed > 0 ? 1 : 0)
