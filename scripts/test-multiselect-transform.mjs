/**
 * Playwright/Electron test for multi-object transform (issue #26).
 * Tests all combinations of multi-select transforms: scale (all 4 corners),
 * drag, rotate, image content scaling, and single-image proportional default.
 *
 * Run: node scripts/test-multiselect-transform.mjs
 * Requires: npm run build first
 */
import { _electron as electron } from 'playwright'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'

const ROOT = path.resolve(fileURLToPath(import.meta.url), '../..')
const ELECTRON_BIN = path.join(ROOT, 'node_modules/electron/dist/Electron.app/Contents/MacOS/Electron')
const SHOTS = '/tmp/zeroseams-transform-tests'
fs.mkdirSync(SHOTS, { recursive: true })

// ─── Test runner ─────────────────────────────────────────────────────────────
let passed = 0, failed = 0, skipped = 0
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

// ─── Launch ───────────────────────────────────────────────────────────────────
const app = await electron.launch({
  executablePath: ELECTRON_BIN,
  args: [path.join(ROOT, 'out/main/index.js')],
  timeout: 30_000,
})
const page = app.windows().find(w => !w.url().startsWith('devtools://')) ?? await app.firstWindow()
const consoleLogs = []
page.on('console', m => consoleLogs.push(`[${m.type()}] ${m.text()}`))

const ss    = (n) => page.screenshot({ path: `${SHOTS}/${n}.png` }).then(() => console.log(`    📸 ${n}`))
const wait  = (ms) => new Promise(r => setTimeout(r, ms))

await page.waitForSelector('canvas', { timeout: 12_000 })
await wait(1500) // let React + Konva fully mount

// ─── Helpers: store access ────────────────────────────────────────────────────
const getObjects = () => page.evaluate(() => window.__canvasStore__?.getState().objects ?? {})
const getOrder   = () => page.evaluate(() => window.__canvasStore__?.getState().objectOrder ?? [])
const getStore   = () => page.evaluate(() => {
  const s = window.__canvasStore__?.getState()
  if (!s) return null
  return { selectedId: s.selectedId, selectedIds: s.selectedIds, anchorId: s.anchorId }
})
const resetCanvas = () => page.evaluate(() => {
  const s = window.__canvasStore__?.getState()
  if (!s) return
  // Remove all objects and reset selection
  const order = s.objectOrder
  for (const id of order) s.removeObject(id)
  s.setSelected(null)
})

// Verify stores are exposed
const storeReady = await page.evaluate(() => typeof window.__canvasStore__ !== 'undefined')
if (!storeReady) {
  console.error('FATAL: __canvasStore__ not exposed. Did you build with store exposure?')
  await app.close()
  process.exit(1)
}
console.log('✓ Store exposed')

// ─── Helpers: stage coordinate conversion ────────────────────────────────────
const getStageInfo = () => page.evaluate(() => {
  const stage = window.Konva?.stages?.[0]
  if (!stage) return null
  const r = stage.container().getBoundingClientRect()
  return {
    left: r.left, top: r.top,
    sx: stage.scaleX(), sy: stage.scaleY(),
    tx: stage.x(), ty: stage.y(),
  }
})

// Convert Konva canvas coordinates → page coordinates
const k2p = async (kx, ky) => {
  const s = await getStageInfo()
  return { x: s.left + s.tx + kx * s.sx, y: s.top + s.ty + ky * s.sy }
}

// ─── Helpers: UI interactions ─────────────────────────────────────────────────
const pressKey    = (k) => page.keyboard.press(k)
const selectTool  = async () => { await pressKey('v'); await wait(80) }
const shapeTool   = async () => { await pressKey('r'); await wait(80) }
const escape      = async () => { await pressKey('Escape'); await wait(80) }
const clearAll    = async () => { await resetCanvas(); await wait(200) }

/** Draw a rectangle using the shape tool. coords are in PAGE space. */
async function drawRect(px, py, pw, ph) {
  await shapeTool()
  await page.mouse.move(px, py)
  await page.mouse.down()
  await page.mouse.move(px + pw, py + ph, { steps: 5 })
  await page.mouse.up()
  await wait(300)
  await selectTool()
  await wait(100)
}

