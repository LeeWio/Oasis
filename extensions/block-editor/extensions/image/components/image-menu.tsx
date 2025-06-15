import { useCallback, useRef } from 'react'
import { useEditorState } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import { Divider } from '@heroui/divider'

import { ImageWidth } from './image-width'

import { MenuProps } from '@/extensions/block-editor/menus/types'
import { MemoButton } from '@/extensions/block-editor/menus/text-menu'

export const ImageMenu = ({ editor }: MenuProps) => {
  const menuRef = useRef(null)

  const shouldShow = useCallback(() => {
    return editor.isActive('image')
  }, [editor])

  const onAlignImageLeft = useCallback(() => {
    editor
      .chain()
      .focus(undefined, { scrollIntoView: false })
      .setImageAlign('left')
      .run()
  }, [editor])

  const onAlignImageCenter = useCallback(() => {
    editor
      .chain()
      .focus(undefined, { scrollIntoView: false })
      .setImageAlign('center')
      .run()
  }, [editor])

  const onAlignImageRight = useCallback(() => {
    editor
      .chain()
      .focus(undefined, { scrollIntoView: false })
      .setImageAlign('right')
      .run()
  }, [editor])

  const onWidthChange = useCallback(
    (value: number) => {
      editor
        .chain()
        .focus(undefined, { scrollIntoView: false })
        .setImageWidth(value)
        .run()
    },
    [editor]
  )

  const { isImageCenter, isImageLeft, isImageRight, width } = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isImageLeft: ctx.editor.isActive('image', { align: 'left' }),
        isImageCenter: ctx.editor.isActive('image', { align: 'center' }),
        isImageRight: ctx.editor.isActive('image', { align: 'right' }),
        width: parseInt(ctx.editor.getAttributes('image')?.width || 0),
      }
    },
  })

  return (
    <BubbleMenu ref={menuRef} editor={editor} shouldShow={shouldShow}>
      <div
        aria-label="image layout options"
        className="z-10 inline-flex w-full flex-row items-center justify-center gap-1 rounded-md bg-content1 px-1.5 py-1 shadow-medium"
      >
        <MemoButton
          icon="lucide:align-horizontal-distribute-start"
          isSelected={isImageLeft}
          value="Align image left"
          onPress={onAlignImageLeft}
        />
        <MemoButton
          icon="lucide:align-horizontal-distribute-center"
          isSelected={isImageCenter}
          value="Align image center"
          onPress={onAlignImageCenter}
        />

        <MemoButton
          icon="lucide:align-horizontal-distribute-end"
          isSelected={isImageRight}
          value="Align image right"
          onPress={onAlignImageRight}
        />

        <Divider className="mx-1 h-6" orientation="vertical" />

        <ImageWidth value={width} onChange={onWidthChange} />
      </div>
    </BubbleMenu>
  )
}
