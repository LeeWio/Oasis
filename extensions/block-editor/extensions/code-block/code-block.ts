import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight'
import { ReactNodeViewRenderer, mergeAttributes } from '@tiptap/react'
import { CodeBlockComponent } from './view/CodeBlockComponent'
import { all, createLowlight } from 'lowlight'

const lowlight = createLowlight(all)

export type NextProps = {
  color: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  variant: 'flat' | 'faded' | 'bordered' | 'underlined' | 'solid'
  size: 'sm' | 'md' | 'lg'
  radius: 'none' | 'sm' | 'md' | 'lg'
}

declare module '@tiptap/react' {
  interface Commands<ReturnType> {
    CodeBlock: {
      setCodeBlockColor: (color: NextProps['color']) => ReturnType
      setCodeBlockRadius: (radius: NextProps['radius']) => ReturnType
      setCodeBlockVariant: (variant: NextProps['variant']) => ReturnType
      setCodeBlockSize: (size: NextProps['size']) => ReturnType
    }
  }
}

export const CodeBlock = CodeBlockLowlight.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      color: {
        default: 'default',
        parseHTML: (element) => element.getAttribute('data-color'),
        renderHTML: (attributes) => ({ 'data-color': attributes.color }),
      },
      size: {
        default: 'lg',
        parseHTML: (element) => element.getAttribute('data-size'),
        renderHTML: (arrtibutes) => ({ 'data-size': arrtibutes.size }),
      },
      radius: {
        default: 'md',
        parseHTML: (element) => element.getAttribute('data-radius'),
        renderHTML: (arrtibutes) => ({ 'data-radius': arrtibutes.radius }),
      },
      variant: {
        default: 'solid',
        parseHTML: (element) => element.getAttribute('data-variant'),
        renderHTML: (arrtibutes) => ({ 'data-variant': arrtibutes.variant }),
      },
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockComponent)
  },

  addCommands() {
    return {
      setCodeBlockColor:
        (color: NextProps['color']) =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { color })
        },
      setCodeBlockRadius:
        (radius: NextProps['radius']) =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { radius })
        },
      setCodeBlockSize:
        (size: NextProps['size']) =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { size })
        },
      setCodeBlockVariant:
        (variant: NextProps['variant']) =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { variant })
        },
    }
  },
}).configure({ lowlight })