/** Add an image object directly via the store. Returns the id. */
const addImage = (kx, ky, fw, fh, cOffX, cOffY, cW, cH) => page.evaluate(
  ([kx, ky, fw, fh, cOffX, cOffY, cW, cH]) => {
    const id = crypto.randomUUID()
    // Minimal 10x10 white PNG data URL
    const src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mNk+M9Qz0AEYBxVSF+FAAhKDveksOjmAAAAAElFTkSuQmCC'
    window.__canvasStore__.getState().addObject({
      id, type: 'image', scope: 'global',
      x: kx, y: ky, width: fw, height: fh,
      frameX: kx, frameY: ky, frameWidth: fw, frameHeight: fh,
      contentOffsetX: cOffX, contentOffsetY: cOffY,
      contentWidth: cW, contentHeight: cH,
      naturalWidth: 10, naturalHeight: 10,
      src, rotation: 0, opacity: 1, visible: true, locked: false,
      zIndex: 0, contentEditMode: false, maskEditMode: false,
    })
    return id
  },
  [kx, ky, fw, fh, cOffX, cOffY, cW, cH],
)

/** Click an object in the canvas by its Konva center coordinates. */
async function clickKonvaCenter(kx, ky, kw, kh, shift = false) {
  const p = await k2p(kx + kw / 2, ky + kh / 2)
  if (shift) await page.keyboard.down('Shift')
  await page.mouse.click(p.x, p.y)
  if (shift) await page.keyboard.up('Shift')
  await wait(150)
}

/**
 * Get transformer info from Konva nodes.
 * minNodes: minimum number of attached nodes to find (2 = group, 1 = single).
 * Returns { box, rotateHandleAbs } — box in Konva canvas coords,
 * rotateHandleAbs is the rotation handle position in absolute container pixels.
 */
const getTransformerInfo = (minNodes = 2) => page.evaluate((mn) => {
  const stage = window.Konva?.stages?.[0]
  if (!stage) return null
  const trs = stage.find('Transformer')
  const tr = trs.find(t => t.nodes().length >= mn)
  if (!tr) return null
  // Compute bounding box from attached nodes
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  for (const node of tr.nodes()) {
    const nb = node.getClientRect({ relativeTo: node.getLayer() })
    minX = Math.min(minX, nb.x)
    minY = Math.min(minY, nb.y)
    maxX = Math.max(maxX, nb.x + nb.width)
    maxY = Math.max(maxY, nb.y + nb.height)
  }
  // Find the rotation handle's actual absolute position in the stage container
  const rotater = tr.findOne('.rotater')
  let rotateAbs = null
  if (rotater) {
    const ap = rotater.getAbsolutePosition()
    rotateAbs = { x: ap.x, y: ap.y }  // relative to stage container top-left
  }
  return {
    box: { x: minX, y: minY, w: maxX - minX, h: maxY - minY },
    rotateAbs,  // absolute position within stage container
    nodeCount: tr.nodes().length,
  }
}, minNodes)

const getGroupTransformerBox = async () => {
  const info = await getTransformerInfo(2)
  return info?.box ?? null
}

const getSingleTransformerInfo = async () => getTransformerInfo(1)

/**
 * Drag from (fromPx, fromPy) to (toPx, toPy) in PAGE coordinates.
 */
async function drag(fromPx, fromPy, toPx, toPy, steps = 10) {
  await page.mouse.move(fromPx, fromPy)
  await page.mouse.down()
  await wait(50)
  await page.mouse.move(toPx, toPy, { steps })
  await wait(50)
  await page.mouse.up()
  await wait(400)
}

// ═══════════════════════════════════════════════════════════════════════════════
// TEST SUITE
// ═══════════════════════════════════════════════════════════════════════════════

// Get initial stage info so we know where to draw
const si = await getStageInfo()
console.log('\nStage info:', JSON.stringify(si))
if (!si) { console.error('FATAL: Konva stage not found'); await app.close(); process.exit(1) }

// Center of the first frame in Konva space (1080x1080 first frame)
// Place test objects in the center area
const FRAME_W = 1080, FRAME_H = 1080

// ─── TEST 1: Multi-select two rects — scale from bottom-right corner ──────────
console.log('\n── TEST 1: Multi-select scale (bottom-right corner) ──')
await clearAll()

// Two shapes in Konva space
const s1 = { x: 200, y: 300, w: 200, h: 150 }
const s2 = { x: 500, y: 350, w: 200, h: 150 }

