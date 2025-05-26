import { useMemo } from 'react'
import { Icon } from '@iconify/react'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@heroui/dropdown'

import { MemoButton } from '../TextMenu'

export type ContentTypePickerOption = {
  label: string
  id: string
  disabled: () => boolean
  isActive: () => boolean
  onClick: () => void
  icon: string
}

export type ContentTypePickerCategory = {
  label: string
  id: string
  children: ContentTypePickerOption[]
}

export type ContentPickerOptions = Array<ContentTypePickerCategory>

export type ContentTypePickerProps = {
  options: ContentPickerOptions
}

export const ContentTypePicker = ({ options }: ContentTypePickerProps) => {
  const activeItem = useMemo(() => {
    // Find the active item in the nested structure
    return options.flatMap(option => option.children).find(option => option.isActive())
  }, [options])

  return (
    <Dropdown>
      <DropdownTrigger>
        <MemoButton icon={activeItem?.icon || 'lucide:pilcrow'} value={activeItem?.label} />
      </DropdownTrigger>

      <DropdownMenu aria-label="Content Type Picker Menu" variant="faded">
        {options.map(category => (
          <DropdownSection key={category.id} title={category.label}>
            {category.children.map(child => (
              <DropdownItem
                key={child.id}
                startContent={<Icon className="h-5 w-5" icon={child.icon} />}
                onPress={child.onClick}
              >
                {child.label}
              </DropdownItem>
            ))}
          </DropdownSection>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
