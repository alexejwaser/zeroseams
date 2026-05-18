import React, { useRef, useEffect } from 'react'
import { Text as KonvaText, Transformer } from 'react-konva'
import type Konva from 'konva'
import type { TextObject } from '@/types/canvas'
import { CANVAS_SCALE } from './constants'
import { useCanvasStore } from './useCanvasStore'

interface CanvasTextNodeProps {
  obj: TextObject
  isSelected: boolean
  onSelect: () => void
}

export function CanvasTextNode({ obj, isSelected, onSelect }: CanvasTextNodeProps): React.ReactElement {
  const textRef = useRef<Konva.Text>(null)
  const transformerRef = useRef<Konva.Transformer>(null)
  const updateObject = useCanvasStore((s) => s.updateObject)
  const commitUpdate = useCanvasStore((s) => s.commitUpdate)

  // Wire transformer when selected
  useEffect(() => {
    const tr = transformerRef.current
    const node = textRef.current
    if (!tr || !node) return
    if (isSelected) {
      tr.nodes([node])
      tr.getLayer()?.batchDraw()
    } else {
      tr.nodes([])
      // Use synchronous draw() when detaching so the old transformer box is
      // cleared immediately — before the newly selected transformer paints.
      // batchDraw() is deferred (rAF) and can leave the ghost box visible if
      // the two deferred repaints coalesce or resolve in the wrong order.
      tr.getLayer()?.draw()
    }
  }, [isSelected])

  // Inline editing on double-click
  function handleDblClick(): void {
    const node = textRef.current
    if (!node) return
    const stage = node.getStage()
    if (!stage) return

    // Get absolute position of the text node on screen
    const absPos = node.getAbsolutePosition()
    const stageBox = stage.container().getBoundingClientRect()

    // getAbsolutePosition() already applies the stage scale, so no further scaling needed
    const screenX = stageBox.left + absPos.x
    const screenY = stageBox.top + absPos.y

    // Hide the node
    node.visible(false)
    node.getLayer()?.batchDraw()

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
      node.visible(true)
      node.getLayer()?.batchDraw()
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

  return (
    <>
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
        onClick={onSelect}
        onTap={onSelect}
        onDblClick={handleDblClick}
        onDragMove={(e) => {
          updateObject(obj.id, { x: e.target.x(), y: e.target.y() })
        }}
        onDragEnd={(e) => {
          commitUpdate(obj.id, { x: e.target.x(), y: e.target.y() })
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
