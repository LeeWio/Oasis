import "@/styles/index.css";

import { useBlockEditor } from "@/hooks/useBlockEditor";
import { EditorContent } from "@tiptap/react";

import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ModalHeader,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

export const BlockEditor = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { editor } = useBlockEditor();

  if (!editor) return null;

  return (
    <>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal
        radius="sm"
        scrollBehavior="inside"
        backdrop="blur"
        hideCloseButton
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal title
              </ModalHeader>
              <ModalBody>
                <EditorContent
                  editor={editor}
                  className="min-h-dvh scrollbar-hide overflow-auto"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
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
