'use client'

import React from 'react'
import { cn } from '@heroui/theme'
import { Button } from '@heroui/button'
import { Tooltip } from '@heroui/tooltip'

export type ColorButtonProps = {
  color: string
  isSelected?: boolean
  onPress?: (color: string) => void
  className?: string
  size?: string
  tooltip?: string
}

const ColorButton = React.forwardRef<HTMLButtonElement, ColorButtonProps>((props, ref) => {
  const { color, tooltip, onPress, isSelected, className } = props

  return (
    <Tooltip key={color} content={tooltip}>
      <Button
        ref={ref}
        disableRipple
        isIconOnly
        className={cn(className, {
          'bg-default': isSelected,
        })}
        size="sm"
        variant="light"
        onPress={() => onPress?.(color)}
      >
        <span className="h-6 w-6 rounded-md" style={{ backgroundColor: color }} />
      </Button>
    </Tooltip>
  )
})

ColorButton.displayName = 'ColorButton'

export default ColorButton
