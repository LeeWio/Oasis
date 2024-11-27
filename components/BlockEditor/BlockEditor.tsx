import { EditorContent } from '@tiptap/react'
import React, { useRef } from 'react'

// import { LinkMenu } from '@/components/menus'

import '@/styles/index.css'

// import { Sidebar } from '@/components/Sidebar'
// import ImageBlockMenu from '@/extensions/ImageBlock/components/ImageBlockMenu'
// import { TextMenuItem } from '@/extensions/MultiColumn/menus'
// import { TableColumnMenu, TableRowMenu } from '@/extensions/Table/menus'
// import { EditorHeader } from './components/EditorHeader'
// import { TextMenu } from '../menus/TextMenu'
// import { ContentItemMenu.tsx } from '../menus/ContentItemMenu.tsx'
// import { useSidebar } from '@/hooks/useSidebar'
import * as Y from 'yjs'
import { TiptapCollabProvider } from '@hocuspocus/provider'
import { Button } from '@nextui-org/button'

import { LinkMenu } from '../menus/LinkMenu'
import { ContentItemMenu } from '../menus/ContentItemMenu'

import { TextMenu } from '@/components/menus/TextMenu/TextMenu'
import { ColumnsMenu } from '@/extensions/MultiColumn/menus'
import { useBlockEditor } from '@/hooks/useBlockEditor'
import { TableColumnMenu, TableRowMenu } from '@/extensions/Table/menus'

export const BlockEditor = ({
  aiToken,
  ydoc,
  provider,
}: {
  aiToken?: string
  ydoc: Y.Doc | null
  provider?: TiptapCollabProvider | null | undefined
}) => {
  const menuContainerRef = useRef(null)

  // const leftSidebar = useSidebar()
  const { editor, users, collabState } = useBlockEditor({ aiToken, ydoc, provider })

  if (!editor || !users) {
    return null
  }

  return (
    <div ref={menuContainerRef} className="flex h-full">
      <Button
        onPress={() =>
          editor
            .chain()
            .focus()
            .setColumns()
            .focus(editor.state.selection.head - 1)
            .run()
        }
      >
        setColumns
      </Button>
      {/*<Sidebar isOpen={leftSidebar.isOpen} onClose={leftSidebar.close} editor={editor} />*/}
      <div className="relative flex flex-col flex-1 h-full overflow-hidden">
        {/*<EditorHeader*/}
        {/*  editor={editor}*/}
        {/*  collabState={collabState}*/}
        {/*  users={users}*/}
        {/*  isSidebarOpen={leftSidebar.isOpen}*/}
        {/*  toggleSidebar={leftSidebar.toggle}*/}
        {/*/>*/}
        <EditorContent className="flex-1 overflow-y-auto" editor={editor} />
        <ContentItemMenu editor={editor} />
        <LinkMenu appendTo={menuContainerRef} editor={editor} />
        <TextMenu editor={editor} />
        <ColumnsMenu appendTo={menuContainerRef} editor={editor} />
        <TableRowMenu appendTo={menuContainerRef} editor={editor} />
        <TableColumnMenu appendTo={menuContainerRef} editor={editor} />
        {/*<ImageBlockMenu editor={editor} appendTo={menuContainerRef} />*/}
      </div>
    </div>
  )
}

export default BlockEditor
