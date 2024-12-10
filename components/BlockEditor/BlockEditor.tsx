import React, { useRef, useState } from "react";

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
import { Button } from "@nextui-org/button";
import { Icon } from "@iconify/react";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { Divider } from "@nextui-org/divider";
import { Avatar, AvatarGroup } from "@nextui-org/avatar";
import { Tooltip } from "@nextui-org/tooltip";
import { cn } from "@nextui-org/theme";

import { EditorUser } from "./types";

import { useBlockEditor } from "@/hooks/useBlockEditor";
import ImageBlockMenu from "@/extensions/ImageBlock/components/ImageBlockMenu";
import { TableColumnMenu, TableRowMenu } from "@/extensions/Table/menus";
import { ColumnsMenu } from "@/extensions/MultiColumn/menus";
import { TextMenu } from "@/components/menus/TextMenu";
import { LinkMenu } from "@/components/menus/LinkMenu";
import { ContentItemMenu } from "@/components/menus/ContentItemMenu";
import { useAuth } from "@/hooks/useAuth";
import { getCollabStateColor } from "@/lib/utils";

export const BlockEditor = ({
  aiToken,
  ydoc,
  provider,
  isModalOpen,
  onOpenChange,
}: {
  aiToken?: string;
  ydoc: Y.Doc | null;
  provider?: TiptapCollabProvider | null | undefined;
  isModalOpen: boolean;
  onOpenChange: () => void;
}) => {
  const menuContainerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

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
  const content = isOpen ? (
    <div className="h-full w-full items-start justify-center overflow-scroll px-4">
      <div className="flex flex-col gap-2">
        <Input
          autoFocus
          fullWidth
          aria-label="Affiliate code"
          classNames={{
            inputWrapper: "group-data-[focus-visible=true]:outline-foreground",
          }}
          label="Enter affiliate code"
          labelPlacement="outside"
          placeholder="E.g. ACME123"
        />
        <Button className="mt-1">Submit</Button>
      </div>
      <Divider className="mb-8 mt-10" />
      <ul className="flex flex-col gap-1">
        <li>
          <Link className="text-default-400" href="#" size="sm">
            Where do I find my affiliate code?
          </Link>
        </li>
        <li>
          <Link className="text-default-400" href="#" size="sm">
            How do I become an affiliate?
          </Link>
        </li>
        <li>
          <Link className="text-default-400" href="#" size="sm">
            What are the benefits of being an affiliate?
          </Link>
        </li>
        <li>
          <Link className="text-default-400" href="#" size="sm">
            Contact Acme Support
          </Link>
        </li>
      </ul>
    </div>
  ) : (
    <>
      <div className="flex flex-col justify-center pr-4 mr-4 text-right dark:border-neutral-800">
        <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
          {words} {words === 1 ? "word" : "words"}
        </div>
        <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 ">
          {characters} {characters === 1 ? "character" : "characters"}
        </div>
      </div>
      <AvatarGroup isBordered max={5} size="sm" total={users.length}>
        {users.slice(0, 3).map((user: EditorUser) => (
          <Tooltip
            key={user.clientId}
            classNames={{
              content: "text-nowrap",
            }}
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
              key={user.clientId}
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
    </>
  );

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
      isOpen={isModalOpen}
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
      radius={"sm"}
      scrollBehavior={"inside"}
      size={"5xl"}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {() => (
          <>
            <ModalBody className={"scrollbar-hide"}>
              <Button
                className="absolute right-2 top-2 z-10 opacity-0"
                isIconOnly={isOpen}
                radius="full"
                size="sm"
                onPress={() => setIsOpen((prev) => !prev)}
              >
                {isOpen ? <Icon fontSize={20} icon="ci:close-sm" /> : "Apply"}
              </Button>
              <EditorContent
                className="overflow-y-auto scrollbar-hide min-h-dvh"
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
            <ModalFooter
              className={cn(
                "absolute w-full bottom-0 h-16 overflow-visible bg-content1 duration-300 ease-in-out transition-height rounded-md",
                {
                  "h-full": isOpen,
                },
              )}
            >
              {content}
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