// Draw via UI
await (async () => {
  const p1 = await k2p(s1.x, s1.y)
  await drawRect(p1.x, p1.y, s1.w * si.sx, s1.h * si.sy)
})()
await (async () => {
  const p2 = await k2p(s2.x, s2.y)
  await drawRect(p2.x, p2.y, s2.w * si.sx, s2.h * si.sy)
})()

// Read back actual Konva positions from store (drawing may produce slightly different coords)
const objs1 = await getObjects()
const ids1  = await getOrder()
ok(ids1.length === 2, 'Two objects created')
const [id1a, id1b] = ids1
const obj1a = objs1[id1a], obj1b = objs1[id1b]
if (!obj1a || !obj1b) {
  console.log('  ✗ Could not read objects — skipping test 1'); skipped++
} else {
  const init1a = { x: obj1a.x, y: obj1a.y, w: obj1a.width, h: obj1a.height }
  const init1b = { x: obj1b.x, y: obj1b.y, w: obj1b.width, h: obj1b.height }
  console.log('  Obj A:', JSON.stringify(init1a))
  console.log('  Obj B:', JSON.stringify(init1b))

  // Multi-select: click A, shift+click B
  await clickKonvaCenter(init1a.x, init1a.y, init1a.w, init1a.h)
  await clickKonvaCenter(init1b.x, init1b.y, init1b.w, init1b.h, true)
  await wait(200)

  const store1 = await getStore()
  ok(store1.selectedIds.length === 2, `Two objects in selectedIds (got ${store1.selectedIds.length})`)

  // Find transformer bounding box
  const box1 = await getGroupTransformerBox()
  if (!box1) { console.log('  ✗ No group transformer found'); failed++; failures.push('TEST1: no transformer') }
  else {
    console.log('  Transformer box:', JSON.stringify(box1))

    // Drag bottom-right corner handle inward by 30% of the current size
    const dragFrac = 0.70 // scale to 70% of original
    const handleKX = box1.x + box1.w
    const handleKY = box1.y + box1.h
    const targetKX = box1.x + box1.w * dragFrac
    const targetKY = box1.y + box1.h * dragFrac

    const fromP = await k2p(handleKX, handleKY)
    const toP   = await k2p(targetKX, targetKY)
    await ss('t1-before-scale')
    await drag(fromP.x, fromP.y, toP.x, toP.y)
    await ss('t1-after-scale')

    const objs1After = await getObjects()
    const a = objs1After[id1a], b = objs1After[id1b]
    if (!a || !b) { console.log('  ✗ Objects missing after transform'); failed++ }
    else {
      const tol = 12
      // Positions should have moved toward the fixed corner (top-left stays fixed for BR drag)
      // x/y of each object should stay the same (top-left anchor fixed)
      near(a.x, init1a.x, tol, 'Shape A: x unchanged (top-left anchor)')
      near(a.y, init1a.y, tol, 'Shape A: y unchanged (top-left anchor)')
      near(b.x, init1b.x * (box1.w * dragFrac / box1.w) + box1.x * (1 - dragFrac),
           tol * 3, 'Shape B: x scaled toward TL anchor')
      // Width/height should have scaled by dragFrac
      near(a.width,  init1a.w * dragFrac, tol, `Shape A: width scaled to ${dragFrac}`)
      near(a.height, init1a.h * dragFrac, tol, `Shape A: height scaled to ${dragFrac}`)
      near(b.width,  init1b.w * dragFrac, tol, `Shape B: width scaled to ${dragFrac}`)
      near(b.height, init1b.h * dragFrac, tol, `Shape B: height scaled to ${dragFrac}`)
      // TL corner (top-left of group bbox) is fixed during BR-corner drag
      // → x and y of shape A (which has the leftmost/topmost positions) should stay at box origin
      near(a.x, box1.x, tol, 'Shape A: x at left edge of fixed TL corner')
      near(a.y, box1.y, tol, 'Shape A: y at top edge of fixed TL corner')
    }
  }
}

// ─── TEST 2: Multi-select — scale from top-left corner ────────────────────────
console.log('\n── TEST 2: Multi-select scale (top-left corner) ──')
await clearAll()

