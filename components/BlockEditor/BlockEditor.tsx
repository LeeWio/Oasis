import { useSidebar } from '@/hooks/useSidebar'
import { TiptapCollabProvider } from '@hocuspocus/provider'
import React, { useRef } from 'react'
import * as Y from 'yjs'
import { useBlockEditor } from '@/hooks/useBlockEditor'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal'
import { EditorContent } from '@tiptap/react'
import { Button } from '@nextui-org/react'
import { NextInputMenu } from '@/extentions/NextInput/componet/NextInputMenu'
import '@/styles/index.css'
import { ContentItemMenu } from '@/components/menus/ContentItemMenu'

interface EditArticleProps {
  aiToken?: string
  ydoc: Y.Doc
  provider?: TiptapCollabProvider | null | undefined
  isOpen: boolean
  onOpenChange: () => void
  hasCollab?: boolean
  room?: string
}

export const BlockEditor: React.FC<EditArticleProps> = ({
                                                          aiToken,
                                                          ydoc,
                                                          provider,
                                                          isOpen,
                                                          onOpenChange,
                                                        }) => {
  const menuContainerRef = useRef(null)

  const leftSidebar = useSidebar()

  const { editor, users, collabState } = useBlockEditor({ aiToken, ydoc, provider })

  if (!editor || !users) {
    return null
  }
  return (
    <Modal
      ref={menuContainerRef}
      hideCloseButton
      classNames={{
        body: '',
        base: '',
        header: '',
        footer: '',
      }}
      isOpen={isOpen}
      scrollBehavior={'inside'}
      size={'5xl'}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1 ">
              {/*<EditorHeader*/}
              {/*  collabState={collabState}*/}
              {/*  editor={editor}*/}
              {/*  isSidebarOpen={leftSidebar.isOpen}*/}
              {/*  toggleSidebar={leftSidebar.toggle}*/}
              {/*  users={users}*/}
              {/*/>*/}
            </ModalHeader>
            <ModalBody>
              <Button onPress={() => editor.chain().focus().setNextInput().run()}>adf</Button>
              <EditorContent
                className=" overflow-y-auto scrollbar-hide min-h-96"
                editor={editor}
              />
              <NextInputMenu editor={editor}/>
              <ContentItemMenu editor={editor} />
            </ModalBody>
            <ModalFooter>
              {/*<EditorFooter collabState={collabState} editor={editor} users={users} />*/}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
export default BlockEditor