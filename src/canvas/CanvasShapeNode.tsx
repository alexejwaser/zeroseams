import React, { useRef, useEffect } from 'react'
import {
  Rect as KonvaRect,
  Ellipse as KonvaEllipse,
  Line as KonvaLine,
  Arrow as KonvaArrow,
  Circle as KonvaCircle,
  Transformer,
} from 'react-konva'
import type Konva from 'konva'
import type { ShapeObject } from '@/types/canvas'
import { useCanvasStore } from './useCanvasStore'
import { useSnapGuides } from './useSnapGuides'
import type { SnapGuide } from './useSnapGuides'

interface CanvasShapeNodeProps {
  obj: ShapeObject
  isSelected: boolean
  onSelect: () => void
  onGuidesChange: (guides: SnapGuide[]) => void
}

export function CanvasShapeNode({ obj, isSelected, onSelect, onGuidesChange }: CanvasShapeNodeProps): React.ReactElement {
  const shapeRef = useRef<Konva.Shape>(null)
  const transformerRef = useRef<Konva.Transformer>(null)
  const updateObject = useCanvasStore((s) => s.updateObject)
  const commitUpdate = useCanvasStore((s) => s.commitUpdate)
  const selectedIds = useCanvasStore((s) => s.selectedIds)
  const addToSelection = useCanvasStore((s) => s.addToSelection)
  const duplicateObjectAtOrigin = useCanvasStore((s) => s.duplicateObjectAtOrigin)
  const setContextMenu = useCanvasStore((s) => s.setContextMenu)
  const { computeSnap, computeSnapResize } = useSnapGuides()
  const pendingGuidesRef = useRef<SnapGuide[]>([])

  const altHeldRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragStartYRef = useRef(0)
  const pendingDuplicateRef = useRef(false)
  const lineDragOriginRef = useRef<{ x1: number; y1: number; x2: number; y2: number } | null>(null)

  // Wire transformer when selected/locked state changes
  useEffect(() => {
    const tr = transformerRef.current
    const node = shapeRef.current
    if (!tr || !node) return
    if (isSelected) {
      if (obj.kind === 'line' || obj.kind === 'arrow') {
        tr.nodes([])
        tr.getLayer()?.batchDraw()
      } else if (obj.locked) {
        tr.nodes([node])
        tr.enabledAnchors([])
        tr.rotateEnabled(false)
        tr.getLayer()?.batchDraw()
      } else {
        tr.nodes([node])
        tr.enabledAnchors([
          'top-left', 'top-center', 'top-right',
          'middle-right', 'bottom-right', 'bottom-center',
          'bottom-left', 'middle-left',
        ])
        tr.rotateEnabled(true)
        tr.getLayer()?.batchDraw()
      }
    } else {
      tr.nodes([])
      tr.getLayer()?.draw()
    }
  }, [isSelected, obj.locked, obj.kind])

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

  // For ellipse: Konva Ellipse center = (obj.x + obj.width/2, obj.y + obj.height/2)
  // For rect/line: Konva node top-left = (obj.x, obj.y)

  function getTopLeftFromNode(node: Konva.Shape): { x: number; y: number } {
    if (obj.kind === 'ellipse') {
      const el = node as Konva.Ellipse
      return { x: el.x() - el.radiusX() * el.scaleX(), y: el.y() - el.radiusY() * el.scaleY() }
    }
    return { x: node.x(), y: node.y() }
  }

  function getDimsFromNode(node: Konva.Shape): { width: number; height: number } {
    if (obj.kind === 'ellipse') {
      const el = node as Konva.Ellipse
      return { width: el.radiusX() * el.scaleX() * 2, height: el.radiusY() * el.scaleY() * 2 }
    }
    return { width: node.width() * node.scaleX(), height: node.height() * node.scaleY() }
  }

  function bakeNodeScale(node: Konva.Shape, width: number, height: number, x: number, y: number): void {
    if (obj.kind === 'ellipse') {
      const el = node as Konva.Ellipse
      el.radiusX(width / 2)
      el.radiusY(height / 2)
      el.x(x + width / 2)
      el.y(y + height / 2)
    } else {
      node.x(x)
      node.y(y)
      node.width(width)
      node.height(height)
    }
    node.scaleX(1)
    node.scaleY(1)
  }

  const isInMultiSelect = selectedIds.includes(obj.id) && !isSelected

  function handleClick(e: Konva.KonvaEventObject<MouseEvent>): void {
    if (e.evt.shiftKey) {
      addToSelection(obj.id)
    } else {
      onSelect()
    }
  }

  // --- rect/ellipse drag handlers ---

  function handleDragStart(): void {
    dragStartXRef.current = obj.x
    dragStartYRef.current = obj.y
    pendingDuplicateRef.current = false
  }

  function handleDragMove(e: Konva.KonvaEventObject<DragEvent>): void {
    const node = e.target as Konva.Shape
    let rawX: number
    let rawY: number
    if (obj.kind === 'ellipse') {
      rawX = node.x() - obj.width / 2
      rawY = node.y() - obj.height / 2
    } else {
      rawX = node.x()
      rawY = node.y()
    }
    const { x: snappedX, y: snappedY, guides } = computeSnap(
      { x: rawX, y: rawY, width: obj.width, height: obj.height },
      obj.id,
    )
    if (obj.kind === 'ellipse') {
      node.x(snappedX + obj.width / 2)
      node.y(snappedY + obj.height / 2)
    } else {
      node.x(snappedX)
      node.y(snappedY)
    }
    onGuidesChange(guides)
    updateObject(obj.id, { x: snappedX, y: snappedY })
    if (altHeldRef.current && !pendingDuplicateRef.current) {
      pendingDuplicateRef.current = true
    }
  }

  function handleDragEnd(e: Konva.KonvaEventObject<DragEvent>): void {
    onGuidesChange([])
    const node = e.target as Konva.Shape
    let finalX: number
    let finalY: number
    if (obj.kind === 'ellipse') {
      finalX = node.x() - obj.width / 2
      finalY = node.y() - obj.height / 2
    } else {
      finalX = node.x()
      finalY = node.y()
    }
    if (pendingDuplicateRef.current) {
      duplicateObjectAtOrigin(
        obj.id,
        { x: dragStartXRef.current, y: dragStartYRef.current },
        { x: finalX, y: finalY },
      )
      pendingDuplicateRef.current = false
    } else {
      commitUpdate(obj.id, { x: finalX, y: finalY })
    }
  }

  // --- line/arrow drag handlers ---

  function handleLineDragStart(): void {
    pendingDuplicateRef.current = false
    lineDragOriginRef.current = {
      x1: obj.x, y1: obj.y,
      x2: obj.x2 ?? obj.x + obj.width,
      y2: obj.y2 ?? obj.y + obj.height,
    }
    dragStartXRef.current = obj.x
    dragStartYRef.current = obj.y
  }

  function handleLineDragMove(e: Konva.KonvaEventObject<DragEvent>): void {
    const node = e.target as Konva.Line
    const dx = node.x(); const dy = node.y()
    const origin = lineDragOriginRef.current
    if (!origin) return
    const newX1 = origin.x1 + dx; const newY1 = origin.y1 + dy
    const newX2 = origin.x2 + dx; const newY2 = origin.y2 + dy
    node.x(0); node.y(0)
    onGuidesChange([])
    updateObject(obj.id, {
      x: newX1, y: newY1,
      x2: newX2, y2: newY2,
      width: Math.abs(newX2 - newX1), height: Math.abs(newY2 - newY1),
    })
    if (altHeldRef.current && !pendingDuplicateRef.current) pendingDuplicateRef.current = true
  }

  function handleLineDragEnd(): void {
    onGuidesChange([])
    const origin = lineDragOriginRef.current
    lineDragOriginRef.current = null
    if (pendingDuplicateRef.current && origin) {
      duplicateObjectAtOrigin(
        obj.id,
        { x: origin.x1, y: origin.y1 },
        { x: obj.x, y: obj.y },
      )
      pendingDuplicateRef.current = false
    } else {
      commitUpdate(obj.id, {
        x: obj.x, y: obj.y, x2: obj.x2, y2: obj.y2,
        width: obj.width, height: obj.height,
      })
    }
  }

  // --- endpoint circle handlers ---

  function handleEndpointDragMove(endpoint: 'a' | 'b', e: Konva.KonvaEventObject<DragEvent>): void {
    const node = e.target as Konva.Circle
    const nx = node.x(); const ny = node.y()
    if (endpoint === 'a') {
      const x2 = obj.x2 ?? obj.x + obj.width
      const y2 = obj.y2 ?? obj.y + obj.height
      updateObject(obj.id, { x: nx, y: ny, width: x2 - nx, height: y2 - ny })
    } else {
      updateObject(obj.id, { x2: nx, y2: ny, width: nx - obj.x, height: ny - obj.y })
    }
  }

  function handleEndpointDragEnd(endpoint: 'a' | 'b', e: Konva.KonvaEventObject<DragEvent>): void {
    const node = e.target as Konva.Circle
    const nx = node.x(); const ny = node.y()
    if (endpoint === 'a') {
      const x2 = obj.x2 ?? obj.x + obj.width
      const y2 = obj.y2 ?? obj.y + obj.height
      commitUpdate(obj.id, { x: nx, y: ny, width: x2 - nx, height: y2 - ny })
    } else {
      commitUpdate(obj.id, { x2: nx, y2: ny, width: nx - obj.x, height: ny - obj.y })
    }
  }

  function handleTransform(e: Konva.KonvaEventObject<Event>): void {
    onGuidesChange(pendingGuidesRef.current)
    const node = e.target as Konva.Shape
    const { x, y } = getTopLeftFromNode(node)
    const { width, height } = getDimsFromNode(node)
    bakeNodeScale(node, width, height, x, y)
    updateObject(obj.id, { x, y, width, height, scaleX: 1, scaleY: 1, rotation: node.rotation() })
  }

  function handleTransformEnd(e: Konva.KonvaEventObject<Event>): void {
    onGuidesChange([])
    const node = e.target as Konva.Shape
    const { x, y } = getTopLeftFromNode(node)
    const { width, height } = getDimsFromNode(node)
    bakeNodeScale(node, width, height, x, y)
    commitUpdate(obj.id, { x, y, width, height, scaleX: 1, scaleY: 1, rotation: node.rotation() })
  }

  function handleContextMenu(e: Konva.KonvaEventObject<PointerEvent>): void {
    e.evt.preventDefault()
    e.cancelBubble = true
    if (!isSelected) onSelect()
    setContextMenu({ x: e.evt.clientX, y: e.evt.clientY, targetId: obj.id })
  }

  return (
    <>
      {isInMultiSelect && (obj.kind === 'line' || obj.kind === 'arrow') && (
        <KonvaLine
          points={[obj.x, obj.y, obj.x2 ?? obj.x + obj.width, obj.y2 ?? obj.y + obj.height]}
          stroke="#0096ff" strokeWidth={1} strokeScaleEnabled={false}
          perfectDrawEnabled={false} listening={false}
        />
      )}
      {isInMultiSelect && obj.kind !== 'line' && obj.kind !== 'arrow' && (
        <KonvaRect
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

      {obj.kind === 'rect' && (
        <KonvaRect
          ref={shapeRef as React.RefObject<Konva.Rect>}
          x={obj.x}
          y={obj.y}
          width={obj.width}
          height={obj.height}
          cornerRadius={obj.cornerRadius ?? 0}
          fill={obj.fill}
          stroke={obj.stroke}
          strokeWidth={obj.strokeWidth}
          strokeScaleEnabled={false}
          opacity={obj.opacity}
          rotation={obj.rotation}
          perfectDrawEnabled={false}
          draggable={!obj.locked}
          onClick={handleClick}
          onTap={onSelect}
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
          onTransform={handleTransform}
          onTransformEnd={handleTransformEnd}
          onContextMenu={handleContextMenu}
        />
      )}

      {obj.kind === 'ellipse' && (
        <KonvaEllipse
          ref={shapeRef as React.RefObject<Konva.Ellipse>}
          x={obj.x + obj.width / 2}
          y={obj.y + obj.height / 2}
          radiusX={obj.width / 2}
          radiusY={obj.height / 2}
          fill={obj.fill}
          stroke={obj.stroke}
          strokeWidth={obj.strokeWidth}
          strokeScaleEnabled={false}
          opacity={obj.opacity}
          rotation={obj.rotation}
          perfectDrawEnabled={false}
          draggable={!obj.locked}
          onClick={handleClick}
          onTap={onSelect}
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
          onTransform={handleTransform}
          onTransformEnd={handleTransformEnd}
          onContextMenu={handleContextMenu}
        />
      )}

      {(obj.kind === 'line' || obj.kind === 'arrow') && (() => {
        const x1 = obj.x; const y1 = obj.y
        const x2 = obj.x2 ?? obj.x + obj.width
        const y2 = obj.y2 ?? obj.y + obj.height
        const color = (obj.stroke && obj.stroke !== 'transparent') ? obj.stroke : obj.fill
        const lw = Math.max(obj.strokeWidth, 2)
        return (
          <>
            {/* Fat transparent hit+drag area for body move */}
            <KonvaLine
              ref={shapeRef as React.RefObject<Konva.Line>}
              points={[x1, y1, x2, y2]}
              stroke="transparent"
              strokeWidth={Math.max(lw, 16)}
              strokeScaleEnabled={false}
              listening={!obj.locked}
              draggable={!obj.locked}
              onClick={handleClick}
              onTap={onSelect}
              onDragStart={handleLineDragStart}
              onDragMove={handleLineDragMove}
              onDragEnd={handleLineDragEnd}
              onContextMenu={handleContextMenu}
            />
            {obj.kind === 'line' && (
              <KonvaLine
                points={[x1, y1, x2, y2]}
                stroke={color}
                strokeWidth={lw}
                strokeScaleEnabled={false}
                opacity={obj.opacity}
                perfectDrawEnabled={false}
                listening={false}
              />
            )}
            {obj.kind === 'arrow' && (
              <KonvaArrow
                points={[x1, y1, x2, y2]}
                stroke={color}
                fill={color}
                strokeWidth={lw}
                pointerLength={lw * 4}
                pointerWidth={lw * 3}
                strokeScaleEnabled={false}
                opacity={obj.opacity}
                perfectDrawEnabled={false}
                listening={false}
              />
            )}
            {isSelected && (
              <KonvaLine
                points={[x1, y1, x2, y2]}
                stroke="#0096ff"
                strokeWidth={1}
                strokeScaleEnabled={false}
                dash={[6, 3]}
                perfectDrawEnabled={false}
                listening={false}
              />
            )}
            {isSelected && !obj.locked && (
              <>
                <KonvaCircle
                  x={x1} y={y1} radius={6}
                  fill="#fff" stroke="#0096ff" strokeWidth={2}
                  draggable
                  onDragMove={(e) => handleEndpointDragMove('a', e)}
                  onDragEnd={(e) => handleEndpointDragEnd('a', e)}
                />
                <KonvaCircle
                  x={x2} y={y2} radius={6}
                  fill="#fff" stroke="#0096ff" strokeWidth={2}
                  draggable
                  onDragMove={(e) => handleEndpointDragMove('b', e)}
                  onDragEnd={(e) => handleEndpointDragEnd('b', e)}
                />
              </>
            )}
          </>
        )
      })()}

      <Transformer
        ref={transformerRef}
        keepRatio={false}
        boundBoxFunc={(oldBox, newBox) => {
          if (newBox.width < 5 || newBox.height < 5) return oldBox
          const rotation = newBox.rotation ?? 0
          const anchor = transformerRef.current?.getActiveAnchor() ?? ''
          if (Math.abs(rotation) > 0.01 || !anchor || anchor === 'rotater') {
            pendingGuidesRef.current = []
            return newBox
          }
          const { box: snapped, guides } = computeSnapResize(
            { x: newBox.x, y: newBox.y, width: newBox.width, height: newBox.height },
            anchor,
            obj.id,
          )
          pendingGuidesRef.current = guides
          return { ...snapped, rotation: newBox.rotation }
        }}
      />
    </>
  )
}
