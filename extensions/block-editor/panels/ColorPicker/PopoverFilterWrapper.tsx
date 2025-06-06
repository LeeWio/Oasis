"use client";

import React from "react";
import {
  PopoverContent,
  Popover,
  PopoverTrigger,
  PopoverProps,
} from "@heroui/popover";
import { useDisclosure } from "@heroui/use-disclosure";
import { cn } from "@heroui/theme";

import { MemoButton } from "../../menus/TextMenu";

export type PopoverFilterWrapperProps = Omit<PopoverProps, "children"> & {
  title?: string;
  children: React.ReactNode;
  icon?: string;
  className?: string;
};

const PopoverFilterWrapper = React.forwardRef<
  HTMLDivElement,
  PopoverFilterWrapperProps
>(({ title, children, icon, className, ...props }, ref) => {
  const { isOpen, onOpenChange } = useDisclosure();

  return (
    <Popover
      ref={ref}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      {...props}
      classNames={{
        content: cn("flex flex-col gap-2 items-start", className),
      }}
      radius="md"
    >
      <PopoverTrigger>
        <MemoButton icon={icon} value={title} />
      </PopoverTrigger>
      <PopoverContent>{children}</PopoverContent>
    </Popover>
  );
});

PopoverFilterWrapper.displayName = "PopoverFilterWrapper";

export default PopoverFilterWrapper;
