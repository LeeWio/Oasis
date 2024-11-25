'use client'

import type { PopoverProps } from '@nextui-org/react'

import React from 'react'
import { Button, Popover, PopoverContent, PopoverTrigger, useDisclosure } from '@nextui-org/react'
import { Icon } from '@iconify/react'

export type PopoverFilterWrapperProps = Omit<PopoverProps, 'children'> & {
  title?: string
  children: React.ReactNode
}

const PopoverWrapper = React.forwardRef<HTMLDivElement, PopoverFilterWrapperProps>(
  ({ title, children, ...props }, ref) => {
    const { isOpen, onOpenChange } = useDisclosure()

    return (
      <Popover ref={ref} isOpen={isOpen} onOpenChange={onOpenChange} {...props}>
        <PopoverTrigger>
          <Button
            className="border-default-200 text-default-500"
            endContent={<Icon icon="solar:alt-arrow-down-linear" />}
            size={'sm'}
            variant="bordered"
          >
            {title}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col items-start gap-2 px-4 pt-4">
          <span className="mb-2 text-medium font-medium text-default-600">{title}</span>
          <div className="w-full px-2 mb-3">{children}</div>
        </PopoverContent>
      </Popover>
    )
  }
)

PopoverWrapper.displayName = 'PopoverWrapper'

export default PopoverWrapper
