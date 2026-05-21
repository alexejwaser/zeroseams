import { _electron as electron } from 'playwright'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'

const ROOT = path.resolve(fileURLToPath(import.meta.url), '../..')
const SHOT = '/tmp/shots'
fs.mkdirSync(SHOT, { recursive: true })
const electronBin = path.join(ROOT, 'node_modules/electron/dist/Electron.app/Contents/MacOS/Electron')
const fixturePath = path.join(process.env.HOME, 'Documents/ZeroSeams/mask-draw-test.zeroseams')
const fixtureJson = fs.readFileSync(fixturePath, 'utf-8')

async function shot(page, name) {
  const p = path.join(SHOT, `${name}.png`)
  await page.screenshot({ path: p })
  console.log('screenshot:', p)
}

async function main() {
  const app = await electron.launch({
    executablePath: electronBin,
    args: [ROOT],
    env: { ...process.env },
    timeout: 30_000,
  })

  await app.evaluate(({ ipcMain }, json) => {
    ipcMain.removeHandler('open-project')
    ipcMain.handle('open-project', async () => ({ success: true, json }))
  }, fixtureJson)

  const page = await app.firstWindow()
  await page.waitForLoadState('domcontentloaded')
  await page.waitForTimeout(3000)

  // Load project
  await page.getByText('Open').first().click()
  await page.waitForTimeout(1500)

  // Select the image via layer panel
  const layerItems = page.locator('[draggable="true"]')
  await layerItems.first().click()
  await page.waitForTimeout(300)
  await shot(page, '01-image-selected')

  // Verify tool picker appears
  const bodyText = await page.evaluate(() => document.body.innerText)
  const hasPen = bodyText.includes('Pen')
  const hasRect = bodyText.includes('Rect')
  const hasOval = bodyText.includes('Oval')
  console.log('Tool picker — Pen:', hasPen, 'Rect:', hasRect, 'Oval:', hasOval)

  // Click Rect tool
  const rectBtn = page.getByText('Rect').first()
  await rectBtn.click()
  await page.waitForTimeout(300)
  await shot(page, '02-rect-mode-active')

  const afterRectClick = await page.evaluate(() => document.body.innerText)
  const hasCancelBtn = afterRectClick.includes('Cancel')
  const hasDrawingMsg = afterRectClick.toLowerCase().includes('drawing')
  console.log('After Rect click — Cancel button:', hasCancelBtn, 'Drawing message:', hasDrawingMsg)

  // Draw a rect on canvas
  const canvases = page.locator('canvas')
  const box = await canvases.first().boundingBox()
  if (box) {
    // Drag from 30%,40% to 60%,70% of the canvas
    const x1 = box.x + box.width * 0.3; const y1 = box.y + box.height * 0.4
    const x2 = box.x + box.width * 0.6; const y2 = box.y + box.height * 0.7
    await page.mouse.move(x1, y1)
    await page.mouse.down()
    await page.waitForTimeout(100)
    await page.mouse.move(x1 + 50, y1 + 50)
    await page.waitForTimeout(50)
    await page.mouse.move(x2, y2)
    await page.waitForTimeout(100)
    await shot(page, '03-rect-dragging')
    await page.mouse.up()
    await page.waitForTimeout(500)
    await shot(page, '04-rect-committed')
  }

  const afterDraw = await page.evaluate(() => document.body.innerText)
  const hasMaskControls = afterDraw.includes('Edit Mask') || afterDraw.includes('Feather')
  const hasChainIcon = afterDraw.includes('⛓')
  console.log('After draw — Mask controls:', hasMaskControls, 'Chain icon:', hasChainIcon)
  console.log('Panel text after draw:\n', afterDraw.slice(0, 500))

  // Delete mask then test Oval
  const deleteBtn = page.getByText('✕').first()
  if (await deleteBtn.count() > 0) {
    await deleteBtn.click()
    await page.waitForTimeout(300)
    const ovalBtn = page.getByText('Oval').first()
    await ovalBtn.click()
    await page.waitForTimeout(300)
    await shot(page, '05-oval-mode')
    // Draw oval
    if (box) {
      const x1 = box.x + box.width * 0.3; const y1 = box.y + box.height * 0.35
      const x2 = box.x + box.width * 0.65; const y2 = box.y + box.height * 0.65
      await page.mouse.move(x1, y1); await page.mouse.down()
      await page.mouse.move(x2, y2); await page.waitForTimeout(100)
      await shot(page, '06-oval-dragging')
      await page.mouse.up(); await page.waitForTimeout(500)
      await shot(page, '07-oval-committed')
    }
  }

  // Test Escape cancels draw mode
  const deleteBtn2 = page.getByText('✕').first()
  if (await deleteBtn2.count() > 0) await deleteBtn2.click()
  await page.waitForTimeout(200)
  const penBtn = page.getByText('Pen').first()
  if (await penBtn.count() > 0) {
    await penBtn.click()
    await page.waitForTimeout(200)
    await page.keyboard.press('Escape')
    await page.waitForTimeout(200)
    await shot(page, '08-after-escape')
    const afterEsc = await page.evaluate(() => document.body.innerText)
    const toolPickerBack = afterEsc.includes('Pen') && afterEsc.includes('Rect')
    console.log('After Escape — tool picker restored:', toolPickerBack)
  }

  await app.close()
}

main().catch(e => { console.error('ERROR:', e.message); process.exit(1) })
