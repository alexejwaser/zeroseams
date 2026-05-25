/**
 * Playwright/Electron test for save-path fixes (issue #32).
 * Covers common user workflows: open→cmd+S, autosave, new project save.
 *
 * Strategy: contextIsolation=true freezes window.electronAPI — spies can't be
 * injected from the renderer. Instead we test side effects:
 *   - autosave/save → check actual file mtime on disk (Node.js fs)
 *   - save status → read from __saveStatusStore__
 *   - dialog branches → intercept dialog module in main process via app.evaluate()
 *
 * Run: node scripts/test-save-path.mjs
 * Requires: npm run build first
 */
import { _electron as electron } from 'playwright'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
import os from 'node:os'

const ROOT = path.resolve(fileURLToPath(import.meta.url), '../..')
const ELECTRON_BIN = path.join(ROOT, 'node_modules/electron/dist/Electron.app/Contents/MacOS/Electron')
const SHOTS = '/tmp/zeroseams-save-tests'
fs.mkdirSync(SHOTS, { recursive: true })

// ─── Test runner ─────────────────────────────────────────────────────────────
let passed = 0, failed = 0
const failures = []

function ok(cond, msg) {
  if (cond) { console.log(`  ✓ ${msg}`); passed++ }
  else       { console.log(`  ✗ ${msg}`); failed++; failures.push(msg) }
}
function skip(msg) { console.log(`  – ${msg} (skipped)`); }

// ─── Launch ───────────────────────────────────────────────────────────────────
const app = await electron.launch({
  executablePath: ELECTRON_BIN,
  args: [path.join(ROOT, 'out/main/index.js')],
  timeout: 30_000,
})
const page = app.windows().find(w => !w.url().startsWith('devtools://')) ?? await app.firstWindow()
const consoleLogs = []
page.on('console', m => consoleLogs.push(`[${m.type()}] ${m.text()}`))

const ss   = (n) => page.screenshot({ path: `${SHOTS}/${n}.png` }).then(() => console.log(`    📸 ${n}`))
const wait = (ms) => new Promise(r => setTimeout(r, ms))

await page.waitForSelector('canvas', { timeout: 12_000 })
await wait(1500) // let React + Konva fully mount

// ─── Store helpers ────────────────────────────────────────────────────────────
const getSaveStore = () => page.evaluate(() => {
  const s = window.__saveStatusStore__?.getState()
  if (!s) return null
  return { currentFilePath: s.currentFilePath, autosaveFilePath: s.autosaveFilePath, status: s.status, lastSavedAt: s.lastSavedAt }
})
const setCurrentFilePath = (p) => page.evaluate((fp) => {
  window.__saveStatusStore__?.getState().setCurrentFilePath(fp)
}, p)

const triggerCanvasChange = () => page.evaluate(() => {
  // Toggle snap twice (no-op net change, but fires store subscription → autosave)
  const s = window.__canvasStore__?.getState()
  if (!s) return false
  if (typeof s.toggleSnap !== 'function') return false
  s.toggleSnap()
  s.toggleSnap()
  return true
})

// ─── Verify stores exposed ────────────────────────────────────────────────────
const storeReady = await page.evaluate(() =>
  typeof window.__canvasStore__ !== 'undefined' && typeof window.__saveStatusStore__ !== 'undefined'
)
if (!storeReady) {
  console.error('FATAL: stores not exposed. Did you build with store exposure?')
  await app.close()
  process.exit(1)
}
console.log('✓ Stores exposed')

// Verify toggleSnap is available
const hasToggleSnap = await triggerCanvasChange()
ok(hasToggleSnap, 'toggleSnap available in canvas store (autosave trigger works)')

// ─── Helper: mock dialog in main process to avoid blocking ────────────────────
// Returns a function to restore the original dialog.
const mockSaveDialog = (returnPath) => app.evaluate(({ dialog }, fp) => {
  const orig = dialog.showSaveDialog.bind(dialog)
  dialog.__origShowSave__ = orig
  dialog.showSaveDialog = async () => ({ canceled: fp == null, filePath: fp ?? undefined })
}, returnPath)

