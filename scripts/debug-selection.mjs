import { _electron as electron } from 'playwright'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'

const ROOT = path.resolve(fileURLToPath(import.meta.url), '../..')
const ELECTRON_BIN = path.join(ROOT, 'node_modules/electron/dist/Electron.app/Contents/MacOS/Electron')
const SHOTS = '/tmp/zeroseams-debug'
fs.mkdirSync(SHOTS, { recursive: true })

const logs = []
const app = await electron.launch({
  executablePath: ELECTRON_BIN,
  args: [path.join(ROOT, 'out/main/index.js')],
  timeout: 30_000,
})
await new Promise(r => setTimeout(r, 2000))
const page = app.windows().find(w => !w.url().startsWith('devtools://')) ?? await app.firstWindow()
page.on('console', msg => {
  const text = `[${msg.type()}] ${msg.text()}`
  logs.push(text)
  if (msg.text().startsWith('[')) console.log(text)
})

const ss = async (name) => { await page.screenshot({ path: `${SHOTS}/${name}.png` }); console.log('shot:', name) }
const wait = (ms) => new Promise(r => setTimeout(r, ms))

await page.waitForSelector('canvas', { timeout: 10_000 })
const box = await page.locator('canvas').first().boundingBox()
console.log('Canvas box:', JSON.stringify(box))

// Diagnose what's in the DOM
const domInfo = await page.evaluate(() => {
  const panel = document.getElementById('properties-panel')
  const allInputs = [...document.querySelectorAll('input')]
  return {
    panelFound: !!panel,
    totalInputs: allInputs.length,
    panelInputs: panel ? [...panel.querySelectorAll('input')].length : -1,
    panelNumberInputs: panel ? [...panel.querySelectorAll('input[type="number"]')].length : -1,
    inputTypes: allInputs.map(i => i.type).join(','),
  }
})
console.log('DOM info before text creation:', JSON.stringify(domInfo))

// --- Create text ---
await page.getByRole('button', { name: 'Text' }).click()
await wait(200)
const cx = box.x + box.width * 0.25
const cy = box.y + box.height * 0.45
await page.mouse.click(cx, cy)
await wait(800)
await ss('01-created')

// Diagnose again after creation
const domInfo2 = await page.evaluate(() => {
  const panel = document.getElementById('properties-panel')
  return {
    panelFound: !!panel,
    panelNumberInputs: panel ? [...panel.querySelectorAll('input[type="number"]')].length : -1,
    panelInputValues: panel ? [...panel.querySelectorAll('input[type="number"]')].map(i => i.value) : [],
  }
})
console.log('DOM info after text creation:', JSON.stringify(domInfo2))

// Text was created at the click point, so its top-left is at (cx, cy) in CSS.
// Width=400 Konva → 200 CSS. Height≈48*1.2*0.5≈29 CSS.
// Click well inside: +80px right, +12px down from top-left.
const textClickX = cx + 80
const textClickY = cy + 12
console.log('Will dblclick at:', textClickX, textClickY)

// --- dblclick (no prior single click — first click of dblclick handles selection) ---
await page.mouse.dblclick(textClickX, textClickY)
await wait(700)
await ss('02-after-dblclick')

const editDiv = await page.$('[contenteditable="true"]')
console.log('Contenteditable found:', !!editDiv)

if (!editDiv) {
  // Check if handleDblClick logged anything
  const dblLogs = logs.filter(l => l.includes('handleDblClick'))
  console.log('handleDblClick logs:', dblLogs)

  // Try clicking the layer panel thumbnail to select, then dblclick canvas
  console.log('Trying layer panel click to select...')
  await page.locator('#layers-panel >> text=Text 1').first().click().catch(() =>
    page.locator('text=Text 1').first().click()
  )
  await wait(300)
  await page.mouse.dblclick(textClickX, textClickY)
  await wait(700)
  await ss('02b-retry-dblclick')

  const editDiv2 = await page.$('[contenteditable="true"]')
  console.log('Contenteditable after retry:', !!editDiv2)
  if (!editDiv2) {
    console.log('\n=== All debug logs ===')
    logs.forEach(l => console.log(l))
    await app.close()
    process.exit(1)
  }
}

const activeEditDiv = await page.$('[contenteditable="true"]')
const divBox = await activeEditDiv.boundingBox()
const divText = await activeEditDiv.innerText()
console.log('Div box:', JSON.stringify(divBox))
console.log('Div text:', JSON.stringify(divText))

// --- Inject a real browser selection (chars 0-12) via evaluate ---
// Playwright mouse drag doesn't trigger contenteditable text selection.
// Use window.getSelection() directly to create a non-collapsed range.
await wait(200)
const selResult = await page.evaluate(() => {
  const div = document.querySelector('[contenteditable="true"]')
  if (!div) return 'no div'
  // Focus the div first
  div.focus()
  const range = document.createRange()
  // Walk to the first text node
  const walker = document.createTreeWalker(div, NodeFilter.SHOW_TEXT)
  const firstText = walker.nextNode()
  if (!firstText) return 'no text node'
  const len = firstText.textContent?.length ?? 0
  range.setStart(firstText, 0)
  range.setEnd(firstText, Math.min(12, len))
  const sel = window.getSelection()
  if (!sel) return 'no selection'
  sel.removeAllRanges()
  sel.addRange(range)
  return `selected 0-${Math.min(12, len)} of "${firstText.textContent}"`
})
console.log('Selection inject:', selResult)
await wait(400)
await ss('03-selection-injected')

// --- Find the Size input (search whole document since panel ID isn't available) ---
const fontSizeInfo = await page.evaluate(() => {
  // Search for the label with text "Size" anywhere in the document
  const labels = [...document.querySelectorAll('label')]
  const lbl = labels.find(l => l.textContent?.trim() === 'Size')
  if (!lbl) {
    return {
      error: 'no Size label',
      allLabels: labels.map(l => l.textContent?.trim()),
      panelId: !!document.getElementById('properties-panel'),
    }
  }
  const inp = lbl.closest('div')?.querySelector('input')
  if (!inp) return { error: 'no input near Size label' }
  const r = inp.getBoundingClientRect()
  return { x: r.x, y: r.y, width: r.width, height: r.height, value: inp.value }
})
console.log('Font size input info:', JSON.stringify(fontSizeInfo))

if (fontSizeInfo.error) {
  console.log('[FAIL] could not find Size input:', fontSizeInfo.error)
} else {
  const fsCX = fontSizeInfo.x + fontSizeInfo.width / 2
  const fsCY = fontSizeInfo.y + fontSizeInfo.height / 2
  console.log('--- mousedown on Size input ---')
  await page.mouse.move(fsCX, fsCY)
  await page.mouse.down()
  await wait(150)
  await page.mouse.up()
  await wait(300)
  await ss('04-size-input-clicked')

  await page.keyboard.press('Control+a')
  await page.keyboard.type('72')
  await page.keyboard.press('Enter')
  await wait(500)
  await ss('05-after-size-change')
}

console.log('\n=== All debug logs ===')
logs.forEach(l => console.log(l))
await app.close()
