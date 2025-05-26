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
  value: string | undefined
  startContent?: React.ReactNode
  endContent?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  tooltip?: string
  className?: string
}

const TextMenuItem = React.forwardRef<HTMLButtonElement, TextMenuItemProps>(
  (
    {
      icon,
      tooltip,
      fontSize = 20,
      size = 'sm',
      isSelected = false,
      onPress,
      value,
      startContent,
      endContent,
      className,
      ...props
    },
    ref,
  ) => {
    const content = icon ? <Icon fontSize={fontSize} icon={icon} /> : value

    const button = (
      <Button
        ref={ref}
        disableRipple
        className={cn(className, {
          'bg-default': isSelected,
        })}
        endContent={endContent}
        isIconOnly={!!icon}
        radius="md"
        size={size}
        startContent={startContent}
        variant="light"
        onPress={onPress}
        {...props}
      >
        {content}
      </Button>
    )

    return tooltip ? <Tooltip content={tooltip}>{button}</Tooltip> : button
  },
)

TextMenuItem.displayName = 'TextMenuItem'

export default TextMenuItem