// Draw two shapes again
await (async () => {
  const p1 = await k2p(s1.x, s1.y)
  await drawRect(p1.x, p1.y, s1.w * si.sx, s1.h * si.sy)
})()
await (async () => {
  const p2 = await k2p(s2.x, s2.y)
  await drawRect(p2.x, p2.y, s2.w * si.sx, s2.h * si.sy)
})()

const objs2 = await getObjects()
const ids2  = await getOrder()
const [id2a, id2b] = ids2
const obj2a = objs2[id2a], obj2b = objs2[id2b]

if (!obj2a || !obj2b) {
  console.log('  ✗ Could not read objects — skipping test 2'); skipped++
} else {
  const init2a = { x: obj2a.x, y: obj2a.y, w: obj2a.width, h: obj2a.height }
  const init2b = { x: obj2b.x, y: obj2b.y, w: obj2b.width, h: obj2b.height }

  await clickKonvaCenter(init2a.x, init2a.y, init2a.w, init2a.h)
  await clickKonvaCenter(init2b.x, init2b.y, init2b.w, init2b.h, true)
  await wait(200)

  const box2 = await getGroupTransformerBox()
  if (!box2) { console.log('  ✗ No group transformer'); failed++; failures.push('TEST2: no transformer') }
  else {
    const dragFrac = 0.75
    const handleKX = box2.x
    const handleKY = box2.y
    const targetKX = box2.x + box2.w * (1 - dragFrac)
    const targetKY = box2.y + box2.h * (1 - dragFrac)

    const fromP = await k2p(handleKX, handleKY)
    const toP   = await k2p(targetKX, targetKY)
    await ss('t2-before-scale')
    await drag(fromP.x, fromP.y, toP.x, toP.y)
    await ss('t2-after-scale')

    const objs2After = await getObjects()
    const a = objs2After[id2a], b = objs2After[id2b]
    if (!a || !b) { console.log('  ✗ Objects missing after transform'); failed++ }
    else {
      const tol = 12
      // BR anchor is fixed; objects should scale to dragFrac of original
      near(a.width,  init2a.w * dragFrac, tol, `Shape A: width scaled to ${dragFrac}`)
      near(a.height, init2a.h * dragFrac, tol, `Shape A: height scaled to ${dragFrac}`)
      near(b.width,  init2b.w * dragFrac, tol, `Shape B: width scaled to ${dragFrac}`)
      near(b.height, init2b.h * dragFrac, tol, `Shape B: height scaled to ${dragFrac}`)
      // BR corner of the overall bounding box should stay fixed.
      // Shape B's original right edge was at box.x+box.w — it should remain there.
      near(b.x + b.width,  box2.x + box2.w, tol * 2, 'Shape B right edge stays at BR anchor')
    }
  }
}

// ─── TEST 3: Multi-select drag ─────────────────────────────────────────────────
console.log('\n── TEST 3: Multi-select drag ──')
await clearAll()

await (async () => {
  const p1 = await k2p(s1.x, s1.y)
  await drawRect(p1.x, p1.y, s1.w * si.sx, s1.h * si.sy)
})()
await (async () => {
  const p2 = await k2p(s2.x, s2.y)
  await drawRect(p2.x, p2.y, s2.w * si.sx, s2.h * si.sy)
})()

const objs3 = await getObjects()
const ids3  = await getOrder()
const [id3a, id3b] = ids3
const obj3a = objs3[id3a], obj3b = objs3[id3b]

