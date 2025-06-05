import { EditorContent, useEditorState } from "@tiptap/react";
import { useRef, useState } from "react";
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Modal,
  ModalContent,
} from "@heroui/modal";
import "@/extensions/block-editor/styles/index.css";
import "katex/dist/katex.min.css";

import { useBlockEditor } from "@/extensions/block-editor/hooks/use-block-editor";
import { ColumnsMenu } from "@/extensions/block-editor/extensions/MultiColumn/menus";
import { ContentItemMenu } from "@/extensions/block-editor/menus/ContentItemMenu";
import { TextMenu } from "@/extensions/block-editor/menus/TextMenu";
import { LinkMenu } from "@/extensions/block-editor/menus/LinkMenu";
import { ImageMenu } from "@/extensions/block-editor/extensions/Image/components/ImageMenu";
import { EditorFooter } from "./EditroFooter";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import { cn } from "@heroui/theme";

type BlockEditorProps = {
  isModalOpen: boolean;
  onModalOpenChange: () => void;
};

export const BlockEditor = ({
  isModalOpen,
  onModalOpenChange,
}: BlockEditorProps) => {
  const menuContainerRef = useRef<HTMLDivElement>(null);

  const { editor } = useBlockEditor();

  const [isOpen, setIsOpen] = useState(false);

  // BUG: 正常应该直接解构，等待 tiptap 修改该 bug
  const state = useEditorState({
    editor,
    selector: (ctx): { characters: number; words: number } => {
      const { characters, words } = ctx.editor?.storage.characterCount || {
        characters: () => 0,
        words: () => 0,
      };

      return { characters: characters(), words: words() };
    },
  });

  const { characters, words } = state ?? { characters: 0, words: 0 };

  if (!editor) {
    return null;
  }

  return (
    <>
      <Modal
        ref={menuContainerRef}
        hideCloseButton
        aria-label="block-editor label"
        backdrop="blur"
        isOpen={isModalOpen}
        tabIndex={-1}
        scrollBehavior="inside"
        radius="sm"
        size="5xl"
        onOpenChange={onModalOpenChange}
        classNames={{
          body: "scrollbar-hide py-0",
          footer: cn(
            "absolute w-full bottom-0 h-14 overflow-visible rounded-lg bg-content1 duration-300 ease-in-out transition-height",
            {
              "h-full": isOpen,
            },
          ),
        }}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <Button
                  isIconOnly={isOpen}
                  size="sm"
                  className="absolute right-2 top-2 z-10 opacity-0"
                  radius="full"
                  onPress={() => setIsOpen((pre) => !pre)}
                >
                  {isOpen ? (
                    <Icon fontSize={20} icon={"ci:close-sm"} />
                  ) : (
                    "Apply"
                  )}
                </Button>
              </ModalHeader>
              <ModalBody>
                <EditorContent
                  className="min-h-dvh overflow-y-auto scrollbar-hide"
                  editor={editor}
                />
                <ColumnsMenu editor={editor} />
                <TextMenu editor={editor} />
                <ContentItemMenu
                  editor={editor}
                  isEditable={editor.isEditable}
                />
                <LinkMenu editor={editor} />
                <ImageMenu editor={editor} />
              </ModalBody>
              <ModalFooter>
                <EditorFooter
                  characters={characters}
                  words={words}
                  isOpen={isOpen}
                />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
