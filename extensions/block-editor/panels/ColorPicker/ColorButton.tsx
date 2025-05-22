"use client";

import React from "react";
import { cn } from "@heroui/theme";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";

export type ColorButtonProps = {
  color: string;
  isSelected?: boolean;
  onPress?: (color: string) => void;
  className?: string;
  size?: string;
  tooltip?: string;
};

const ColorButton = React.forwardRef<HTMLButtonElement, ColorButtonProps>(
  (props, ref) => {
    const { color, tooltip, onPress, isSelected, className } = props;

    return (
      <Tooltip content={tooltip} key={color}>
        <Button
          ref={ref}
          variant="light"
          onPress={() => onPress?.(color)}
          radius="md"
          size="sm"
          className={cn(className, {
            "bg-default": isSelected,
          })}
          disableRipple
          isIconOnly
        >
          <span
            style={{ backgroundColor: color }}
            className="h-6 w-6 rounded-full"
          />
        </Button>
      </Tooltip>
    );
  },
);

ColorButton.displayName = "ColorButton";

export default ColorButton;
