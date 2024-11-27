import React from 'react'
import { Button } from '@nextui-org/button'

import { Kanban } from '@/app/about/kanban-board'

export default function AboutPage() {
  return (
    <div className="relative flex h-screen min-h-dvh w-full flex-col overflow-hidden bg-background">
      <main className="container mx-auto mt-[80px] flex  flex-col items-start px-8">
        <Kanban />
      </main>
    </div>
  )
}
