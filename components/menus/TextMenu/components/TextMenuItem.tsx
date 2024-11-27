'use client'

import React from 'react'
import { Icon } from '@iconify/react'
import { CheckboxProps } from '@nextui-org/checkbox'
import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/link'
import { cn } from '@nextui-org/theme'

export type TextMenuItemProps = Omit<CheckboxProps, 'icon'> & {
  icon?: string
  fontSize?: number
  onClick?: () => void
  isSelected?: boolean
  value?: string
}

const TextMenuItem = React.forwardRef<HTMLButtonElement, TextMenuItemProps>(
  ({ icon, value, isSelected = false, fontSize = 20, onClick }: TextMenuItemProps, ref) => {
    return (
      <Button
        ref={ref}
        disableRipple
        isBlock
        isIconOnly
        as={Link}
        className={cn({
          'bg-primary': isSelected,
        })}
        color="default"
        radius="sm"
        size="sm"
        variant="light"
        onPress={onClick}
      >
        {icon ? <Icon fontSize={fontSize} icon={icon} /> : value}
      </Button>
    )
  },
)

TextMenuItem.displayName = 'TextMenuItem'

export default TextMenuItem
