import React, { useRef, useEffect } from 'react'
import { Text as KonvaText, Rect, Transformer } from 'react-konva'
import type Konva from 'konva'
import type { TextObject, TextSpan, CanvasObject } from '@/types/canvas'
import { CANVAS_SCALE } from './constants'
import { useCanvasStore } from './useCanvasStore'
import { useSnapGuides } from './useSnapGuides'
import type { SnapGuide } from './useSnapGuides'
import { spanText, resolveSpanStyle, fontStyleToCSS } from './textSpans'

interface CanvasTextNodeProps {
  obj: TextObject
  isSelected: boolean
  onSelect: () => void
  onGuidesChange: (guides: SnapGuide[]) => void
}

/**
 * Compute the character offset of a DOM node + offset within the contenteditable div.
 * Walks the div's child text nodes accumulating character counts.
 */
function domOffsetToCharIndex(div: HTMLDivElement, targetNode: Node, targetOffset: number): number {
  let charCount = 0
  const walker = document.createTreeWalker(div, NodeFilter.SHOW_TEXT)
  let node = walker.nextNode()
  while (node !== null) {
    if (node === targetNode) {
      return charCount + targetOffset
    }
    charCount += (node.textContent ?? '').length
    node = walker.nextNode()
  }
  return charCount
}

