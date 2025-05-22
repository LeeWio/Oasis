'use client'

import { EditorContent, useEditorState } from '@tiptap/react'
import { useRef } from 'react'
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Modal,
  ModalContent,
  useDisclosure,
} from '@heroui/modal'
import '@/extensions/block-editor/styles/index.css'
import 'katex/dist/katex.min.css'
import { Button } from '@heroui/button'

import { useBlockEditor } from '@/extensions/block-editor/hooks/use-block-editor'
import { ColumnsMenu } from '@/extensions/block-editor/extensions/MultiColumn/menus'
import { ContentItemMenu } from '@/extensions/block-editor/menus/ContentItemMenu'
import { TextMenu } from '@/extensions/block-editor/menus/TextMenu'

type BlockEditorProps = {}
export const BlockEditor = ({}: BlockEditorProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const menuContainerRef = useRef<HTMLDivElement>(null)

  const { editor } = useBlockEditor()

  const { characters, words } = useEditorState({
    editor,
    selector: (ctx): { characters: number; words: number } => {
      const { characters, words } = ctx.editor?.storage.characterCount || {
        characters: () => 0,
        words: () => 0,
      }
      return { characters: characters(), words: words() }
    },
  })

  if (!editor) {
    return null
  }

  return (
    <>
      <Button onPress={onOpen}>open modal</Button>
      <Modal
        backdrop="blur"
        hideCloseButton
        isOpen={isOpen}
        ref={menuContainerRef}
        scrollBehavior="inside"
        size="5xl"
        onOpenChange={onOpenChange}
        classNames={{
          body: 'scrollbar-hide',
        }}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <EditorContent editor={editor} />
                <ColumnsMenu editor={editor} />
                <TextMenu editor={editor} />
                <ContentItemMenu editor={editor} isEditable={editor.isEditable} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose} tabIndex={-1}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose} tabIndex={-1}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
