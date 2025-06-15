import { FileUpload } from '@/components/file-upload'
import { NodeViewProps, NodeViewWrapper } from '@tiptap/react'
import { useCallback } from 'react'

export const ImageUpload = ({ getPos, editor }: NodeViewProps) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''

  const onUpload = useCallback(
    (url: string[]) => {
      const pos = getPos()
      if (typeof pos === 'number' && url[0]) {
        const fullUrl = `${apiUrl}${url[0]}`

        editor
          .chain()
          .setImage({ src: fullUrl })
          .deleteRange({ from: pos, to: pos })
          .focus()
          .run()
      }
    },
    [getPos, editor]
  )

  return (
    <NodeViewWrapper>
      <div className="p-0 m-0" data-drag-handle>
        <FileUpload onUpload={onUpload} />
      </div>
    </NodeViewWrapper>
  )
}

export default ImageUpload
