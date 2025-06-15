import { useEditor } from '@tiptap/react'

import ExtensionKit from '@/extensions/block-editor/extensions/extension-kit'
import { useDraft } from './use-draft'
import { useAppDispatch } from './store'

export const useBlockEditor = () => {
  const draft = useDraft()

  const dispatch = useAppDispatch()

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

    onCreate: (ctx) => {},

    onUpdate: ({ editor }) => {
      const content = editor.getHTML()
    },

    extensions: [...ExtensionKit()],
  })

  return { editor }
}
