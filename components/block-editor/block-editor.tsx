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
import { CircularProgress } from '@heroui/progress'

import { useBlockEditor } from '@/extensions/block-editor/hooks/use-block-editor'
import { ColumnsMenu } from '@/extensions/block-editor/extensions/MultiColumn/menus'
import { ContentItemMenu } from '@/extensions/block-editor/menus/ContentItemMenu'
import { TextMenu } from '@/extensions/block-editor/menus/TextMenu'
import { LinkMenu } from '@/extensions/block-editor/menus/LinkMenu'
import { ImageMenu } from '@/extensions/block-editor/extensions/Image/components/ImageMenu'

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
      <Button aria-label="block-editor button" onPress={onOpen}>
        open modal
      </Button>
      <Modal
        ref={menuContainerRef}
        hideCloseButton
        aria-label="block-editor label"
        backdrop="blur"
        isOpen={isOpen}
        scrollBehavior="inside"
        size="5xl"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <Button
                  aria-label="block-editor button"
                  onPress={() => editor.chain().focus().insertTableOfContents().run()}
                >
                  insert table-of-contents
                </Button>
              </ModalHeader>
              <ModalBody>
                <EditorContent
                  className="min-h-dvh overflow-y-auto scrollbar-hide"
                  editor={editor}
                />
                <ColumnsMenu editor={editor} />
                <TextMenu editor={editor} />
                <ContentItemMenu editor={editor} isEditable={editor.isEditable} />
                <LinkMenu editor={editor} />
                <ImageMenu editor={editor} />
              </ModalBody>
              <ModalFooter>
                <CircularProgress
                  showValueLabel
                  aria-label="block-editor button"
                  maxValue={500}
                  value={200}
                />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