if (!obj3a || !obj3b) {
  console.log('  ✗ Could not read objects — skipping test 3'); skipped++
} else {
  const init3a = { x: obj3a.x, y: obj3a.y }
  const init3b = { x: obj3b.x, y: obj3b.y }

  await clickKonvaCenter(obj3a.x, obj3a.y, obj3a.width, obj3a.height)
  await clickKonvaCenter(obj3b.x, obj3b.y, obj3b.width, obj3b.height, true)
  await wait(200)

  const box3 = await getGroupTransformerBox()
  if (!box3) { console.log('  ✗ No group transformer'); failed++; failures.push('TEST3: no transformer') }
  else {
    // Multi-select drag works via the stage's onMouseDown handler:
    // it only records drag start when e.target is a canvas object (not the stage background).
    // So we must start the drag FROM one of the selected shapes, not from the gap between them.
    // Drag from the center of the first shape (obj3a).
    const dkX = 80, dkY = 60
    const dragStartKX = obj3a.x + obj3a.width / 2
    const dragStartKY = obj3a.y + obj3a.height / 2

    const fromP = await k2p(dragStartKX, dragStartKY)
    const toP   = await k2p(dragStartKX + dkX, dragStartKY + dkY)
    await ss('t3-before-drag')
    await drag(fromP.x, fromP.y, toP.x, toP.y)
    await ss('t3-after-drag')

    const objs3After = await getObjects()
    const a = objs3After[id3a], b = objs3After[id3b]
    if (!a || !b) { console.log('  ✗ Objects missing after drag'); failed++ }
    else {
      const tol = 15
      near(a.x, init3a.x + dkX, tol, `Shape A: x shifted by ${dkX}`)
      near(a.y, init3a.y + dkY, tol, `Shape A: y shifted by ${dkY}`)
      near(b.x, init3b.x + dkX, tol, `Shape B: x shifted by ${dkX}`)
      near(b.y, init3b.y + dkY, tol, `Shape B: y shifted by ${dkY}`)
      // Sizes should not change during drag
      near(a.width,  obj3a.width,  3, 'Shape A: width unchanged after drag')
      near(a.height, obj3a.height, 3, 'Shape A: height unchanged after drag')
    }
  }
}

// ─── TEST 4: Multi-select rotate ──────────────────────────────────────────────
console.log('\n── TEST 4: Multi-select rotate ──')
await clearAll()

await (async () => {
  const p1 = await k2p(s1.x, s1.y)
  await drawRect(p1.x, p1.y, s1.w * si.sx, s1.h * si.sy)
})()
await (async () => {
  const p2 = await k2p(s2.x, s2.y)
  await drawRect(p2.x, p2.y, s2.w * si.sx, s2.h * si.sy)
})()

const objs4 = await getObjects()
const ids4  = await getOrder()
const [id4a, id4b] = ids4
const obj4a = objs4[id4a], obj4b = objs4[id4b]

if (!obj4a || !obj4b) {
  console.log('  ✗ Could not read objects — skipping test 4'); skipped++
} else {
  await clickKonvaCenter(obj4a.x, obj4a.y, obj4a.width, obj4a.height)
  await clickKonvaCenter(obj4b.x, obj4b.y, obj4b.width, obj4b.height, true)
  await wait(200)

  const tr4Info = await getTransformerInfo(2)
  if (!tr4Info) { console.log('  ✗ No group transformer'); failed++; failures.push('TEST4: no transformer') }
  else {
    // Use the actual rotation handle position from Konva's .rotater element
    const { rotateAbs } = tr4Info
    if (!rotateAbs) { console.log('  ✗ Rotation handle not found in Konva tree'); failed++; failures.push('TEST4: no rotater') }
    else {
    const si4 = await getStageInfo()
    // rotateAbs is relative to stage container → convert to page coords
    const fromP = { x: si4.left + rotateAbs.x, y: si4.top + rotateAbs.y }
    // Drag the rotation handle 90px right in page space to rotate CW
    const toP   = { x: fromP.x + 90, y: fromP.y }

    await ss('t4-before-rotate')
    await drag(fromP.x, fromP.y, toP.x, toP.y)
    await ss('t4-after-rotate')

    const objs4After = await getObjects()
    const a = objs4After[id4a], b = objs4After[id4b]
    if (!a || !b) { console.log('  ✗ Objects missing after rotate'); failed++ }
    else {
      ok(Math.abs(a.rotation) > 0.5, `Shape A has rotation ≠ 0 (got ${a.rotation?.toFixed(2)}°)`)
      ok(Math.abs(b.rotation) > 0.5, `Shape B has rotation ≠ 0 (got ${b.rotation?.toFixed(2)}°)`)
      near(a.rotation, b.rotation, 1.5, 'Both shapes have same rotation angle')
      // Sizes should not change during rotation
      near(a.width,  obj4a.width,  3, 'Shape A: width unchanged after rotate')
      near(a.height, obj4a.height, 3, 'Shape A: height unchanged after rotate')
    }
    } // close rotateAbs if
  }
}

// ─── TEST 5: Image — group scale content scales proportionally (no crop) ─────
console.log('\n── TEST 5: Image — group scale, content follows frame (no crop) ──')
await clearAll()

