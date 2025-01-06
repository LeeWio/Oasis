import Callout from "@/components/callout/src/callout";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { CopyDocumentBulkIcon } from "@nextui-org/shared-icons";
import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";

export const CalloutView: React.FC<NodeViewProps> = ({ node, editor }) => {
  const { color, variant, size, radius } = node.attrs;
  return (
    <NodeViewWrapper>
      <Callout
        variant={variant}
        size={size}
        startContent={<StartContent />}
        color={color}
        radius={radius}
      >
        <NodeViewContent />
      </Callout>
    </NodeViewWrapper>
  );
};

const StartContent = () => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <CopyDocumentBulkIcon />
      </DropdownTrigger>
      <DropdownMenu aria-label="xxx" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          asasdf
        </DropdownItem>
        <DropdownItem key="profile1" className="h-14 gap-2">
          asasdf
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
