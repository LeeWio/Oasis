"use client";

import { BlockEditor } from "@/components/BlockEditor";
import { FileUpload } from "@/components/FileUpload";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
export default function AboutPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen}>open block-editor</Button>
      <BlockEditor isModalOpen={isOpen} onModalOpenChange={onOpenChange} />
      <FileUpload onUpload={() => {}} />
    </>
  );
}