const restoreDialog = () => app.evaluate(({ dialog }) => {
  if (dialog.__origShowSave__) {
    dialog.showSaveDialog = dialog.__origShowSave__
    delete dialog.__origShowSave__
  }
})

// ─── Scenario 1: Initial state ────────────────────────────────────────────────
console.log('\n── Scenario 1: Initial state ──')
{
  await setCurrentFilePath(null)
  const s = await getSaveStore()
  ok(s !== null, 'saveStatusStore accessible')
  ok(s.currentFilePath === null, 'currentFilePath starts null on new project')
}

// ─── Scenario 2: Autosave with currentFilePath → overwrites opened file ────────
console.log('\n── Scenario 2: Autosave with currentFilePath → writes to opened file ──')
{
  const testFile = path.join(os.tmpdir(), `zeroseams-autosave-test-${Date.now()}.zeroseams`)
  fs.writeFileSync(testFile, JSON.stringify({ version: 0, name: 'test' }))
  const mtimeBefore = fs.statSync(testFile).mtimeMs

  await setCurrentFilePath(testFile)
  const triggered = await triggerCanvasChange()
  ok(triggered, 'canvas store change triggered')

  // Autosave debounce = 2000ms; wait 3.5s
  await wait(3500)

  const mtimeAfter = fs.statSync(testFile).mtimeMs
  ok(mtimeAfter > mtimeBefore, `autosave updated the opened file (mtime changed)`)

  const content = JSON.parse(fs.readFileSync(testFile, 'utf-8'))
  ok(typeof content === 'object' && content !== null, 'saved file contains valid JSON project')
  ok('version' in content || 'id' in content, 'saved file looks like a project')

  const saveStore = await getSaveStore()
  ok(saveStore.status === 'saved' || saveStore.status === 'idle', `save status is saved/idle (got: ${saveStore.status})`)
  await ss('scenario2-autosave-with-path')
}

// ─── Scenario 3: Autosave without currentFilePath → goes to default dir ────────
console.log('\n── Scenario 3: Autosave without currentFilePath → app default dir ──')
{
  await setCurrentFilePath(null)
  const triggered = await triggerCanvasChange()
  ok(triggered, 'canvas store change triggered')

  await wait(3500)

  const saveStore = await getSaveStore()
  ok(saveStore.autosaveFilePath !== null, `autosaveFilePath is set (got: ${saveStore.autosaveFilePath})`)
  if (saveStore.autosaveFilePath) {
    ok(saveStore.autosaveFilePath.includes('ZeroSeams'), `autosaveFilePath is inside ZeroSeams dir (${saveStore.autosaveFilePath})`)
    ok(fs.existsSync(saveStore.autosaveFilePath), 'autosave file exists on disk')
  }
  ok(saveStore.status === 'saved' || saveStore.status === 'idle', `save status is saved/idle (got: ${saveStore.status})`)
  await ss('scenario3-autosave-no-path')
}

// ─── Scenario 4: cmd+S with currentFilePath → overwrites in place ─────────────
console.log('\n── Scenario 4: cmd+S with currentFilePath → saveProject (no dialog) ──')
{
  const testFile = path.join(os.tmpdir(), `zeroseams-cmds-test-${Date.now()}.zeroseams`)
  fs.writeFileSync(testFile, JSON.stringify({ version: 0, name: 'test' }))
  const mtimeBefore = fs.statSync(testFile).mtimeMs

  await setCurrentFilePath(testFile)
  // Focus the canvas so keyboard shortcuts fire
  await page.mouse.click(400, 400)
  await wait(100)
  await page.keyboard.press('Meta+s')
  await wait(600)

  const mtimeAfter = fs.statSync(testFile).mtimeMs
  ok(mtimeAfter > mtimeBefore, 'cmd+S overwrote the opened file (mtime changed)')

  const content = JSON.parse(fs.readFileSync(testFile, 'utf-8'))
  ok(typeof content === 'object', 'overwritten file contains valid JSON')
  await ss('scenario4-cmds-with-path')
}

