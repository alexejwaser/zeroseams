import React, { useRef, useEffect } from 'react'
import { Image as KonvaImage, Transformer } from 'react-konva'
import useImage from 'use-image'
import type Konva from 'konva'
import type { ImageObject } from '@/types/canvas'
import { useCanvasStore } from './useCanvasStore'

interface CanvasImageNodeProps {
  obj: ImageObject
  isSelected: boolean
  onSelect: () => void
}

export function CanvasImageNode({
  obj,
  isSelected,
  onSelect,
}: CanvasImageNodeProps): React.ReactElement | null {
  const [image] = useImage(obj.src)
  const imageRef = useRef<Konva.Image>(null)
  const transformerRef = useRef<Konva.Transformer>(null)
  const updateObject = useCanvasStore((s) => s.updateObject)

  useEffect(() => {
    if (isSelected && transformerRef.current && imageRef.current) {
      transformerRef.current.nodes([imageRef.current])
      transformerRef.current.getLayer()?.batchDraw()
    }
  }, [isSelected])

  if (!image) return null

  return (
    <>
      <KonvaImage
        ref={imageRef}
        image={image}
        x={obj.x}
        y={obj.y}
        width={obj.width}
        height={obj.height}
        rotation={obj.rotation}
        scaleX={obj.scaleX}
        scaleY={obj.scaleY}
        opacity={obj.opacity}
        draggable={!obj.locked}
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) => {
          updateObject(obj.id, {
            x: e.target.x(),
            y: e.target.y(),
          })
        }}
        onTransformEnd={(e) => {
          const node = e.target as Konva.Image
          updateObject(obj.id, {
            x: node.x(),
            y: node.y(),
            scaleX: node.scaleX(),
            scaleY: node.scaleY(),
            rotation: node.rotation(),
          })
        }}
      />
      {isSelected && (
        <Transformer
          ref={transformerRef}
          boundBoxFunc={(oldBox, newBox) => {
            // Prevent scaling to zero
            if (newBox.width < 5 || newBox.height < 5) return oldBox
            return newBox
          }}
        />
      )}
    </>
  )
}
