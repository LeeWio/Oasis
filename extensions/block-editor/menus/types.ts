import { Editor } from '@tiptap/react'
import { EditorView } from '@tiptap/pm/view'
import { EditorState } from '@tiptap/pm/state'
import { Editor as CoreEditor } from '@tiptap/core'

export interface MenuProps {
  editor: Editor
  isEditable?: boolean
}

export interface ShouldShowProps {
  editor?: CoreEditor
  view: EditorView
  state?: EditorState
  oldState?: EditorState
  from?: number
  to?: number
}
