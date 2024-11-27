import { useCallback, useState } from 'react'
import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/link'
import { Icon } from '@iconify/react'
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover'
import { RadioGroup } from '@nextui-org/radio'

import ColorRadioItem from './ColorRadioItem'

export type ColorPickerProps = {
  color?: string
  onChange?: (color: string) => void
  onClear?: () => void
}

const COLORS = ['default', 'primary', 'secondary', 'success', 'warning', 'danger'] as const

export const ColorPicker = ({ color, onChange, onClear }: ColorPickerProps) => {
  const [colorInputValue, setColorInputValue] = useState(color || '')

  const handleColorUpdate = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setColorInputValue(event.target.value)
  }, [])

  const handleColorChange = useCallback(() => {
    const isCorrectColor = /^#([0-9A-F]{3}){1,2}$/i.test(colorInputValue)

    if (!isCorrectColor) {
      if (onChange) {
        onChange('')
      }

      return
    }

    if (onChange) {
      onChange(colorInputValue)
    }
  }, [colorInputValue, onChange])

  return (
    <Popover radius={'md'} showArrow={true}>
      <PopoverTrigger>
        <Button disableRipple isIconOnly as={Link} color={'default'} size={'sm'} variant={'light'}>
          <Icon fontSize={20} icon={'lucide:pipette'} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col items-start gap-2 px-4 pt-4">
        <span className="mb-2 text-medium font-medium text-default-600">Color</span>
        <RadioGroup
          aria-label="Color"
          classNames={{ wrapper: 'gap-2' }}
          orientation="horizontal"
          onChange={(e)=>{
            const value = e.target.value
            console.log(value)
          }}
        >
          {COLORS.map(currentColor => (
            <ColorRadioItem
              key={currentColor}
              color={currentColor}
              isSelected={currentColor === color}
              tooltip={currentColor.charAt(0).toUpperCase() + currentColor.slice(1)}
              value={currentColor}
            />
          ))}
        </RadioGroup>
      </PopoverContent>
    </Popover>
  )
}
