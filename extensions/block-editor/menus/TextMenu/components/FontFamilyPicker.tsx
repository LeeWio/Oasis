import { useCallback } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@heroui/dropdown";

import { MemoButton } from "../TextMenu";

const FONT_FAMILY_GROUPS = [
  {
    label: "Sans Serif",
    options: [
      { label: "Inter", value: "" },
      { label: "Arial", value: "Arial" },
      { label: "Helvetica", value: "Helvetica" },
    ],
  },
  {
    label: "Serif",
    options: [
      { label: "Times New Roman", value: "Times" },
      { label: "Garamond", value: "Garamond" },
      { label: "Georgia", value: "Georgia" },
    ],
  },
  {
    label: "Monospace",
    options: [
      { label: "Courier", value: "Courier" },
      { label: "Courier New", value: "Courier New" },
    ],
  },
];

const FONT_FAMILIES = FONT_FAMILY_GROUPS.flatMap((group) => [
  group.options,
]).flat();

export type FontFamilyPickerProps = {
  onChange: (value: string) => void;
  value: string;
};

export const FontFamilyPicker = ({
  onChange,
  value,
}: FontFamilyPickerProps) => {
  const currentValue = FONT_FAMILIES.find((size) => size.value === value);
  const currentFontLabel = currentValue?.label.split(" ")[0] || "Inter";

  const selectFont = useCallback(
    (font: string) => () => onChange(font),
    [onChange],
  );

  return (
    <Dropdown>
      <DropdownTrigger>
        <MemoButton value={currentFontLabel} />
      </DropdownTrigger>
      <DropdownMenu>
        {FONT_FAMILY_GROUPS.map((group) => (
          <DropdownSection key={group.label} title={group.label}>
            {group.options.map((font) => (
              <DropdownItem
                key={`${font.label}_${font.value}`}
                data-selected={value === font.value}
                textValue={font.label}
                onPress={selectFont(font.value)}
              >
                <span style={{ fontFamily: font.value }}>{font.label}</span>
              </DropdownItem>
            ))}
          </DropdownSection>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