export function CanvasTextNode({ obj, isSelected, onSelect, onGuidesChange }: CanvasTextNodeProps): React.ReactElement {
  const textRef = useRef<Konva.Text>(null)
  const transformerRef = useRef<Konva.Transformer>(null)
  const editDivRef = useRef<HTMLDivElement | null>(null)
  const updateObject = useCanvasStore((s) => s.updateObject)
  const commitUpdate = useCanvasStore((s) => s.commitUpdate)
  const selectedIds = useCanvasStore((s) => s.selectedIds)
  const addToSelection = useCanvasStore((s) => s.addToSelection)
  const duplicateObjectAtOrigin = useCanvasStore((s) => s.duplicateObjectAtOrigin)
  const setContextMenu = useCanvasStore((s) => s.setContextMenu)
  const setTextEditing = useCanvasStore((s) => s.setTextEditing)
  const setTextSelection = useCanvasStore((s) => s.setTextSelection)
  const textEditingId = useCanvasStore((s) => s.textEditingId)
  const { computeSnap } = useSnapGuides()

  // Alt (option) key tracking for duplicate-on-drag
  const altHeldRef = useRef(false)
  const cmdHeldRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragStartYRef = useRef(0)
  const pendingDuplicateRef = useRef(false)

  // Wire transformer when selected
  useEffect(() => {
    const tr = transformerRef.current
    const node = textRef.current
    if (!tr || !node) return
    if (isSelected) {
      tr.nodes([node])
      if (obj.locked) {
        tr.enabledAnchors([])
        tr.rotateEnabled(false)
      } else {
        tr.enabledAnchors([
          'top-left', 'top-center', 'top-right',
          'middle-right', 'bottom-right', 'bottom-center',
          'bottom-left', 'middle-left',
        ])
        tr.rotateEnabled(true)
      }
      tr.getLayer()?.batchDraw()
    } else {
      tr.nodes([])
      // Use synchronous draw() when detaching so the old transformer box is
      // cleared immediately — before the newly selected transformer paints.
      tr.getLayer()?.draw()
    }
  }, [isSelected, obj.locked])

  useEffect(() => {
    const onDown = (e: KeyboardEvent): void => { if (e.altKey) altHeldRef.current = true }
    const onUp = (e: KeyboardEvent): void => { if (!e.altKey) altHeldRef.current = false }
    window.addEventListener('keydown', onDown)
    window.addEventListener('keyup', onUp)
    return () => {
      window.removeEventListener('keydown', onDown)
      window.removeEventListener('keyup', onUp)
    }
  }, [])

  useEffect(() => {
    const onDown = (e: KeyboardEvent): void => { if (e.key === 'Meta') cmdHeldRef.current = true }
    const onUp = (e: KeyboardEvent): void => { if (e.key === 'Meta') cmdHeldRef.current = false }
    window.addEventListener('keydown', onDown)
    window.addEventListener('keyup', onUp)
    return () => {
      window.removeEventListener('keydown', onDown)
      window.removeEventListener('keyup', onUp)
    }
  }, [])

  // When the panel applies a style while the contenteditable is open, re-sync the
  // CSS on each DOM <span> so the user sees the change immediately, and so the
  // finish() function can detect that text hasn't changed and use store spans directly.
  useEffect(() => {
    if (textEditingId !== obj.id) return
    const div = editDivRef.current
    if (!div) return
    const spanEls = div.querySelectorAll<HTMLElement>('span[data-span-idx]')
    spanEls.forEach((el) => {
      const idxStr = el.dataset.spanIdx
      if (idxStr === undefined) return
      const spanIdx = Number(idxStr)
      if (spanIdx >= obj.spans.length) return
      const resolved = resolveSpanStyle(obj, spanIdx)
      const cssFont = fontStyleToCSS(resolved.fontStyle)
      el.style.fontFamily = resolved.fontFamily
      el.style.fontSize = `${resolved.fontSize * CANVAS_SCALE}px`
      el.style.fontWeight = cssFont.fontWeight
      el.style.fontStyle = cssFont.fontStyle
      el.style.color = resolved.fill
      el.style.letterSpacing = `${resolved.letterSpacing * CANVAS_SCALE}px`
    })
  }, [obj.spans, obj.id, textEditingId])

  // Inline editing on double-click — contenteditable div overlay
  function handleDblClick(): void {
    if (obj.locked) return
    const node = textRef.current
    if (!node) return
    const stage = node.getStage()
    if (!stage) return

    // Capture as non-null const so finish() closure can reference it safely
    const textNode = node

    // Get absolute position of the text node on screen
    const absPos = textNode.getAbsolutePosition()
    const stageBox = stage.container().getBoundingClientRect()

    // getAbsolutePosition() already applies stage scale, so no further scaling needed
    const screenX = stageBox.left + absPos.x
    const screenY = stageBox.top + absPos.y

    // Hide the Konva text node
    textNode.visible(false)
    textNode.getLayer()?.batchDraw()

    // Snapshot original spans for Escape-cancel
    const originalSpans: TextSpan[] = obj.spans.map((s) => ({ ...s }))

    // Build contenteditable div
    const div = document.createElement('div')
    div.contentEditable = 'true'
    div.spellcheck = false
    div.style.position = 'fixed'
    div.style.left = `${screenX}px`
    div.style.top = `${screenY}px`
    div.style.width = `${obj.width * CANVAS_SCALE}px`
    div.style.minHeight = `${obj.height * CANVAS_SCALE}px`
    div.style.whiteSpace = 'pre-wrap'
    div.style.wordWrap = 'break-word'
    div.style.lineHeight = String(obj.lineHeight)
    div.style.textAlign = obj.align
    div.style.background = 'transparent'
    div.style.border = '1px dashed #0af'
    div.style.outline = 'none'
    div.style.padding = '0'
    div.style.margin = '0'
    div.style.overflow = 'hidden'
    div.style.zIndex = '9999'
    // Base font from layer defaults (visual reference)
    div.style.fontFamily = obj.fontFamily
    div.style.fontSize = `${obj.fontSize * CANVAS_SCALE}px`
    div.style.color = obj.fill

    // Populate one <span> per TextSpan
    obj.spans.forEach((span, i) => {
      const resolved = resolveSpanStyle(obj, i)
      const cssFont = fontStyleToCSS(resolved.fontStyle)
      const spanEl = document.createElement('span')
      spanEl.dataset.spanIdx = String(i)
      spanEl.textContent = span.text
      spanEl.style.fontFamily = resolved.fontFamily
      spanEl.style.fontSize = `${resolved.fontSize * CANVAS_SCALE}px`
      spanEl.style.fontWeight = cssFont.fontWeight
      spanEl.style.fontStyle = cssFont.fontStyle
      spanEl.style.color = resolved.fill
      spanEl.style.letterSpacing = `${resolved.letterSpacing * CANVAS_SCALE}px`
      div.appendChild(spanEl)
    })

    document.body.appendChild(div)
    editDivRef.current = div
    div.focus()

    // Select all text on entry
    const range = document.createRange()
    range.selectNodeContents(div)
    const sel = window.getSelection()
    if (sel) {
      sel.removeAllRanges()
      sel.addRange(range)
    }

    setTextEditing(obj.id)

    // Read the current DOM selection and store it if it's a real range (non-collapsed)
    // inside the div. Called from explicit user-gesture events (mouseup, keyup with Shift).
    function captureSelection(): void {
      const selection = window.getSelection()
      if (!selection || selection.rangeCount === 0) return
      const r = selection.getRangeAt(0)
      if (!div.contains(r.commonAncestorContainer)) return
      const s = domOffsetToCharIndex(div, r.startContainer, r.startOffset)
      const e = domOffsetToCharIndex(div, r.endContainer, r.endOffset)
      const start = Math.min(s, e)
      const end = Math.max(s, e)
      if (start === end) return  // collapsed — don't overwrite last real selection
      setTextSelection({ start, end })
    }

    // Clear the stored selection whenever the user starts a fresh interaction inside the
    // div (click to reposition cursor, type a character). The selection will be re-set
    // by captureSelection() if the gesture turns into a drag-select.
    div.addEventListener('mousedown', () => setTextSelection(null))
    div.addEventListener('input', () => setTextSelection(null))
    // Keyboard-driven selection (Shift+Arrow, Cmd+A)
    div.addEventListener('keyup', (e) => {
      if (e.shiftKey || (e.metaKey && e.key === 'a')) captureSelection()
      // Non-shift nav key = user moved cursor without selecting → clear
      else if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(e.key)) {
        setTextSelection(null)
      }
    })
    // Mouse-drag selection completes on mouseup
    div.addEventListener('mouseup', captureSelection)

    // Sync the initial "select all" range immediately after entry
    captureSelection()

    let cancelled = false
    let finished = false

    function finish(): void {
      if (finished) return
      finished = true
      document.removeEventListener('mousedown', handleDocMouseDown)
      document.removeEventListener('keydown', handleDocKeyDown)
      editDivRef.current = null

      if (cancelled) {
        document.body.removeChild(div)
        textNode.visible(true)
        textNode.getLayer()?.batchDraw()
        setTextEditing(null)
        setTextSelection(null)
        return
      }

      // The panel may have applied applyStyleToRange during this session, updating
      // obj.spans in the store. Read the freshest state for style recovery.
      const currentObj = useCanvasStore.getState().objects[obj.id] as TextObject | undefined
      const currentSpans = currentObj?.spans ?? originalSpans

      const domText = div.textContent ?? ''
      const storeText = spanText({ ...obj, spans: currentSpans })

      let finalSpans: TextSpan[]

      if (domText === storeText) {
        // Text unchanged — user only styled. Store spans are already correct.
        finalSpans = currentSpans
      } else {
        // Text was edited — reconstruct spans from DOM children.
        const rebuilt: TextSpan[] = []
        div.childNodes.forEach((child) => {
          if (child.nodeType === Node.TEXT_NODE) {
            const text = child.textContent ?? ''
            if (text.length > 0) {
              const prevSibling = child.previousSibling
              const inheritStyle = prevSibling instanceof HTMLElement
                ? currentSpans[Number(prevSibling.dataset.spanIdx ?? 0)]?.style
                : currentSpans[0]?.style
              rebuilt.push({ text, style: inheritStyle })
            }
          } else if (child.nodeType === Node.ELEMENT_NODE) {
            const el = child as HTMLElement
            const text = el.textContent ?? ''
            if (text.length === 0) return
            const idxStr = el.dataset.spanIdx
            const style = idxStr !== undefined ? currentSpans[Number(idxStr)]?.style : undefined
            rebuilt.push({ text, style })
          }
        })
        finalSpans = rebuilt.length > 0 ? rebuilt : [{ text: '' }]
      }

      document.body.removeChild(div)
      textNode.visible(true)
      textNode.getLayer()?.batchDraw()

      const finalText = finalSpans.map((s) => s.text).join('')
      const spansChanged = finalText !== storeText
        || finalSpans.length !== currentSpans.length
        || finalSpans.some((s, i) => s.text !== currentSpans[i]?.text)

      if (spansChanged) {
        commitUpdate(obj.id, { spans: finalSpans } as Partial<TextObject> as Partial<CanvasObject>)
      }

      setTextEditing(null)
      setTextSelection(null)
    }

    // Exit when the user clicks outside the editing div AND outside the properties panel.
    // Using mousedown (not blur) so panel button clicks don't end the session before
    // the panel's own click handler fires.
    function handleDocMouseDown(e: MouseEvent): void {
      const target = e.target as Node
      const panel = document.getElementById('properties-panel')
      if (div.contains(target)) return
      if (panel?.contains(target)) return
      finish()
    }
    document.addEventListener('mousedown', handleDocMouseDown)

    // Escape exits regardless of where focus is
    function handleDocKeyDown(e: KeyboardEvent): void {
      if (e.key === 'Escape') {
        cancelled = true
        finish()
      }
    }
    document.addEventListener('keydown', handleDocKeyDown)
  }

  // Show multi-select outline when in selectedIds but not the primary selected
  const isInMultiSelect = selectedIds.includes(obj.id) && !isSelected

  return (
    <>
      {/* Multi-select outline rect (rendered behind text) */}
      {isInMultiSelect && (
        <Rect
          x={obj.x}
          y={obj.y}
          width={obj.width}
          height={obj.height}
          rotation={obj.rotation}
          fill="transparent"
          stroke="#0096ff"
          strokeWidth={1}
          strokeScaleEnabled={false}
          perfectDrawEnabled={false}
          listening={false}
        />
      )}

      <KonvaText
        ref={textRef}
        x={obj.x}
        y={obj.y}
        width={obj.width}
        height={obj.height}
        rotation={obj.rotation}
        scaleX={obj.scaleX}
        scaleY={obj.scaleY}
        opacity={obj.opacity}
        text={spanText(obj)}
        fontFamily={obj.fontFamily}
        fontSize={obj.fontSize}
        fontStyle={obj.fontStyle}
        align={obj.align}
        fill={obj.fill}
        letterSpacing={obj.letterSpacing}
        lineHeight={obj.lineHeight}
        wrap="word"
        draggable={!obj.locked}
        onClick={(e) => {
          if (e.evt.shiftKey) {
            addToSelection(obj.id)
          } else {
            onSelect()
          }
        }}
        onTap={onSelect}
        onDblClick={handleDblClick}
        onDragStart={() => {
          dragStartXRef.current = obj.x
          dragStartYRef.current = obj.y
          pendingDuplicateRef.current = false
        }}
        onDragMove={(e) => {
          const dragNode = e.target as Konva.Text
          const rawX = dragNode.x()
          const rawY = dragNode.y()

          const { x: snappedX, y: snappedY, guides } = computeSnap(
            { x: rawX, y: rawY, width: obj.width, height: obj.height },
            obj.id,
          )

          dragNode.x(snappedX)
          dragNode.y(snappedY)
          onGuidesChange(guides)
          updateObject(obj.id, { x: snappedX, y: snappedY })

          if (altHeldRef.current && !pendingDuplicateRef.current) {
            pendingDuplicateRef.current = true
          }
        }}
        onDragEnd={(e) => {
          onGuidesChange([])
          if (pendingDuplicateRef.current) {
            const originPos = { x: dragStartXRef.current, y: dragStartYRef.current }
            const finalPos = { x: e.target.x(), y: e.target.y() }
            duplicateObjectAtOrigin(obj.id, originPos, finalPos)
            pendingDuplicateRef.current = false
          } else {
            commitUpdate(obj.id, { x: e.target.x(), y: e.target.y() })
          }
        }}
        onTransform={(e) => {
          const node = e.target as Konva.Text
          const absWidth = node.width() * node.scaleX()
          const absHeight = node.height() * node.scaleY()
          node.width(absWidth)
          node.height(absHeight)
          node.scaleX(1)
          node.scaleY(1)
          updateObject(obj.id, {
            x: node.x(),
            y: node.y(),
            width: absWidth,
            height: absHeight,
            scaleX: 1,
            scaleY: 1,
            rotation: node.rotation(),
          })
        }}
        onTransformEnd={(e) => {
          const node = e.target as Konva.Text
          const absWidth = node.width() * node.scaleX()
          const absHeight = node.height() * node.scaleY()
          node.width(absWidth)
          node.height(absHeight)
          node.scaleX(1)
          node.scaleY(1)
          const evt = e.evt as MouseEvent
          const isPropScale = (cmdHeldRef.current || evt.metaKey) && evt.shiftKey
          if (isPropScale && obj.width > 0) {
            const newFontSize = Math.max(4, Math.round(obj.fontSize * (absWidth / obj.width)))
            commitUpdate(obj.id, {
              x: node.x(), y: node.y(),
              width: absWidth, height: absHeight,
              scaleX: 1, scaleY: 1,
              rotation: node.rotation(),
              fontSize: newFontSize,
            })
          } else {
            commitUpdate(obj.id, {
              x: node.x(), y: node.y(),
              width: absWidth, height: absHeight,
              scaleX: 1, scaleY: 1,
              rotation: node.rotation(),
            })
          }
        }}
        onContextMenu={(e) => {
          e.evt.preventDefault()
          e.cancelBubble = true
          if (!isSelected) onSelect()
          setContextMenu({ x: e.evt.clientX, y: e.evt.clientY, targetId: obj.id })
        }}
      />
      <Transformer
        ref={transformerRef}
        keepRatio={false}
        enabledAnchors={[
          'top-left', 'top-center', 'top-right',
          'middle-right', 'bottom-right', 'bottom-center',
          'bottom-left', 'middle-left',
        ]}
        boundBoxFunc={(oldBox, newBox) => {
          if (newBox.width < 20 || newBox.height < 10) return oldBox
          return newBox
        }}
      />
    </>
  )
}
