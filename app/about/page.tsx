import { Button } from '@heroui/button'
import { cn } from '@heroui/theme'

export default function AboutPage() {
  return (
    <Button
      variant="light"
      radius="md"
      size="md"
      className={cn({
        'bg-default': true,
      })}
      disableRipple
      isIconOnly
    >
      <span className="h-7 w-7 rounded-full bg-red-700"></span>
    </Button>
  )
}
