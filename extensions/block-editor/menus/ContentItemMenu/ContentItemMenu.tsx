import { useEffect, useState } from 'react'
import { MenuProps } from '../types'
import { useData } from './hooks/useData'
import useContentItemActions from './hooks/useContentItemActions'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/dropdown'
import { Icon } from '@iconify/react'
import { DragHandle } from '@tiptap-pro/extension-drag-handle-react'
import { Link } from '@heroui/link'

type MenuItem = {
  key: string
  label: string
  icon: string
  onPress: () => void
}

export const ContentItemMenu = ({ editor, isEditable = true }: MenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const data = useData()
  const actions = useContentItemActions(editor, data.currentNode, data.currentNodePos)

  const items = [
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
  ]

  useEffect(() => {
    editor.commands.setMeta('lockDragHandle', menuOpen)
  }, [editor, menuOpen])

  const renderMenuItem = (item: MenuItem) => (
    <DropdownItem
      key={item.key}
      startContent={<Icon icon={item.icon} />}
      onPress={item.onPress}
      color={item.key === 'delete' ? 'danger' : 'default'}
    >
      {item.label}
    </DropdownItem>
  )

  return (
    <DragHandle pluginKey="ContentItemMenu" editor={editor} onNodeChange={data.handleNodeChange}>
      {isEditable ? (
        <Dropdown onOpenChange={setMenuOpen} tabIndex={-1}>
          <DropdownTrigger>
            <Link isBlock color="foreground" tabIndex={-1}>
              <Icon fontSize={20} icon="lucide:grip-vertical" tabIndex={-1} />
            </Link>
          </DropdownTrigger>
          <DropdownMenu aria-label="Node Actions" items={items}>
            {renderMenuItem}
          </DropdownMenu>
        </Dropdown>
      ) : null}
    </DragHandle>
  )
}
