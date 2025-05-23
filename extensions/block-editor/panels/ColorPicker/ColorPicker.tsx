import { memo, useCallback, useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import ColorButton from './ColorButton'
import { themeColors } from '../../lib/constants'
import { MemoButton } from '../../menus/TextMenu'
import { Input } from '@heroui/input'

export type ColorPickerProps = {
  color?: string
  onChange?: (color: string) => void
  onClear?: () => void
}

const MemoColorButton = memo(ColorButton)

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
    <>
      <HexColorPicker color={color || ''} onChange={onChange} />
      <Input
        type="text"
        placeholder="#000000"
        variant="bordered"
        value={colorInputValue}
        onChange={handleColorUpdate}
        onBlur={handleColorChange}
      />
      <div className="flex">
        {themeColors.map(({ color: currentColor, value, tooltip }) => (
          <MemoColorButton
            tooltip={tooltip}
            key={value}
            onPress={onChange}
            color={currentColor}
            className="flex-1"
            isSelected={currentColor === color}
          />
        ))}
        <MemoButton
          tooltip="Reset color to default"
          key="undo"
          onPress={onClear}
          icon="meteor-icons:turn-up-left"
          value="undo"
          className="flex-1"
        />
      </div>
    </>
  )
}