// Two images with non-zero content offsets (content larger than frame)
// image A: frame 200×150 at (200,300), content 300×250 at offset (-50,-50)
// image B: frame 200×150 at (500,350), content 280×220 at offset (-40,-35)
const imgA = { kx: 200, ky: 300, fw: 200, fh: 150, cox: -50, coy: -50, cw: 300, ch: 250 }
const imgB = { kx: 500, ky: 350, fw: 200, fh: 150, cox: -40, coy: -35, cw: 280, ch: 220 }

const idImgA = await addImage(imgA.kx, imgA.ky, imgA.fw, imgA.fh, imgA.cox, imgA.coy, imgA.cw, imgA.ch)
const idImgB = await addImage(imgB.kx, imgB.ky, imgB.fw, imgB.fh, imgB.cox, imgB.coy, imgB.cw, imgB.ch)
await wait(400)

// Select both images by clicking their frame centers
await clickKonvaCenter(imgA.kx, imgA.ky, imgA.fw, imgA.fh)
await clickKonvaCenter(imgB.kx, imgB.ky, imgB.fw, imgB.fh, true)
await wait(200)

const store5 = await getStore()
ok(store5.selectedIds.length === 2, `Two images selected (got ${store5.selectedIds.length})`)

const box5 = await getGroupTransformerBox()
if (!box5) {
  console.log('  ✗ No group transformer for images'); failed++; failures.push('TEST5: no transformer')
} else {
  const dragFrac = 0.65
  const handleKX = box5.x + box5.w
  const handleKY = box5.y + box5.h
  const targetKX = box5.x + box5.w * dragFrac
  const targetKY = box5.y + box5.h * dragFrac

  const fromP = await k2p(handleKX, handleKY)
  const toP   = await k2p(targetKX, targetKY)
  await ss('t5-before-scale')
  await drag(fromP.x, fromP.y, toP.x, toP.y)
  await ss('t5-after-scale')

  const objs5After = await getObjects()
  const a = objs5After[idImgA], b = objs5After[idImgB]
  if (!a || !b) { console.log('  ✗ Images missing after transform'); failed++ }
  else {
    const tol = 8
    // Frame dimensions should be scaled by dragFrac
    near(a.frameWidth,  imgA.fw * dragFrac, tol, `Image A: frameWidth scaled to ${dragFrac}`)
    near(a.frameHeight, imgA.fh * dragFrac, tol, `Image A: frameHeight scaled to ${dragFrac}`)
    near(b.frameWidth,  imgB.fw * dragFrac, tol, `Image B: frameWidth scaled to ${dragFrac}`)
    near(b.frameHeight, imgB.fh * dragFrac, tol, `Image B: frameHeight scaled to ${dragFrac}`)

    // Content should also scale proportionally (Bug 1 fix: no cropping)
    near(a.contentWidth,   imgA.cw * dragFrac, tol * 2, `Image A: contentWidth scales proportionally`)
    near(a.contentHeight,  imgA.ch * dragFrac, tol * 2, `Image A: contentHeight scales proportionally`)
    near(a.contentOffsetX, imgA.cox * dragFrac, tol * 2, `Image A: contentOffsetX scales proportionally`)
    near(a.contentOffsetY, imgA.coy * dragFrac, tol * 2, `Image A: contentOffsetY scales proportionally`)

    near(b.contentWidth,   imgB.cw * dragFrac, tol * 2, `Image B: contentWidth scales proportionally`)
    near(b.contentHeight,  imgB.ch * dragFrac, tol * 2, `Image B: contentHeight scales proportionally`)
    near(b.contentOffsetX, imgB.cox * dragFrac, tol * 2, `Image B: contentOffsetX scales proportionally`)
    near(b.contentOffsetY, imgB.coy * dragFrac, tol * 2, `Image B: contentOffsetY scales proportionally`)

    // Aspect ratio of frame must be preserved (keepRatio=true on group transformer)
    const aspectA = a.frameWidth / a.frameHeight
    const origAspectA = imgA.fw / imgA.fh
    near(aspectA, origAspectA, 0.05, 'Image A: frame aspect ratio preserved')

    // Content aspect ratio must also be preserved
    const cAspectA = a.contentWidth / a.contentHeight
    const origCAspectA = imgA.cw / imgA.ch
    near(cAspectA, origCAspectA, 0.05, 'Image A: content aspect ratio preserved')
  }
}

// ─── TEST 6: Image — group scale does NOT crop (resizeMode ignored) ───────────
console.log('\n── TEST 6: Image — resizeMode="advanced" ignored during group scale ──')
await clearAll()

