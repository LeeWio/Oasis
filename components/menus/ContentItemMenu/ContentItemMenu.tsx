import { Editor } from '@tiptap/react'
import DragHandle from '@tiptap-pro/extension-drag-handle-react'
import { useData } from './hooks/hooks/useData'
import React, { useEffect, useMemo, useState } from 'react'
import useContentItemActions from './hooks/hooks/useContentItemActions'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { Icon } from '@iconify/react'

export type ContentItemMenuProps = {
  editor: Editor
}
type MenuItem = {
  key: string
  label: string
  icon: string
  onPress: () => void
}
export const ContentItemMenu = ({ editor }: ContentItemMenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const data = useData()
  const actions = useContentItemActions(editor, data.currentNode, data.currentNodePos)

  const items = useMemo<MenuItem[]>(() => [
    {
      key: 'clear formatting',
      label: 'Clear formatting',
      icon: 'lucide:remove-formatting',
      onPress: actions.resetTextFormatting,
    },
    {
      key: 'copy to clipboard',
      label: 'Copy to clipboard',
      icon: 'lucide:clipboard',
      onPress: actions.copyNodeToClipboard,
    },
    {
      key: 'duplicate',
      label: 'Duplicate',
      icon: 'lucide:copy',
      onPress: actions.duplicateNode,
    },
    {
      key: 'delete',
      label: 'Delete',
      icon: 'lucide:trash-2',
      onPress: actions.deleteNode,
    },
  ], [actions])

  useEffect(() => {
    editor.commands.setMeta('lockDragHandle', menuOpen)
  }, [editor, menuOpen])

  const renderMenuItem = (item: MenuItem) => (
    <DropdownItem
      key={item.key}
      color={item.key === 'delete' ? 'danger' : 'default'}
      startContent={<Icon icon={item.icon} />}
      onPress={item.onPress}
    >
      {item.label}
    </DropdownItem>
  )
  return (
    <DragHandle
      editor={editor}
      pluginKey="ContentItemMenu"
      tippyOptions={{
        offset: [-2, 4],
        zIndex: 999,
      }}
      onNodeChange={data.handleNodeChange}
    >
      <Dropdown onOpenChange={setMenuOpen}>
        <DropdownTrigger>
          <Button isIconOnly size="sm" variant="light">
            <Icon fontSize={20} icon="lucide:grip-vertical" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Node Actions" items={items}>
          {renderMenuItem}
        </DropdownMenu>
      </Dropdown>
    </DragHandle>
  )
}