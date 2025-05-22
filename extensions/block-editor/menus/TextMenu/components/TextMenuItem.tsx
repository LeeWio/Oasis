import { Button } from '@heroui/button'
import { cn } from '@heroui/theme'
import { Tooltip } from '@heroui/tooltip'
import { Icon } from '@iconify/react'
import React from 'react'

export type TextMenuItemProps = {
  icon?: string
  fontSize?: number
  onPress?: () => void
  isSelected?: boolean
  value?: string
}

const TextMenuItem = React.forwardRef<HTMLButtonElement, TextMenuItemProps>(
  ({ icon, value, isSelected = false, fontSize = 20, onPress }: TextMenuItemProps, ref) => {
    return (
      <Tooltip content={value}>
        <Button
          ref={ref}
          isIconOnly
          disableRipple
          className={cn({
            'bg-default': isSelected,
          })}
          radius="md"
          size="sm"
          variant="light"
          onPress={onPress}
        >
          {icon ? <Icon fontSize={fontSize} icon={icon} /> : value}
        </Button>
      </Tooltip>
    )
  },
)

TextMenuItem.displayName = 'TextMenuItem'

export default TextMenuItem
