import { useMemo } from 'react'
import { Icon } from '@iconify/react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/dropdown'
import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/link'
import { cn } from '@nextui-org/theme'

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
        <Button
          disableRipple
          isIconOnly
          as={Link}
          color={'default'}
          size={'sm'}
          variant="light"
        >
          <Icon fontSize={20} icon={activeItem?.icon || 'lucide:pilcrow'} />
        </Button>
      </DropdownTrigger>

      <DropdownMenu aria-label="Content Type Picker Menu" variant="faded">
        {options.map(category => (
          <DropdownSection key={category.id} title={category.label}>
            {category.children.map(child => (
              <DropdownItem
                key={child.id}
                classNames={{
                  base: `data-hover:${child.isActive()}`,
                }}
                startContent={<Icon className="w-4 h-4 mr-1" icon={child.icon} />}
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