// Set resizeMode to 'advanced' (should be ignored for group transforms)
await page.evaluate(() => {
  const s = window.__canvasStore__?.getState()
  if (s?.resizeMode === 'auto') s.setResizeMode?.('advanced')
})

const imgC = { kx: 200, ky: 300, fw: 250, fh: 180, cox: 0, coy: 0, cw: 250, ch: 180 }
const imgD = { kx: 500, ky: 300, fw: 250, fh: 180, cox: -20, coy: -30, cw: 310, ch: 240 }

const idImgC = await addImage(imgC.kx, imgC.ky, imgC.fw, imgC.fh, imgC.cox, imgC.coy, imgC.cw, imgC.ch)
const idImgD = await addImage(imgD.kx, imgD.ky, imgD.fw, imgD.fh, imgD.cox, imgD.coy, imgD.cw, imgD.ch)
await wait(400)

await clickKonvaCenter(imgC.kx, imgC.ky, imgC.fw, imgC.fh)
await clickKonvaCenter(imgD.kx, imgD.ky, imgD.fw, imgD.fh, true)
await wait(200)

const box6 = await getGroupTransformerBox()
if (!box6) {
  console.log('  ✗ No group transformer'); failed++; failures.push('TEST6: no transformer')
} else {
  const dragFrac = 0.80
  const fromP = await k2p(box6.x + box6.w, box6.y + box6.h)
  const toP   = await k2p(box6.x + box6.w * dragFrac, box6.y + box6.h * dragFrac)
  await ss('t6-before')
  await drag(fromP.x, fromP.y, toP.x, toP.y)
  await ss('t6-after')

  const objs6After = await getObjects()
  const c = objs6After[idImgC], d = objs6After[idImgD]
  if (!c || !d) { console.log('  ✗ Images missing after transform'); failed++ }
  else {
    const tol = 10
    // Even with resizeMode='advanced', group scale must NOT use the crop branch
    // Content MUST scale proportionally (not stay at fixed canvas position)
    near(c.contentWidth,   imgC.cw * dragFrac, tol * 2,
         'Image C (resizeMode=advanced): contentWidth still scales (no crop)')
    near(d.contentOffsetX, imgD.cox * dragFrac, tol * 2,
         'Image D (resizeMode=advanced): contentOffsetX still scales (no crop)')
    near(c.contentOffsetY, imgC.coy * dragFrac, tol * 2,
         'Image C (resizeMode=advanced): contentOffsetY still scales (no crop)')
  }
}

// ─── TEST 7: Single image — proportional scale by default (Bug 3) ─────────────
console.log('\n── TEST 7: Single image — default scale is proportional (no Shift) ──')
await clearAll()

// Square image (easy to verify proportionality)
const imgE = { kx: 300, ky: 250, fw: 300, fh: 300, cox: 0, coy: 0, cw: 300, ch: 300 }
const idImgE = await addImage(imgE.kx, imgE.ky, imgE.fw, imgE.fh, imgE.cox, imgE.coy, imgE.cw, imgE.ch)
await wait(400)

// Click to select (single selection)
await clickKonvaCenter(imgE.kx, imgE.ky, imgE.fw, imgE.fh)
await wait(200)

const store7 = await getStore()
ok(store7.selectedId === idImgE, `Image E is selected (selectedId=${store7.selectedId?.slice(0,8)}…)`)

const tr7Info = await getSingleTransformerInfo()
const box7 = tr7Info?.box ?? null
if (!box7) {
  console.log('  ✗ No single-object transformer found'); failed++; failures.push('TEST7: no transformer')
} else {
  console.log('  Single transformer box:', JSON.stringify(box7))
  // Drag corner down+right (non-proportional would change aspect ratio, proportional keeps it)
  const fromKX = box7.x + box7.w, fromKY = box7.y + box7.h
  const toKX = fromKX + 80, toKY = fromKY + 30  // intentionally asymmetric drag

  const fromP = await k2p(fromKX, fromKY)
  const toP   = await k2p(toKX, toKY)
  await ss('t7-before')
  await drag(fromP.x, fromP.y, toP.x, toP.y)
  await ss('t7-after')

  const objs7After = await getObjects()
  const e = objs7After[idImgE]
  if (!e) { console.log('  ✗ Image E missing after transform'); failed++ }
  else {
    const newAspect = e.frameWidth / e.frameHeight
    const origAspect = imgE.fw / imgE.fh
    near(newAspect, origAspect, 0.05, `Single image: frame aspect ratio preserved without Shift (got ${newAspect.toFixed(3)}, expected ${origAspect.toFixed(3)})`)
    ok(e.frameWidth !== imgE.fw, 'Single image: size did change (transform was applied)')
  }
}

