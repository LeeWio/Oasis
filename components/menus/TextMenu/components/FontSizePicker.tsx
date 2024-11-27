import { useCallback } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown'
import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/link'

const FONT_SIZES = [
  { label: 'Smaller', value: '12px' },
  { label: 'Small', value: '14px' },
  { label: 'Medium', value: '' },
  { label: 'Large', value: '18px' },
  { label: 'Extra Large', value: '24px' }
]

export type FontSizePickerProps = {
  onChange: (value: string) => void // eslint-disable-line no-unused-vars
  value: string
}
export const FontSizePicker = ({ onChange, value }: FontSizePickerProps) => {
  const currentValue = FONT_SIZES.find(size => size.value === value)
  const currentSizeLabel = currentValue?.label.split(' ')[0] || 'Medium'

  const selectSize = useCallback((size: string) => () => onChange(size), [onChange])

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button disableRipple as={Link} color={'default'} size={'sm'} variant="light">
          {currentSizeLabel}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="" variant="faded">
        {FONT_SIZES.map(size => (
          <DropdownItem key={`${size.label}_${size.value}`} textValue={size.label} onPress={selectSize(size.value)}>
            <span style={{ fontSize: size.value }}>{size.label}</span>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
