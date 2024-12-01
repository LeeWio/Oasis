import React, { useRef } from "react";

// import { LinkMenu } from '@/components/menus'
import "@/styles/index.css";

// import { Sidebar } from '@/components/Sidebar'
// import ImageBlockMenu from '@/extensions/ImageBlock/components/ImageBlockMenu'
// import { TextMenuItem } from '@/extensions/MultiColumn/menus'
// import { TableColumnMenu, TableRowMenu } from '@/extensions/Table/menus'
// import { EditorHeader } from './components/EditorHeader'
// import { TextMenu } from '../menus/TextMenu'
// import { ContentItemMenu.tsx } from '../menus/ContentItemMenu.tsx'
// import { useSidebar } from '@/hooks/useSidebar'
import * as Y from "yjs";
import { TiptapCollabProvider, WebSocketStatus } from "@hocuspocus/provider";
import { Modal, ModalBody, ModalContent, ModalFooter } from "@nextui-org/modal";
import { EditorContent, useEditorState } from "@tiptap/react";
import { Avatar, AvatarGroup } from "@nextui-org/avatar";
import { Tooltip } from "@nextui-org/tooltip";

import { useBlockEditor } from "@/hooks/useBlockEditor";
import ImageBlockMenu from "@/extensions/ImageBlock/components/ImageBlockMenu";
import { TableColumnMenu, TableRowMenu } from "@/extensions/Table/menus";
import { ColumnsMenu } from "@/extensions/MultiColumn/menus";
import { TextMenu } from "@/components/menus/TextMenu";
import { LinkMenu } from "@/components/menus/LinkMenu";
import { ContentItemMenu } from "@/components/menus/ContentItemMenu";
import { EditorUser } from "@/components/BlockEditor/types";
import { useAuth } from "@/hooks/useAuth";
import { getCollabStateColor } from "@/lib/utils";

export const BlockEditor = ({
  aiToken,
  ydoc,
  provider,
  isOpen,
  onOpenChange,
}: {
  aiToken?: string;
  ydoc: Y.Doc | null;
  provider?: TiptapCollabProvider | null | undefined;
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  const menuContainerRef = useRef(null);

  // get current user
  const currentUser = useAuth();

  // const leftSidebar = useSidebar()
  const { editor, users, collabState } = useBlockEditor({
    aiToken,
    ydoc,
    provider,
    userId: currentUser?.uid,
    userName: currentUser?.username,
  });

  const { characters, words } = useEditorState({
    editor,
    selector: (ctx): { characters: number; words: number } => {
      const { characters, words } = ctx.editor?.storage.characterCount || {
        characters: () => 0,
        words: () => 0,
      };

      return { characters: characters(), words: words() };
    },
  });

  if (!editor || !users) {
    return null;
  }

  return (
    <Modal
      ref={menuContainerRef}
      hideCloseButton
      backdrop={"blur"}
      classNames={{
        footer: "flex justify-between items-center",
      }}
      isOpen={isOpen}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
      scrollBehavior={"inside"}
      size={"5xl"}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {() => (
          <>
            <ModalBody>
              <EditorContent
                className="flex-1 overflow-y-auto scrollbar-hide min-h-96"
                editor={editor}
              />
              <ContentItemMenu editor={editor} />
              <LinkMenu appendTo={menuContainerRef} editor={editor} />
              <TextMenu editor={editor} />
              <ColumnsMenu appendTo={menuContainerRef} editor={editor} />
              <TableRowMenu appendTo={menuContainerRef} editor={editor} />
              <TableColumnMenu appendTo={menuContainerRef} editor={editor} />
              <ImageBlockMenu appendTo={menuContainerRef} editor={editor} />
            </ModalBody>
            <ModalFooter>
              <div className="flex flex-col justify-center pr-4 mr-4 text-right dark:border-neutral-800">
                <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                  {words} {words === 1 ? "word" : "words"}
                </div>
                <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                  {characters} {characters === 1 ? "character" : "characters"}
                </div>
              </div>
              <AvatarGroup isBordered max={5} size="sm" total={users.length}>
                {users.slice(0, 3).map((user: EditorUser) => (
                  <Tooltip
                    key={user.clientId}
                    closeDelay={0}
                    content={user.name}
                    delay={0}
                    motionProps={{
                      variants: {
                        exit: {
                          opacity: 0,
                          transition: {
                            duration: 0.1,
                            ease: "easeIn",
                          },
                        },
                        enter: {
                          opacity: 1,
                          transition: {
                            duration: 0.15,
                            ease: "easeOut",
                          },
                        },
                      },
                    }}
                  >
                    <Avatar
                      isBordered
                      color={
                        collabState === WebSocketStatus.Connecting ||
                        collabState === WebSocketStatus.Disconnected
                          ? getCollabStateColor(collabState)
                          : user.color
                      }
                      src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                    />
                  </Tooltip>
                ))}
              </AvatarGroup>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
    // {/*<Sidebar isOpen={leftSidebar.isOpen} onClose={leftSidebar.close} editor={editor} />*/}
    //   {/*<EditorHeader*/}
    //   {/*  editor={editor}*/}
    //   {/*  collabState={collabState}*/}
    //   {/*  users={users}*/}
    //   {/*  isSidebarOpen={leftSidebar.isOpen}*/}
    //   {/*  toggleSidebar={leftSidebar.toggle}*/}
    //   {/*/>*/}
  );
};

export default BlockEditor;
