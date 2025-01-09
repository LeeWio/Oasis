import { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";
import { useData } from "./hooks/useData";
import { useContentItemActions } from "./hooks/useContentItemActions";
import DragHandle from "@tiptap-pro/extension-drag-handle-react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Icon } from "@iconify/react";
import { Button } from "@nextui-org/button";

export type ContentItemMenuProps = {
  editor: Editor;
};
type MenuItem = {
  key: string;
  label: string;
  icon: string;
  onPress: () => void;
};

export const ContentItemMenu = ({ editor }: ContentItemMenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const data = useData();
  const actions = useContentItemActions(
    editor,
    data.currentNode,
    data.currentNodePos,
  );

  const items = [
    {
      key: "clear formatting",
      label: "Clear formatting",
      icon: "lucide:remove-formatting",
      onPress: actions.resetTextFormatting,
    },
    {
      key: "copy to clipboard",
      label: "Copy to clipboard",
      icon: "lucide:clipboard",
      onPress: actions.copyNodeToClipboard,
    },
    {
      key: "duplicate",
      label: "Duplicate",
      icon: "lucide:copy",
      onPress: actions.duplicateNode,
    },
    {
      key: "delete",
      label: "Delete",
      icon: "lucide:trash-2",
      onPress: actions.deleteNode,
    },
  ];

  useEffect(() => {
    editor.commands.setMeta("lockDragHandle", menuOpen);
  }, [editor, menuOpen]);

  const renderMenuItem = (item: MenuItem) => (
    <DropdownItem
      key={item.key}
      color={item.key === "delete" ? "danger" : "default"}
      startContent={<Icon icon={item.icon} />}
      onPress={item.onPress}
    >
      {item.label}
    </DropdownItem>
  );

  return (
    <DragHandle
      pluginKey={"ContentItemMenu"}
      editor={editor}
      onNodeChange={data.handleNodeChange}
      tippyOptions={{
        offset: [5, 0],
      }}
    >
      <Dropdown onOpenChange={setMenuOpen}>
        <DropdownTrigger>
          <Icon
            fontSize={20}
            icon="lucide:grip-vertical"
            className="cursor-pointer"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Node Actions" items={items}>
          {renderMenuItem}
        </DropdownMenu>
      </Dropdown>
    </DragHandle>
  );
};
