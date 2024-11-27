'use client'



import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover'
import { Button } from '@nextui-org/button'

export default function BlogPage() {
  return (
    // <div className="relative flex h-screen min-h-dvh w-full flex-col overflow-hidden bg-background">
    //   <main className="container mx-auto mt-[80px] flex  flex-col items-start px-8">
    <Popover placement="right">
      <PopoverTrigger>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-small font-bold">Popover Content</div>
          <div className="text-tiny">This is the popover content</div>
        </div>
      </PopoverContent>
    </Popover>
    // </main>
    // </div>
  )
}
