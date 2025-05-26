import { memo, useCallback, useEffect, useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { Input } from '@heroui/input'

import ColorButton from '@/extensions/block-editor/panels/ColorPicker/ColorButton'
import { themeColors } from '@/extensions/block-editor/lib/constants'
import { MemoButton } from '@/extensions/block-editor/menus/TextMenu'

export type ColorPickerProps = {
  hexColor: string
  onChange: (color: string) => void
  onClear: () => void
}
const MemoColorButton = memo(ColorButton)

export const ColorPicker = ({ hexColor, onChange, onClear }: ColorPickerProps) => {
  const [selectedColor, setSelectedColor] = useState(hexColor)

  const handleChange = useCallback(
    (updatedHexColor: string) => {
      const isCorrectColor = /^#([0-9A-F]{3}){1,2}$/i.test(updatedHexColor)

      if (!isCorrectColor) {
        if (onChange) {
          onChange('')
          setSelectedColor('')
        }

        return
      }

      if (onChange) {
        onChange(updatedHexColor)
        setSelectedColor(updatedHexColor)
      }
    },
    [selectedColor, onChange],
  )

  /**
   * Update the selected color when the popover is opened.
   */
  useEffect(() => {
    setSelectedColor(hexColor)
  }, [hexColor])

  return (
    <>
      <HexColorPicker className="!w-full" color={selectedColor} onChange={handleChange} />
      <Input placeholder="#000000" size="sm" value={selectedColor} onValueChange={handleChange} />
      <div className="flex overflow-x-auto">
        {themeColors.map(({ color: currentColor, value, tooltip }) => (
          <MemoColorButton
            key={value}
            className="flex-shrink-0"
            color={currentColor}
            isSelected={currentColor === selectedColor}
            tooltip={tooltip}
            onPress={handleChange}
          />
        ))}
        <MemoButton
          key="undo"
          className="flex-shrink-0"
          icon="meteor-icons:turn-up-left"
          tooltip="Reset color to default"
          value="undo"
          onPress={onClear}
        />
      </div>
    </>
  )
}