// ─── Scenario 5: cmd+S without path → opens Save As dialog ───────────────────
console.log('\n── Scenario 5: cmd+S without currentFilePath → Save As dialog ──')
{
  const testFile = path.join(os.tmpdir(), `zeroseams-saveas-test-${Date.now()}.zeroseams`)

  // Mock dialog to return a path instead of showing native OS dialog
  await mockSaveDialog(testFile)
  await setCurrentFilePath(null)
  await page.mouse.click(400, 400)
  await wait(100)
  await page.keyboard.press('Meta+s')
  await wait(600)
  await restoreDialog()

  // After saveProjectAs, currentFilePath should be updated
  const saveStore = await getSaveStore()
  ok(saveStore.currentFilePath === testFile, `currentFilePath updated to save-as path (got: ${saveStore.currentFilePath})`)
  ok(fs.existsSync(testFile), 'Save As file was written to disk')
  await ss('scenario5-cmds-no-path-save-as')
}

// ─── Scenario 6: cmd+Shift+S always prompts Save As ──────────────────────────
console.log('\n── Scenario 6: cmd+Shift+S always opens Save As, updates currentFilePath ──')
{
  const testFile = path.join(os.tmpdir(), `zeroseams-shift-saveas-${Date.now()}.zeroseams`)
  const existingPath = path.join(os.tmpdir(), `zeroseams-existing.zeroseams`)

  await mockSaveDialog(testFile)
  await setCurrentFilePath(existingPath) // already have a path — Save As should still prompt
  await page.mouse.click(400, 400)
  await wait(100)
  await page.keyboard.press('Meta+Shift+s')
  await wait(600)
  await restoreDialog()

  const saveStore = await getSaveStore()
  ok(saveStore.currentFilePath === testFile, `cmd+Shift+S updates currentFilePath to new save-as path (got: ${saveStore.currentFilePath})`)
  ok(fs.existsSync(testFile), 'Save As file written even when a path was already set')
  await ss('scenario6-shift-cmds')
}

// ─── Scenario 7: Save status transitions ──────────────────────────────────────
console.log('\n── Scenario 7: Save status idle → saving → saved → idle ──')
{
  const testFile = path.join(os.tmpdir(), `zeroseams-status-test-${Date.now()}.zeroseams`)
  fs.writeFileSync(testFile, '{}')

  await setCurrentFilePath(testFile)
  // Wait for any in-flight save from previous scenarios to settle
  await wait(500)
  const storeBefore = await getSaveStore()
  ok(storeBefore.status === 'idle' || storeBefore.status === 'saved', `status is idle/saved before change (got: ${storeBefore.status})`)
  const lastSavedAtBefore = storeBefore.lastSavedAt

  await triggerCanvasChange()

  // 'saving' is transient (<10ms for a local write) — impossible to catch reliably with polling.
  // Instead verify the save completed by checking lastSavedAt changed.

  // Poll until lastSavedAt changes — proves a save actually happened.
  // Debounce=2s, then save is near-instant, so allow up to 6s total.
  let storeAfter = null
  for (let i = 0; i < 60; i++) {
    await wait(100)
    storeAfter = await getSaveStore()
    if (storeAfter.lastSavedAt !== lastSavedAtBefore) break
  }
  ok(storeAfter.lastSavedAt !== lastSavedAtBefore, `lastSavedAt updated after save (was: ${lastSavedAtBefore})`)
  ok(storeAfter.status === 'saved' || storeAfter.status === 'idle', `status is saved/idle after save (got: ${storeAfter.status})`)
  await ss('scenario7-status-transitions')
}

// ─── Results ──────────────────────────────────────────────────────────────────
console.log(`\n${'─'.repeat(50)}`)
console.log(`Results: ${passed} passed, ${failed} failed`)
if (failures.length > 0) {
  console.log('\nFailures:')
  for (const f of failures) console.log(`  ✗ ${f}`)
}
await app.close()
process.exit(failed > 0 ? 1 : 0)
