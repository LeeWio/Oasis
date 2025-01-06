import { BubbleMenu as BaseBubbleMenu } from "@tiptap/react";
import { MenuProps } from "@/components/menus/type";
import { useCallback, useEffect, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { CalloutVariantProps } from "@/core/theme/src";

export const CalloutMenu = ({ editor }: MenuProps) => {
  const [attributes, setAttributes] = useState(
    editor.getAttributes("callout") || {},
  );
  useEffect(() => {
    const updateAttributes = () => {
      setAttributes(editor.getAttributes("callout") || {});
    };

    editor.on("transaction", updateAttributes);

    return () => {
      editor.off("transaction", updateAttributes);
    };
  }, [editor]);

  const shouldShow = useCallback(() => {
    return editor.isEditable && editor.isActive("callout");
  }, [editor]);

  const setColor = (color: CalloutVariantProps["color"]) => {
    if (color) {
      editor.chain().focus().setCalloutColor(color).run();
    }
  };

  const setRadius = (radius: CalloutVariantProps["radius"]) => {
    if (radius) {
      editor.chain().focus().setCalloutRadius(radius).run();
    }
  };
  const setSize = (size: CalloutVariantProps["size"]) => {
    if (size) {
      editor.chain().focus().setCalloutSize(size).run();
    }
  };
  const setVariant = (variant: CalloutVariantProps["variant"]) => {
    if (variant) {
      editor.chain().focus().setCalloutVariant(variant).run();
    }
  };

  return (
    <BaseBubbleMenu editor={editor} shouldShow={shouldShow}>
      <Dropdown size="sm">
        <DropdownTrigger>
          <Button
            size={attributes.size}
            variant={attributes.variant}
            color={attributes.color}
          >
            {attributes.color}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          variant="solid"
          onAction={(key) => setColor(key as CalloutVariantProps["color"])}
        >
          <DropdownItem key={"default"}>default</DropdownItem>
          <DropdownItem key={"primary"}>primary</DropdownItem>
          <DropdownItem key={"secondary"}>secondary</DropdownItem>
          <DropdownItem key={"success"}>success</DropdownItem>
          <DropdownItem key={"warning"}>warning</DropdownItem>
          <DropdownItem key={"danger"}>danger</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown size="sm">
        <DropdownTrigger>
          <Button
            size={attributes.size}
            variant={attributes.variant}
            color={attributes.color}
          >
            {attributes.size}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          variant="solid"
          onAction={(key) => setSize(key as CalloutVariantProps["size"])}
        >
          <DropdownItem key={"sm"}>sm</DropdownItem>
          <DropdownItem key={"md"}>md</DropdownItem>
          <DropdownItem key={"lg"}>lg</DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Dropdown size="sm">
        <DropdownTrigger>
          <Button
            size={attributes.size}
            variant={attributes.variant}
            color={attributes.color}
          >
            {attributes.variant}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          variant="solid"
          onAction={(key) => setVariant(key as CalloutVariantProps["variant"])}
        >
          <DropdownItem key={"flat"}>flat</DropdownItem>
          <DropdownItem key={"light"}>light</DropdownItem>
          <DropdownItem key={"faded"}>faded</DropdownItem>
          <DropdownItem key={"solid"}>solid</DropdownItem>
          <DropdownItem key={"bordered"}>bordered</DropdownItem>
          <DropdownItem key={"shadow"}>shadow</DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Dropdown size="sm">
        <DropdownTrigger>
          <Button
            size={attributes.size}
            color={attributes.color}
            variant={attributes.variant}
            radius={attributes.radius}
          >
            {attributes.radius}
          </Button>
        </DropdownTrigger>

        <DropdownMenu
          onAction={(key) => setRadius(key as CalloutVariantProps["radius"])}
        >
          <DropdownItem key={"none"}>none</DropdownItem>
          <DropdownItem key={"sm"}>sm</DropdownItem>
          <DropdownItem key={"md"}>md</DropdownItem>
          <DropdownItem key={"lg"}>lg</DropdownItem>
          <DropdownItem key={"full"}>full</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </BaseBubbleMenu>
  );
};
