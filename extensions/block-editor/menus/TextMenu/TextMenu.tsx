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
import { FontSizePicker } from './components/FontSizePicker'
import { FontFamilyPicker } from './components/FontFamilyPicker'
import { ContentTypePicker } from './components/ContentTypePicker'
import { LinkEditorPanel } from '../../panels/LinkEditorPanel'
import { ColorPicker } from '../../panels/ColorPicker/ColorPicker'

export const MemoButton = memo(TextMenuItem)
const MemoPopoverWrapperPicker = memo(PopoverFilterWrapper)
const MemoFontSizePicker = memo(FontSizePicker)
const MemoFontFamilyPicker = memo(FontFamilyPicker)
const MemoContentTypePicker = memo(ContentTypePicker)
const MemoColorPicker = memo(ColorPicker)

export const TextMenu = ({ editor }: MenuProps) => {
  const commands = useTextmenuCommands(editor)
  const states = useTextmenuStates(editor)
  const blockOptions = useTextmenuContentTypes(editor)

  return (
    <BubbleMenu pluginKey="textMenu" editor={editor} shouldShow={states.shouldShow}>
      <div
        aria-label="Column layout options"
        className="z-10 inline-flex w-full flex-row items-center justify-center gap-1 rounded-md bg-content1 px-1.5 py-0.5 shadow-medium"
      >
        <MemoContentTypePicker options={blockOptions} />
        <MemoFontFamilyPicker value={states.currentFont || ''} onChange={commands.onSetFont} />
        <MemoFontSizePicker value={states.currentSize || ''} onChange={commands.onSetFontSize} />

        <Divider orientation="vertical" className="mx-1 h-6" />

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
        <MemoButton onPress={commands.onCodeBlock} value="CodeBlock" icon="lucide:square-code" />

        <MemoPopoverWrapperPicker icon="lucide:link">
          <LinkEditorPanel onSetLink={commands.onLink} />
        </MemoPopoverWrapperPicker>

        <MemoPopoverWrapperPicker
          icon="lucide:palette"
          className="mt-1 flex w-[200px] flex-col gap-2"
        >
          <MemoColorPicker
            color={states.currentColor}
            onChange={commands.onChangeColor}
            onClear={commands.onClearColor}
          />
        </MemoPopoverWrapperPicker>

        <MemoPopoverWrapperPicker
          icon="fa6-solid:highlighter"
          className="mt-1 flex w-[200px] flex-col gap-2"
        >
          <MemoColorPicker
            color={states.currentHighlight}
            onChange={commands.onChangeHighlight}
            onClear={commands.onClearHighlight}
          />
        </MemoPopoverWrapperPicker>

        <Divider orientation="vertical" className="mx-1 h-6" />

        <MemoPopoverWrapperPicker
          icon="fa6-solid:ellipsis-vertical"
          className="flex flex-row items-center"
        >
          <MemoButton
            onPress={commands.onSubscript}
            isSelected={states.isSubscript}
            value="Subscript"
            icon="lucide:subscript"
          />
          <MemoButton
            onPress={commands.onSuperscript}
            isSelected={states.isSuperscript}
            value="Superscript"
            icon="lucide:superscript"
          />
          <Divider orientation="vertical" className="mx-1 h-6" />
          <MemoButton
            onPress={commands.onAlignLeft}
            isSelected={states.isAlignLeft}
            value="Align Left"
            icon="lucide:align-left"
          />
          <MemoButton
            onPress={commands.onAlignCenter}
            isSelected={states.isAlignCenter}
            value="Align Center"
            icon="lucide:align-center"
          />
          <MemoButton
            onPress={commands.onAlignRight}
            isSelected={states.isAlignRight}
            value="Align Right"
            icon="lucide:align-right"
          />
          <MemoButton
            onPress={commands.onAlignJustify}
            isSelected={states.isAlignJustify}
            value="Align Justify"
            icon="lucide:align-justify"
          />
        </MemoPopoverWrapperPicker>
      </div>
    </BubbleMenu>
  )
}
