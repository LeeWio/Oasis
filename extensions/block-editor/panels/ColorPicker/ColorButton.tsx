'use client'

import { Button } from '@heroui/button'
import { cn } from '@heroui/theme'
import { Tooltip } from '@heroui/tooltip'

export type ColorButtonProps = {
  color: string
  isSelected?: boolean
  onPress?: (color: string) => void
  className?: string
  size?: string
  tooltip?: string
}

const ColorButton = ({ color, tooltip, onPress, isSelected }: ColorButtonProps) => {
  return (
    <Tooltip content={tooltip} key={color}>
      <Button
        variant="light"
        onPress={() => onPress?.(color)}
        radius="md"
        size="sm"
        className={cn({
          'bg-default': isSelected,
        })}
        disableRipple
        isIconOnly
      >
        <span style={{ backgroundColor: color }} className="h-6 w-6 rounded-full" />
      </Button>
    </Tooltip>
  )
}

ColorButton.displayName = 'ColorButton'

export default ColorButton
