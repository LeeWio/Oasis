import { BubbleMenu as BaseBubbleMenu } from "@tiptap/react";
import { useCallback, useRef } from "react";
import { Instance, sticky } from "tippy.js";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";

import { MenuProps } from "@/components/menus/types";
import { getRenderContainer } from "@/lib/utils";
import { NextProps } from "@/extensions/Callout";

export const AlertMenu = ({ editor, appendTo }: MenuProps) => {
  const shouldShow = useCallback(() => {
    return editor.isEditable && editor.isActive("alert");
  }, [editor]);
  const tippyInstance = useRef<Instance | null>(null);
  const getReferenceClientRect = useCallback(() => {
    const renderContainer = getRenderContainer(editor, "node-alert");

    return (
      renderContainer?.getBoundingClientRect() ||
      new DOMRect(-1000, -1000, 0, 0)
    );
  }, [editor]);

  const setColor = (color: NextProps["color"]) => {
    if (color) {
      editor
        .chain()
        .focus(undefined, { scrollIntoView: false })
        .setAlertColor(color)
        .run();
    }
  };
  const setRadius = (radius: NextProps["radius"]) => {
    if (radius) {
      editor
        .chain()
        .focus(undefined, { scrollIntoView: false })
        .setAlertRadius(radius)
        .run();
    }
  };

  const setVariant = (variant: NextProps["variant"]) => {
    if (variant) {
      editor
        .chain()
        .focus(undefined, { scrollIntoView: false })
        .setAlertVariant(variant)
        .run();
    }
  };

  const setSize = (size: NextProps["size"]) => {
    if (size) {
      editor
        .chain()
        .focus(undefined, { scrollIntoView: false })
        .setAlertSize(size)
        .run();
    }
  };

  return (
    <BaseBubbleMenu
      editor={editor}
      shouldShow={shouldShow}
      tippyOptions={{
        offset: [0, 8],
        popperOptions: {
          modifiers: [{ name: "flip", enabled: false }],
        },
        getReferenceClientRect,
        onCreate: (instance: Instance) => {
          tippyInstance.current = instance;
        },
        appendTo: () => appendTo?.current,
        plugins: [sticky],
        sticky: "popper",
      }}
      updateDelay={10}
    >
      <Dropdown size={"sm"}>
        <DropdownTrigger>
          <Button size={"sm"}>{editor.getAttributes("alert")?.color}</Button>
        </DropdownTrigger>
        <DropdownMenu
          variant={"solid"}
          onAction={(key) => setColor(key as NextProps["color"])}
        >
          <DropdownItem key={"default"}>Default</DropdownItem>
          <DropdownItem key={"primary"}>Primary</DropdownItem>
          <DropdownItem key={"secondary"}>Secondary</DropdownItem>
          <DropdownItem key="success">Success</DropdownItem>
          <DropdownItem key="warning">Warning</DropdownItem>
          <DropdownItem key="danger">Danger</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown>
        <DropdownTrigger>
          <Button size={"sm"}>{editor.getAttributes("alert")?.radius}</Button>
        </DropdownTrigger>
        <DropdownMenu
          variant={"solid"}
          onAction={(key) => setRadius(key as NextProps["radius"])}
        >
          <DropdownItem key={"none"}>None</DropdownItem>
          <DropdownItem key={"sm"}>Sm</DropdownItem>
          <DropdownItem key={"md"}>Md</DropdownItem>
          <DropdownItem key="lg">Lg</DropdownItem>
          <DropdownItem key="full">Full</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown size={"sm"}>
        <DropdownTrigger>
          <Button size={"sm"}>{editor.getAttributes("alert")?.variant}</Button>
        </DropdownTrigger>
        <DropdownMenu
          variant={"solid"}
          onAction={(key) => setVariant(key as NextProps["variant"])}
        >
          <DropdownItem key={"bordered"}>bordered</DropdownItem>
          <DropdownItem key={"flat"}>flat</DropdownItem>
          <DropdownItem key="faded">faded</DropdownItem>
          <DropdownItem key="solid">solid</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </BaseBubbleMenu>
  );
};
