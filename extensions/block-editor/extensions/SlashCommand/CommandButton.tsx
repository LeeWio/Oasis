import { forwardRef } from 'react'
import { Button } from '@heroui/button'
import { cn } from '@heroui/theme'
import { Icon, IconifyIconProps } from '@iconify/react'

export type CommandButtonProps = {
  active?: boolean
  description: string
  icon: IconifyIconProps
  onClick: () => void
  title: string
}

export const CommandButton = forwardRef<HTMLButtonElement, CommandButtonProps>(
  ({ active, icon, onClick, title }, ref) => {
    const wrapperClass = cn(
      'flex text-neutral-500 items-center text-xs font-semibold justify-start p-1.5 gap-2 rounded',
      !active && 'bg-transparent hover:bg-neutral-50 hover:text-black',
      active && 'bg-neutral-100 text-black hover:bg-neutral-100',
    )

    return (
      <Button
        ref={ref}
        className={wrapperClass}
        startContent={<Icon className="h-3 w-3" icon={icon.icon} />}
        onPress={onClick}
      >
        {title}
      </Button>
    )
  },
)

CommandButton.displayName = 'CommandButton'