// ─── TEST 8: Mixed selection (image + shape) — scale ─────────────────────────
console.log('\n── TEST 8: Mixed selection (image + rect) — scale ──')
await clearAll()

const imgF = { kx: 150, ky: 250, fw: 200, fh: 200, cox: -20, coy: -20, cw: 240, ch: 240 }
const idImgF = await addImage(imgF.kx, imgF.ky, imgF.fw, imgF.fh, imgF.cox, imgF.coy, imgF.cw, imgF.ch)
await wait(200)

// Draw a rect near the image
const shapePos = await k2p(imgF.kx + imgF.fw + 50, imgF.ky)
await drawRect(shapePos.x, shapePos.y, 150 * si.sx, 150 * si.sy)
await wait(200)

const objs8 = await getObjects()
const ids8  = await getOrder()
ok(ids8.length === 2, `Mixed: 2 objects (got ${ids8.length})`)

const shapeId8 = ids8.find(id => id !== idImgF)
const img8  = objs8[idImgF]
const shp8  = objs8[shapeId8]

if (!img8 || !shp8) {
  console.log('  ✗ Could not read mixed objects — skipping test 8'); skipped++
} else {
  const initImg  = { fw: img8.frameWidth, fh: img8.frameHeight, cw: img8.contentWidth, ch: img8.contentHeight, cox: img8.contentOffsetX, coy: img8.contentOffsetY }
  const initShp  = { w: shp8.width, h: shp8.height }

  await clickKonvaCenter(img8.frameX, img8.frameY, img8.frameWidth, img8.frameHeight)
  await clickKonvaCenter(shp8.x, shp8.y, shp8.width, shp8.height, true)
  await wait(200)

  const store8 = await getStore()
  ok(store8.selectedIds.length === 2, `Mixed: two objects in selectedIds`)

  const box8 = await getGroupTransformerBox()
  if (!box8) { console.log('  ✗ No group transformer for mixed selection'); failed++; failures.push('TEST8: no transformer') }
  else {
    const dragFrac = 0.70
    const fromP = await k2p(box8.x + box8.w, box8.y + box8.h)
    const toP   = await k2p(box8.x + box8.w * dragFrac, box8.y + box8.h * dragFrac)
    await ss('t8-before')
    await drag(fromP.x, fromP.y, toP.x, toP.y)
    await ss('t8-after')

    const objs8After = await getObjects()
    const imgAfter = objs8After[idImgF], shpAfter = objs8After[shapeId8]
    if (!imgAfter || !shpAfter) { console.log('  ✗ Objects missing after mixed transform'); failed++ }
    else {
      const tol = 10
      // Image: frame and content must scale proportionally
      near(imgAfter.frameWidth, initImg.fw * dragFrac, tol, 'Image in mixed: frameWidth scaled')
      near(imgAfter.contentWidth, initImg.cw * dragFrac, tol * 2, 'Image in mixed: contentWidth scaled (no crop)')
      near(imgAfter.contentOffsetX, initImg.cox * dragFrac, tol * 2, 'Image in mixed: contentOffsetX scaled')
      // Shape: size must scale
      near(shpAfter.width,  initShp.w * dragFrac, tol * 2, 'Shape in mixed: width scaled')
      near(shpAfter.height, initShp.h * dragFrac, tol * 2, 'Shape in mixed: height scaled')
    }
  }
}

// ─── TEARDOWN ─────────────────────────────────────────────────────────────────
await wait(500)
await ss('final-state')
await app.close()

console.log('\n' + '═'.repeat(60))
console.log(`Results: ${passed} passed, ${failed} failed, ${skipped} skipped`)
if (failures.length) {
  console.log('\nFailed assertions:')
  failures.forEach(f => console.log(`  • ${f}`))
}
console.log('Screenshots saved to:', SHOTS)
process.exit(failed > 0 ? 1 : 0)
