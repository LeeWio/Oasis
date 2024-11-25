import { HocuspocusProvider } from '@hocuspocus/provider'
import {
  CharacterCount,
  Color,
  Document,
  Dropcursor,
  Emoji,
  NextInput,
  Blockquote,
  Focus,
  FontFamily,
  Highlight,
  Placeholder,
  StarterKit,
  Subscript,
  Superscript,
  TableOfContents,
  TextAlign,
  TextStyle,
  Typography,
  Underline,
  TaskItem,
  TaskList,
  Columns,
  Column,
} from '.'

interface ExtensionKitProps {
  provider?: HocuspocusProvider | null
}

export const ExtensionKit = ({ provider }: ExtensionKitProps) => [
  Document,
  NextInput,
  Column,
  Color,
  Blockquote,
  Focus,
  Columns,
  TableOfContents,
  FontFamily,
  Subscript,
  TextStyle,
  Typography,
  Superscript,
  Underline,
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  Placeholder.configure({
    includeChildren: true,
    showOnlyCurrent: false,
    placeholder: () => '',
  }),
  TextAlign.extend({
    addKeyboardShortcuts() {
      return {}
    },
  }).configure({
    types: ['heading', 'paragraph'],
  }),
  Highlight.configure({ multicolor: true }),
  CharacterCount.configure({ limit: 50000 }),
  StarterKit.configure({
    document: false,
    dropcursor: false,
    heading: false,
    horizontalRule: false,
    blockquote: false,
    history: false,
    codeBlock: false,
  }),

  Dropcursor.configure({
    width: 2,
    class: 'ProseMirror-dropcursor border-black',
  }),
]

export default ExtensionKit