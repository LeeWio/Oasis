import { useMemo } from 'react'

import { useEditor } from '@tiptap/react'
import ExtensionKit from '@/extensions/block-editor/extensions/extension-kit'
import { useDraft } from './use-draft'
import { useAppDispatch } from './store'
import { updateDraft } from '@/feature/article/article-slice'
import { createDebouncedFunction } from '@/utils/createDebouncedFunction'

export const useBlockEditor = () => {
  const draft = useDraft()

  const dispatch = useAppDispatch()

  const debouncedUpdate = useMemo(
    () =>
      createDebouncedFunction((content: string) => {
        dispatch(updateDraft({ content }))
      }, 500),
    [dispatch]
  )

  const editor = useEditor({
    // place the cursor in the editor after initialization
    autofocus: true,
    // make the text editable(default is true)
    editable: true,
    /**
     * This option gives us the control to enable the default behavior of rendering the editor immediately.
     */
    immediatelyRender: false,
    /**
     * This option gives us the control to disable the default behavior of re-rendering the editor on every transaction.
     */
    shouldRerenderOnTransaction: false,
    // prevent loading the default css(which isn't much anyway)
    injectCSS: true,

    onCreate: (ctx) => {
      queueMicrotask(() => {
        if (!ctx.editor.isDestroyed) {
          ctx.editor.commands.setContent(draft?.content || '')
        }
      })
    },

    onUpdate: ({ editor }) => {
      const content = editor.getHTML()
      debouncedUpdate(content)
    },

    extensions: [...ExtensionKit()],
  })

  return { editor }
}
