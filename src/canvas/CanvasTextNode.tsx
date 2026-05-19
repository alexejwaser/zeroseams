import React, { useRef, useEffect } from 'react'
import { Text as KonvaText, Rect, Transformer } from 'react-konva'
import type Konva from 'konva'
import type { TextObject } from '@/types/canvas'
import { CANVAS_SCALE } from './constants'
import { useCanvasStore } from './useCanvasStore'
import { useSnapGuides } from './useSnapGuides'
import type { SnapGuide } from './useSnapGuides'

interface CanvasTextNodeProps {
  obj: TextObject
  isSelected: boolean
  onSelect: () => void
  onGuidesChange: (guides: SnapGuide[]) => void
}

export function CanvasTextNode({ obj, isSelected, onSelect, onGuidesChange }: CanvasTextNodeProps): React.ReactElement {
  const textRef = useRef<Konva.Text>(null)
  const transformerRef = useRef<Konva.Transformer>(null)
  const updateObject = useCanvasStore((s) => s.updateObject)
  const commitUpdate = useCanvasStore((s) => s.commitUpdate)
  const selectedIds = useCanvasStore((s) => s.selectedIds)
  const addToSelection = useCanvasStore((s) => s.addToSelection)
  const duplicateObjectAtOrigin = useCanvasStore((s) => s.duplicateObjectAtOrigin)
  const setContextMenu = useCanvasStore((s) => s.setContextMenu)
  const { computeSnap } = useSnapGuides()

  // Alt (option) key tracking for duplicate-on-drag
  const altHeldRef = useRef(false)
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
        tr.enabledAnchors(['top-left', 'top-right', 'bottom-left', 'bottom-right'])
        tr.rotateEnabled(true)
      }
      tr.getLayer()?.batchDraw()
    } else {
      tr.nodes([])
      // Use synchronous draw() when detaching so the old transformer box is
      // cleared immediately — before the newly selected transformer paints.
      // batchDraw() is deferred (rAF) and can leave the ghost box visible if
      // the two deferred repaints coalesce or resolve in the wrong order.
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

  // Inline editing on double-click
  function handleDblClick(): void {
    if (obj.locked) return
    const node = textRef.current
    if (!node) return
    const stage = node.getStage()
    if (!stage) return

    // Capture as non-null const so the finish() closure can reference it safely
    const textNode = node

    // Get absolute position of the text node on screen
    const absPos = textNode.getAbsolutePosition()
    const stageBox = stage.container().getBoundingClientRect()

    // getAbsolutePosition() already applies the stage scale, so no further scaling needed
    const screenX = stageBox.left + absPos.x
    const screenY = stageBox.top + absPos.y

    // Hide the node
    textNode.visible(false)
    textNode.getLayer()?.batchDraw()

    // Create textarea
    const textarea = document.createElement('textarea')
    textarea.value = obj.text
    textarea.style.position = 'fixed'
    textarea.style.left = `${screenX}px`
    textarea.style.top = `${screenY}px`
    textarea.style.width = `${obj.width * obj.scaleX * CANVAS_SCALE}px`
    textarea.style.minHeight = `${obj.height * obj.scaleY * CANVAS_SCALE}px`
    textarea.style.fontSize = `${obj.fontSize * obj.scaleX * CANVAS_SCALE}px`
    textarea.style.fontFamily = obj.fontFamily
    textarea.style.fontStyle = obj.fontStyle
    textarea.style.textAlign = obj.align
    textarea.style.color = obj.fill
    textarea.style.background = 'transparent'
    textarea.style.border = '1px dashed #0af'
    textarea.style.outline = 'none'
    textarea.style.resize = 'none'
    textarea.style.padding = '0'
    textarea.style.margin = '0'
    textarea.style.overflow = 'hidden'
    textarea.style.zIndex = '9999'
    textarea.style.lineHeight = String(obj.lineHeight)
    textarea.style.letterSpacing = `${obj.letterSpacing * obj.scaleX}px`
    document.body.appendChild(textarea)
    textarea.focus()
    textarea.select()

    function finish(): void {
      const newText = textarea.value
      document.body.removeChild(textarea)
      textNode.visible(true)
      textNode.getLayer()?.batchDraw()
      if (newText !== obj.text) {
        commitUpdate(obj.id, { text: newText })
      }
    }

    textarea.addEventListener('blur', finish, { once: true })
    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        textarea.blur()
      }
    })
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
          width={obj.width * obj.scaleX}
          height={obj.height * obj.scaleY}
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
        text={obj.text}
        fontFamily={obj.fontFamily}
        fontSize={obj.fontSize}
        fontStyle={obj.fontStyle}
        align={obj.align}
        fill={obj.fill}
        letterSpacing={obj.letterSpacing}
        lineHeight={obj.lineHeight}
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
            { x: rawX, y: rawY, width: obj.width * obj.scaleX, height: obj.height * obj.scaleY },
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
          updateObject(obj.id, {
            x: node.x(), y: node.y(),
            scaleX: node.scaleX(), scaleY: node.scaleY(),
            rotation: node.rotation(),
          })
        }}
        onTransformEnd={(e) => {
          const node = e.target as Konva.Text
          commitUpdate(obj.id, {
            x: node.x(), y: node.y(),
            scaleX: node.scaleX(), scaleY: node.scaleY(),
            rotation: node.rotation(),
          })
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
        enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
        boundBoxFunc={(oldBox, newBox) => {
          if (newBox.width < 5 || newBox.height < 5) return oldBox
          return newBox
        }}
      />
    </>
  )
}
