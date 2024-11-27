import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Listbox, ListboxItem, ListboxSection } from '@nextui-org/listbox'
import { Icon } from '@iconify/react'

import { Command, MenuListProps } from './types'

export const MenuList = React.forwardRef((props: MenuListProps, ref) => {
  const scrollContainer = useRef<HTMLDivElement>(null)
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0)
  const [selectedCommandIndex, setSelectedCommandIndex] = useState(0)

  // Anytime the groups change, i.e. the user types to narrow it down, we want to
  // reset the current selection to the first menu item
  useEffect(() => {
    setSelectedGroupIndex(0)
    setSelectedCommandIndex(0)
  }, [props.items])

  const selectItem = useCallback(
    (groupIndex: number, commandIndex: number) => {
      const command = props.items[groupIndex].commands[commandIndex]

      props.command(command)
    },
    [props]
  )

  React.useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: React.KeyboardEvent }) => {
      if (event.key === 'ArrowDown') {
        if (!props.items.length) {
          return false
        }

        const commands = props.items[selectedGroupIndex].commands

        let newCommandIndex = selectedCommandIndex + 1
        let newGroupIndex = selectedGroupIndex

        if (commands.length - 1 < newCommandIndex) {
          newCommandIndex = 0
          newGroupIndex = selectedGroupIndex + 1
        }

        if (props.items.length - 1 < newGroupIndex) {
          newGroupIndex = 0
        }

        setSelectedCommandIndex(newCommandIndex)
        setSelectedGroupIndex(newGroupIndex)

        return true
      }

      if (event.key === 'ArrowUp') {
        if (!props.items.length) {
          return false
        }

        let newCommandIndex = selectedCommandIndex - 1
        let newGroupIndex = selectedGroupIndex

        if (newCommandIndex < 0) {
          newGroupIndex = selectedGroupIndex - 1
          newCommandIndex = props.items[newGroupIndex]?.commands.length - 1 || 0
        }

        if (newGroupIndex < 0) {
          newGroupIndex = props.items.length - 1
          newCommandIndex = props.items[newGroupIndex].commands.length - 1
        }

        setSelectedCommandIndex(newCommandIndex)
        setSelectedGroupIndex(newGroupIndex)

        return true
      }

      if (event.key === 'Enter') {
        if (!props.items.length || selectedGroupIndex === -1 || selectedCommandIndex === -1) {
          return false
        }

        selectItem(selectedGroupIndex, selectedCommandIndex)

        return true
      }

      return false
    }
  }))

  useEffect(() => {
    const selectedItem = scrollContainer.current?.querySelector('[itemRef="true"]')

    if (selectedItem) {
      selectedItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }, [selectedCommandIndex, selectedGroupIndex])

  const createCommandClickHandler = useCallback(
    (groupIndex: number, commandIndex: number) => {
      return () => {
        selectItem(groupIndex, commandIndex)
      }
    },
    [selectItem]
  )

  if (!props.items.length) {
    return null
  }

  return (
    <Listbox
      ref={scrollContainer}
      aria-label={'Select Slash Commands'}
      className="overflow-y-auto max-w-[18rem] max-h-[18rem] divide-y divide-default-300/50 dark:divide-default-100/80  bg-content1 shadow-small rounded-medium"
      classNames={{
        base: 'overflow-y-auto  max-w-[18rem] max-h-[18rem]',
        list: 'overflow-y-auto max-h-[18rem]'
      }}
      variant={'solid'}
    >
      {props.items.map((group, groupIndex) => (
        <ListboxSection key={group.title} title={group.title}>
          {group.commands.map((command: Command, commandIndex: number) => (
            <ListboxItem
              key={command.name}
              classNames={{
                base: `${groupIndex == selectedGroupIndex && commandIndex == selectedCommandIndex ? 'bg-content3' : ''}`
              }}
              itemRef={groupIndex == selectedGroupIndex && commandIndex == selectedCommandIndex ? 'true' : undefined}
              startContent={<Icon icon={command.iconName} />}
              textValue={command.name}
              onPress={createCommandClickHandler(groupIndex, commandIndex)}
            >
              {command.label}
            </ListboxItem>
          ))}
        </ListboxSection>
      ))}
    </Listbox>
  )
})

MenuList.displayName = 'MenuList'

export default MenuList
