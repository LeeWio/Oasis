import { useCallback, useState } from 'react'
import { BubbleMenu as BaseBubbleMenu, useEditorState } from '@tiptap/react'

import { MenuProps } from '../types'

import { LinkEditorPanel } from '@/components/panels/LinkEditorPanel'
import { LinkPreviewPanel } from '@/components/panels/LinkPreviewpanel'

export const LinkMenu = ({ editor, appendTo }: MenuProps) => {
  const [showEdit, setShowEdit] = useState(false)
  const { link, target } = useEditorState({
    editor,
    selector: ctx => {
      const attrs = ctx.editor.getAttributes('link')

      return { link: attrs.href, target: attrs.target }
    },
  })

  const shouldShow = useCallback(() => {
    return editor.isEditable && editor.isActive('link')
  }, [editor])

  const handleEdit = useCallback(() => {
    setShowEdit(true)
  }, [])

  const onSetLink = useCallback(
    (url: string, openInNewTab?: boolean) => {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url, target: openInNewTab ? '_blank' : '' })
        .run()
      setShowEdit(false)
    },
    [editor],
  )

  const onUnsetLink = useCallback(() => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run()
    setShowEdit(false)

    return null
  }, [editor])

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey="textMenu"
      shouldShow={shouldShow}
      tippyOptions={{
        popperOptions: {
          modifiers: [{ name: 'flip', enabled: false }],
        },
        appendTo: () => {
          return appendTo?.current
        },
        onHidden: () => {
          setShowEdit(false)
        },
      }}
      updateDelay={0}
    >
      {showEdit ? (
        <div className="z-10 px-2.5 py-1 w-full inline-flex gap-0.5 flex-row justify-center items-center bg-content1 rounded-medium shadow-medium">
          <LinkEditorPanel initialOpenInNewTab={target === '_blank'} initialUrl={link} onSetLink={onSetLink} />
        </div>
      ) : (
        <LinkPreviewPanel url={link} onClear={onUnsetLink} onEdit={handleEdit} />
      )}
    </BaseBubbleMenu>
  )
}
