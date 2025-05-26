import { Image } from '@heroui/image'
import { cn } from '@heroui/theme'
import { NodeViewRendererProps, NodeViewWrapper } from '@tiptap/react'
import { useCallback, useRef } from 'react'

export const ImageBlockView = (props: NodeViewRendererProps) => {
  const { editor, getPos, node } = props
  const imageWrapperRef = useRef(null)
  const { src } = node.attrs

  const wrapperClassName = cn(
    node.attrs.align === 'left' ? 'ml-0' : 'ml-auto',
    node.attrs.align === 'right' ? 'mr-0' : 'mr-auto',
    node.attrs.align === 'center' && 'mx-auto',
  )

  const onClick = useCallback(() => {
    const pos = getPos()

    if (pos !== undefined) {
      editor.commands.setNodeSelection(pos)
    }
  }, [getPos, editor.commands])

  return (
    <NodeViewWrapper>
      <div
        ref={imageWrapperRef}
        className={wrapperClassName}
        contentEditable={false}
        style={{ width: node.attrs.width }}
      >
        <Image
          isBlurred
          removeWrapper
          alt="NextUI Album Cover"
          loading={'lazy'}
          shadow={'md'}
          src={src}
          onClick={onClick}
        />
      </div>
    </NodeViewWrapper>
  )
}

export default ImageBlockView
