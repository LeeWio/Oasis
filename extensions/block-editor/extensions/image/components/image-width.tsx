import { memo, useCallback } from 'react'
import { SliderValue, Slider } from '@heroui/slider'

export type ImageWidthProps = {
  onChange: (value: number) => void
  value: number
}

export const ImageWidth = memo(({ onChange, value }: ImageWidthProps) => {
  const handleChange = useCallback(
    (value: SliderValue) => {
      onChange(value as number)
    },
    [onChange]
  )

  return (
    <div className="w-24">
      <Slider
        aria-label="Temperature"
        className="max-w-md"
        radius="md"
        defaultValue={20}
        maxValue={100}
        minValue={20}
        step={20}
        size="sm"
        value={value}
        onChange={handleChange}
      />
    </div>
  )
})

ImageWidth.displayName = 'ImageWidth'
