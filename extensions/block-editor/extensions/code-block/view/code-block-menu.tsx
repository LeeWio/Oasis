import { MenuProps } from '@/extensions/block-editor/menus/types'
import { BubbleMenu } from '@tiptap/react/menus'
import { useCallback, useEffect, useState } from 'react'
import { NextProps } from '../code-block'
import { Button } from '@heroui/button'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/dropdown'

export const CodeBlockMenu = ({ editor }: MenuProps) => {
  const [attributes, setAttributes] = useState(
    editor.getAttributes('codeBlock')
  )

  useEffect(() => {
    const updateAttributes = () => {
      setAttributes(editor.getAttributes('codeBlock'))
    }

    editor.on('transaction', updateAttributes)

    return () => {
      editor.off('transaction', updateAttributes)
    }
  }, [editor])

  const shouldShow = useCallback(() => {
    return editor.isActive('codeBlock')
  }, [editor])

  const setColor = (color: NextProps['color']) => {
    if (color) {
      editor.chain().focus().setCodeBlockColor(color).run()
    }
  }

  const setSize = (size: NextProps['size']) => {
    if (size) {
      editor.chain().focus().setCodeBlockSize(size).run()
    }
  }

  const setRadius = (radius: NextProps['radius']) => {
    if (radius) {
      editor.chain().focus().setCodeBlockRadius(radius).run()
    }
  }
  const setVariant = (variant: NextProps['variant']) => {
    if (variant) {
      editor.chain().focus().setCodeBlockVariant(variant).run()
    }
  }

  return (
    <BubbleMenu editor={editor} options={{}} shouldShow={shouldShow}>
      <Dropdown size="sm">
        <DropdownTrigger>
          <Button>{attributes.color}</Button>
        </DropdownTrigger>
        <DropdownMenu
          variant="solid"
          onAction={(key) => setColor(key as NextProps['color'])}
        >
          <DropdownItem key={'default'}>default</DropdownItem>
          <DropdownItem key={'primary'}>primary</DropdownItem>
          <DropdownItem key={'secondary'}>secondary</DropdownItem>
          <DropdownItem key={'success'}>success</DropdownItem>
          <DropdownItem key={'warning'}>warning</DropdownItem>
          <DropdownItem key={'danger'}>danger</DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Dropdown size="sm">
        <DropdownTrigger>
          <Button>{attributes.size}</Button>
        </DropdownTrigger>
        <DropdownMenu
          variant="solid"
          onAction={(key) => setSize(key as NextProps['size'])}
        >
          <DropdownItem key={'sm'}>sm</DropdownItem>
          <DropdownItem key={'md'}>md</DropdownItem>
          <DropdownItem key={'lg'}>lg</DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Dropdown size="sm">
        <DropdownTrigger>
          <Button>{attributes.radius}</Button>
        </DropdownTrigger>
        <DropdownMenu
          variant="solid"
          onAction={(key) => setRadius(key as NextProps['radius'])}
        >
          <DropdownItem key={'none'}>none</DropdownItem>
          <DropdownItem key={'sm'}>sm</DropdownItem>
          <DropdownItem key={'md'}>md</DropdownItem>
          <DropdownItem key={'lg'}>lg</DropdownItem>
          <DropdownItem key={'full'}>full</DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Dropdown size="sm">
        <DropdownTrigger>
          <Button>{attributes.variant}</Button>
        </DropdownTrigger>
        <DropdownMenu
          variant="solid"
          onAction={(key) => setVariant(key as NextProps['variant'])}
        >
          <DropdownItem key={'flat'}>flat</DropdownItem>
          <DropdownItem key={'light'}>light</DropdownItem>
          <DropdownItem key={'faded'}>faded</DropdownItem>
          <DropdownItem key={'solid'}>solid</DropdownItem>
          <DropdownItem key={'bordered'}>bordered</DropdownItem>
          <DropdownItem key={'shadow'}>shadow</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </BubbleMenu>
  )
}
