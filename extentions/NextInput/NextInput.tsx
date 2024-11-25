import {mergeAttributes, ReactNodeViewRenderer} from '@tiptap/react'
import {Node} from '@tiptap/react'
import {NextInputView} from './componet/NextInputView'

declare module '@tiptap/react' {
    interface Commands<ReturnType> {
        NextInput: {
            /**
             * Set a NextUI Input
             */
            setNextInput: () => ReturnType,
        }
    }
}

export const NextInput = Node.create({

    name: 'nextInput',
    // Node group, specifying that it belongs to block elements
    group: 'block',

    // Defines the content the node can have. `inline*` allows inline content.
    content: 'inline*',

    // Makes the node draggable in the editor
    draggable: true,

    atom: true,
    parseHTML() {
        return [
            {
                tag: 'nextInput',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['nextInput', mergeAttributes(HTMLAttributes), 0]
    },

    addNodeView(){
        return ReactNodeViewRenderer(NextInputView)
    },

    addCommands(){
        return {
            setNextInput: () => {
                return ({commands}) => {
                    return commands.setNode(this.name)
                };
            }
        }
    }
})