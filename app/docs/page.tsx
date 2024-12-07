"use client";

import React from "react";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/use-disclosure";

import Room from "@/app/[room]/page";
import { useAuth } from "@/hooks/useAuth";

export default function DocsPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const currentUser = useAuth();

  return (
    <>
      <Button onPress={onOpen}>Open Modal</Button>
      <Room
        params={{
          room: "some-room-id",
          isOpen: isOpen,
          onOpenChange: onOpenChange,
        }}
      />
    </>
  );
}
