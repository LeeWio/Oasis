"use client";

import { EditorContent } from "@tiptap/react";
import { useRef } from "react";
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Modal,
  ModalContent,
  useDisclosure,
} from "@heroui/modal";

import "@/extensions/block-editor/styles/index.css";
import { useBlockEditor } from "@/extensions/block-editor/hooks/use-block-editor";
import { Button } from "@heroui/button";
import { ColumnsMenu } from "@/extensions/block-editor/extensions/MultiColumn/menus";

type BlockEditorProps = {};
export const BlockEditor = ({}: BlockEditorProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const menuContainerRef = useRef<HTMLDivElement>(null);

  const { editor } = useBlockEditor();

  if (!editor) {
    return null;
  }

  return (
    <>
      <Button onPress={onOpen}>open modal</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        hideCloseButton
        size="5xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <Button
                  onPress={() =>
                    editor
                      .chain()
                      .focus()
                      .insertTable({ rows: 3, cols: 3, withHeaderRow: false })
                      .run()
                  }
                >
                  insert table
                </Button>
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
                  insert columnns
                </Button>
              </ModalHeader>
              <ModalBody>
                <EditorContent editor={editor} />
                <ColumnsMenu editor={editor} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light">
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
