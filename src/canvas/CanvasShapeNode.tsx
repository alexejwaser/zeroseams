import React, { useRef, useEffect } from 'react'
import { Rect as KonvaRect, Ellipse as KonvaEllipse, Line as KonvaLine, Transformer } from 'react-konva'
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
  const { computeSnap } = useSnapGuides()

  const altHeldRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragStartYRef = useRef(0)
  const pendingDuplicateRef = useRef(false)

  // Wire transformer when selected/locked state changes
  useEffect(() => {
    const tr = transformerRef.current
    const node = shapeRef.current
    if (!tr || !node) return
    if (isSelected) {
      tr.nodes([node])
      if (obj.locked) {
        tr.enabledAnchors([])
        tr.rotateEnabled(false)
      } else if (obj.kind === 'line' || obj.kind === 'arrow') {
        tr.enabledAnchors(['middle-left', 'middle-right'])
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

  function handleTransform(e: Konva.KonvaEventObject<Event>): void {
    const node = e.target as Konva.Shape
    const { x, y } = getTopLeftFromNode(node)
    const { width, height } = getDimsFromNode(node)
    bakeNodeScale(node, width, height, x, y)
    updateObject(obj.id, { x, y, width, height, scaleX: 1, scaleY: 1, rotation: node.rotation() })
  }

  function handleTransformEnd(e: Konva.KonvaEventObject<Event>): void {
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
      {isInMultiSelect && (
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

      {(obj.kind === 'line' || obj.kind === 'arrow') && (
        <KonvaLine
          ref={shapeRef as React.RefObject<Konva.Line>}
          x={obj.x}
          y={obj.y}
          points={[0, 0, obj.width, obj.height]}
          stroke={obj.stroke || obj.fill}
          strokeWidth={Math.max(obj.strokeWidth, 2)}
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

      <Transformer
        ref={transformerRef}
        keepRatio={false}
        boundBoxFunc={(oldBox, newBox) => {
          if (newBox.width < 5 || newBox.height < 5) return oldBox
          return newBox
        }}
      />
    </>
  )
}
