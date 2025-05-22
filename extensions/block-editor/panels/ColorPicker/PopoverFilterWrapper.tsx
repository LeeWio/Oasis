'use client'

import React from 'react'
import { Icon } from '@iconify/react'
import { PopoverContent, Popover, PopoverTrigger, PopoverProps } from '@heroui/popover'
import { Button } from '@heroui/button'
import { useDisclosure } from '@heroui/use-disclosure'

export type PopoverFilterWrapperProps = Omit<PopoverProps, 'children'> & {
  title?: string
  children: React.ReactNode
  icon?: string
}

const PopoverFilterWrapper = React.forwardRef<HTMLDivElement, PopoverFilterWrapperProps>(
  ({ title, children, icon, ...props }, ref) => {
    const { isOpen, onOpenChange } = useDisclosure()
    return (
      <Popover ref={ref} isOpen={isOpen} onOpenChange={onOpenChange} {...props} radius="sm">
        <PopoverTrigger>
          <Button isIconOnly disableRipple size="sm" variant="light">
            {icon ? <Icon fontSize={20} icon={icon} /> : title}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="flex max-w-2xl flex-col items-center gap-2">
          {title ? (
            <span className="mb-2 text-medium font-medium text-default-600">{title}</span>
          ) : null}
          <div className="flex items-center gap-1">{children}</div>
        </PopoverContent>
      </Popover>
    )
  },
)

PopoverFilterWrapper.displayName = 'PopoverFilterWrapper'

export default PopoverFilterWrapper
