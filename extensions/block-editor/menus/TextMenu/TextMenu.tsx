import { memo } from 'react'
import { MenuProps } from '../types'
import { useTextmenuCommands } from './hooks/useTextmenuCommands'
import { useTextmenuStates } from './hooks/useTextmenuStates'
import { useTextmenuContentTypes } from './hooks/useTextmenuContentTypes'
import { BubbleMenu } from '@tiptap/react/menus'
import TextMenuItem from './components/TextMenuItem'
import PopoverFilterWrapper from '../../panels/ColorPicker/PopoverFilterWrapper'
import ColorButton from '../../panels/ColorPicker/ColorButton'
import { Divider } from '@heroui/divider'

const MemoButton = memo(TextMenuItem)
const MemoColorPicker = memo(PopoverFilterWrapper)
const MemoColorButton = memo(ColorButton)

const COLORS = [
  { color: '#71C0BB', tooltip: 'Teal', value: 'teal' },
  { color: '#F31260', tooltip: 'Red', value: 'red' },
  { color: '#006FEE', tooltip: 'Blue', value: 'blue' },
  { color: '#17C964', tooltip: 'Green', value: 'green' },
  { color: '#F5A524', tooltip: 'Yellow', value: 'yellow' },
  { color: '#332D56', tooltip: 'Navy', value: 'navy' },
  // { color: "#ffffff", tooltip: "White", value: "white" },
]

export const TextMenu = ({ editor }: MenuProps) => {
  const commands = useTextmenuCommands(editor)
  const states = useTextmenuStates(editor)
  const blockOptions = useTextmenuContentTypes(editor)

  return (
    <BubbleMenu pluginKey="textMenu" editor={editor} shouldShow={states.shouldShow}>
      <div
        aria-label="Column layout options"
        className="z-10 inline-flex w-full flex-row items-center justify-center gap-0.5 rounded-md bg-content1 px-1.5 py-0.5 shadow-medium"
      >
        <MemoButton
          isSelected={states.isBold}
          onPress={commands.onBold}
          value="Bold"
          icon="lucide:bold"
        />
        <MemoButton
          isSelected={states.isItalic}
          onPress={commands.onItalic}
          value="Italic"
          icon="lucide:italic"
        />
        <MemoButton
          isSelected={states.isUnderline}
          onPress={commands.onUnderline}
          value="Underline"
          icon="lucide:underline"
        />
        <MemoButton
          isSelected={states.isStrike}
          onPress={commands.onStrike}
          value="Strikethrough"
          icon="lucide:strikethrough"
        />
        <MemoButton
          isSelected={states.isCode}
          onPress={commands.onCode}
          value="Code"
          icon="lucide:code"
        />
        <MemoColorPicker icon="lucide:palette">
          {COLORS.map(({ color, value, tooltip }) => (
            <MemoColorButton
              tooltip={tooltip}
              key={value}
              onPress={commands.onChangeColor}
              color={color}
              isSelected={states.currentColor === color}
            />
          ))}
          <Divider orientation="vertical" className="h-6" />
          <MemoButton icon="lucide:circle-off" onPress={commands.onClearColor} value="None" />
        </MemoColorPicker>

        <MemoColorPicker icon="fa6-solid:highlighter">
          {COLORS.map(({ color, value, tooltip }) => (
            <MemoColorButton
              tooltip={tooltip}
              key={value}
              onPress={commands.onChangeHighlight}
              color={color}
              isSelected={states.currentHighlight === color}
            />
          ))}
          <Divider orientation="vertical" className="h-6" />
          <MemoButton icon="lucide:circle-off" onPress={commands.onClearHighlight} value="None" />
        </MemoColorPicker>
      </div>
    </BubbleMenu>
  )
}
