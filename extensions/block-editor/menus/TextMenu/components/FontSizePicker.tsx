import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { useCallback } from "react";

import { MemoButton } from "../TextMenu";

const FONT_SIZES = [
  { label: "Smaller", value: "12px" },
  { label: "Small", value: "14px" },
  { label: "Medium", value: "" },
  { label: "Large", value: "18px" },
  { label: "Extra Large", value: "24px" },
];

export type FontSizePickerProps = {
  onChange: (value: string) => void;
  value: string;
};

export const FontSizePicker = ({ onChange, value }: FontSizePickerProps) => {
  const currentValue = FONT_SIZES.find((size) => size.value === value);
  const currentSizeLabel = currentValue?.label.split(" ")[0] || "Medium";
  const selectSize = useCallback(
    (size: string) => () => onChange(size),
    [onChange],
  );

  return (
    <Dropdown>
      <DropdownTrigger>
        <MemoButton value={currentSizeLabel} />
      </DropdownTrigger>
      <DropdownMenu>
        {FONT_SIZES.map((size) => (
          <DropdownItem
            key={`${size.label}_${size.value}`}
            textValue={size.label}
            onPress={selectSize(size.value)}
          >
            <span style={{ fontSize: size.value }}>{size.label}</span>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
