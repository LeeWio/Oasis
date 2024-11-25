'use client'

import Document from '@/app/[room]/page'
import { Button, useDisclosure } from '@nextui-org/react'

export default function AboutPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
    return (
      <>
        <Button onPress={onOpen}>asdf</Button>
        <Document room={"serDetail.uid"} isOpen={isOpen} onOpenChange={onOpenChange} />
      </>
    )
}
