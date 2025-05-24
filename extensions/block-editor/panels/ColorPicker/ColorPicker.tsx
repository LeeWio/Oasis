import { memo, useCallback, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Input } from "@heroui/input";

import { themeColors } from "../../lib/constants";
import { MemoButton } from "../../menus/TextMenu";

import ColorButton from "./ColorButton";

export type ColorPickerProps = {
  color?: string;
  onChange?: (color: string) => void;
  onClear?: () => void;
};

const MemoColorButton = memo(ColorButton);

export const ColorPicker = ({ color, onChange, onClear }: ColorPickerProps) => {
  const [colorInputValue, setColorInputValue] = useState(color || "");

  const handleColorUpdate = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setColorInputValue(event.target.value);
    },
    [],
  );

  const handleColorChange = useCallback(() => {
    const isCorrectColor = /^#([0-9A-F]{3}){1,2}$/i.test(colorInputValue);

    if (!isCorrectColor) {
      if (onChange) {
        onChange("");
      }

      return;
    }

    if (onChange) {
      onChange(colorInputValue);
    }
  }, [colorInputValue, onChange]);

  return (
    <>
      <HexColorPicker color={color || ""} onChange={onChange} />
      <Input
        placeholder="#000000"
        type="text"
        value={colorInputValue}
        variant="bordered"
        onBlur={handleColorChange}
        onChange={handleColorUpdate}
      />
      <div className="flex">
        {themeColors.map(({ color: currentColor, value, tooltip }) => (
          <MemoColorButton
            key={value}
            className="flex-1"
            color={currentColor}
            isSelected={currentColor === color}
            tooltip={tooltip}
            onPress={onChange}
          />
        ))}
        <MemoButton
          key="undo"
          className="flex-1"
          icon="meteor-icons:turn-up-left"
          tooltip="Reset color to default"
          value="undo"
          onPress={onClear}
        />
      </div>
    </>
  );
};
