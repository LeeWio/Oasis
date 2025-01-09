import "@/styles/index.css";

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

import { ContentItemMenu } from "../menus/ContentItemMenu";

import { CalloutMenu } from "@/extensions/callout/component/callout-menu";
import { useBlockEditor } from "@/hooks/useBlockEditor";

export const BlockEditor = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { editor } = useBlockEditor();

  if (!editor) return null;

  return (
    <>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal
        hideCloseButton
        backdrop="blur"
        isOpen={isOpen}
        radius="sm"
        scrollBehavior="inside"
        size="5xl"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <Button
                onPress={() => editor.chain().focus().toggleCallout().run()}
              >
                click
              </Button>
              <ModalHeader className="flex flex-col gap-1">
                Modal title
              </ModalHeader>
              <ModalBody>
                <ContentItemMenu editor={editor} />
                <CalloutMenu editor={editor} />
                <EditorContent
                  className=" scrollbar-hide overflow-auto"
                  editor={editor}
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
