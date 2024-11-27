'use client'

import React from 'react'
import { Input } from '@nextui-org/input'

export default function DocsPage() {
  const [value, setValue] = React.useState('https://')

  const handleValueChange = (newValue: string) => {
    if (!newValue.startsWith('https://')) {
      setValue('https://' + newValue.replace('https://', '')) // 确保只添加一次
    } else {
      setValue(newValue)
    }
  }

  return (
    <div className="relative flex h-screen min-h-dvh w-full flex-col overflow-hidden bg-background">
      <main className="container mx-auto mt-[80px] flex  flex-col items-start px-8">
        <Input
          label="Website"
          labelPlacement="outside"
          placeholder="nextui.org"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">https://</span>
            </div>
          }
          type="url"
          value={value}
          onValueChange={handleValueChange}
        />
        <p className="text-default-500 text-small">Input value: {value}</p>
      </main>
    </div>
  )
}
