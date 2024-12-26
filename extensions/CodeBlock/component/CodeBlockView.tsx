import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { NodeViewProps, NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { useMemo, useState } from "react";
import type { Selection } from "@react-types/shared";
import { Select, SelectItem } from "@nextui-org/select";

export const CodeBlockView: React.FC<NodeViewProps> = ({
  node: {
    attrs: { language: defaultLanguage },
  },
  updateAttributes,
  extension,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Selection>(
    new Set([defaultLanguage]),
  );

  return (
    <NodeViewWrapper className="code-block">
      <Select
        isVirtualized
        selectionMode="single"
        className="max-w-sm"
        size="md"
        selectedKeys={selectedLanguage}
        onSelectionChange={setSelectedLanguage}
      >
        {extension.options.lowlight.listLanguages().map((language: string) => (
          <SelectItem
            key={language}
            onPress={() => updateAttributes({ language })}
          >
            {language}
          </SelectItem>
        ))}
      </Select>
      <pre className="relative">
        {/* <Dropdown */}
        {/*   classNames={{ */}
        {/*     base: "absolute right-2 top-2", */}
        {/*   }} */}
        {/* > */}
        {/*   <DropdownTrigger> */}
        {/*     <Button className="capitalize" variant="flat" size="sm"> */}
        {/*       {selectedValue} */}
        {/*     </Button> */}
        {/*   </DropdownTrigger> */}
        {/*   <DropdownMenu */}
        {/*     disallowEmptySelection */}
        {/*     aria-label="single selection language" */}
        {/*     selectedKeys={selectedLanguages} */}
        {/*     onSelectionChange={setSelectedLanguages} */}
        {/*     onAction={(key) => updateAttributes({ language: key.toString() })} */}
        {/*     selectionMode="single" */}
        {/*     variant="flat" */}
        {/*     className="h-[100px]" */}
        {/*   > */}
        {/*     {extension.options.lowlight.listLanguages().map((lang: string) => ( */}
        {/*       <DropdownItem key={lang}>{lang}</DropdownItem> */}
        {/*     ))} */}
        {/*   </DropdownMenu> */}
        {/* </Dropdown> */}
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  );
};
