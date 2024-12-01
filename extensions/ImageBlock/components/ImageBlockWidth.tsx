import React, { memo, useCallback, useEffect, useState } from "react";
import { Slider, SliderValue } from "@nextui-org/slider";

export type ImageBlockWidthProps = {
  onChange: (value: number) => void;
  value: number;
};

export const ImageBlockWidth = memo(
  ({ onChange, value }: ImageBlockWidthProps) => {
    const [currentValue, setCurrentValue] = useState(value);

    useEffect(() => {
      setCurrentValue(value);
    }, [value]);

    const handleChange = useCallback(
      (value: SliderValue) => {
        onChange(value as number);
      },
      [onChange],
    );

    return (
      <Slider
        aria-label="adjust image size"
        className={"w-[100px]"}
        defaultValue={80}
        maxValue={100}
        minValue={20}
        showSteps={true}
        showTooltip={true}
        size="sm"
        step={10}
        value={currentValue}
        onChange={(value: SliderValue) => {
          handleChange(value);
        }}
      />
    );
  },
);

ImageBlockWidth.displayName = "ImageBlockWidth";
