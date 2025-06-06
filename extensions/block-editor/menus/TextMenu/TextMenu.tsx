import { memo } from "react";
import { BubbleMenu } from "@tiptap/react/menus";
import { Divider } from "@heroui/divider";
import { Card, CardBody } from "@heroui/card";

import { MenuProps } from "../types";
import PopoverFilterWrapper from "../../panels/ColorPicker/PopoverFilterWrapper";
import { LinkEditorPanel } from "../../panels/LinkEditorPanel";

import { useTextmenuCommands } from "./hooks/useTextmenuCommands";
import { useTextmenuStates } from "./hooks/useTextmenuStates";
import { useTextmenuContentTypes } from "./hooks/useTextmenuContentTypes";
import TextMenuItem from "./components/TextMenuItem";
import { FontSizePicker } from "./components/FontSizePicker";
import { FontFamilyPicker } from "./components/FontFamilyPicker";
import { ContentTypePicker } from "./components/ContentTypePicker";

import { ColorPicker } from "@/components/ColorPicker";

export const MemoButton = memo(TextMenuItem);
export const MemoPopoverWrapperPicker = memo(PopoverFilterWrapper);
const MemoFontSizePicker = memo(FontSizePicker);
const MemoFontFamilyPicker = memo(FontFamilyPicker);
const MemoContentTypePicker = memo(ContentTypePicker);
const MemoColorPicker = memo(ColorPicker);

export const TextMenu = ({ editor }: MenuProps) => {
  const commands = useTextmenuCommands(editor);
  const states = useTextmenuStates(editor);
  const blockOptions = useTextmenuContentTypes(editor);

  return (
    <BubbleMenu
      editor={editor}
      pluginKey="textMenu"
      shouldShow={states.shouldShow}
    >
      <Card
        classNames={{
          body: "py-1 flex flex-row gap-1 justify-start items-center",
        }}
        radius="md"
      >
        <CardBody aria-label="Column layout options">
          <MemoContentTypePicker options={blockOptions} />
          <MemoFontFamilyPicker
            value={states.currentFont || ""}
            onChange={commands.onSetFont}
          />
          <MemoFontSizePicker
            value={states.currentSize || ""}
            onChange={commands.onSetFontSize}
          />

          <Divider className="mx-1 h-6" orientation="vertical" />

          <MemoButton
            icon="lucide:bold"
            isSelected={states.isBold}
            value="Bold"
            onPress={commands.onBold}
          />
          <MemoButton
            icon="lucide:italic"
            isSelected={states.isItalic}
            value="Italic"
            onPress={commands.onItalic}
          />
          <MemoButton
            icon="lucide:underline"
            isSelected={states.isUnderline}
            value="Underline"
            onPress={commands.onUnderline}
          />
          <MemoButton
            icon="lucide:strikethrough"
            isSelected={states.isStrike}
            value="Strikethrough"
            onPress={commands.onStrike}
          />
          <MemoButton
            icon="lucide:code"
            isSelected={states.isCode}
            value="Code"
            onPress={commands.onCode}
          />
          <MemoButton
            icon="lucide:square-code"
            value="CodeBlock"
            onPress={commands.onCodeBlock}
          />

          <MemoPopoverWrapperPicker icon="lucide:link">
            <LinkEditorPanel onSetLink={commands.onLink} />
          </MemoPopoverWrapperPicker>

          <MemoPopoverWrapperPicker
            className="max-w-56 py-2"
            icon="lucide:palette"
          >
            <MemoColorPicker
              hexColor={states.currentColor}
              onChange={commands.onChangeColor}
              onClear={commands.onClearColor}
            />
          </MemoPopoverWrapperPicker>

          <MemoPopoverWrapperPicker
            className="max-w-56 py-2"
            icon="fa6-solid:highlighter"
          >
            <MemoColorPicker
              hexColor={states.currentHighlight}
              onChange={commands.onChangeHighlight}
              onClear={commands.onClearHighlight}
            />
          </MemoPopoverWrapperPicker>

          <Divider className="mx-1 h-6" orientation="vertical" />

          <MemoPopoverWrapperPicker icon="fa6-solid:ellipsis-vertical">
            <div className="flex gap-1">
              <MemoButton
                icon="lucide:subscript"
                isSelected={states.isSubscript}
                value="Subscript"
                onPress={commands.onSubscript}
              />
              <MemoButton
                icon="lucide:superscript"
                isSelected={states.isSuperscript}
                value="Superscript"
                onPress={commands.onSuperscript}
              />
              <Divider className="mx-1 h-6" orientation="vertical" />
              <MemoButton
                icon="lucide:align-left"
                isSelected={states.isAlignLeft}
                value="Align Left"
                onPress={commands.onAlignLeft}
              />
              <MemoButton
                icon="lucide:align-center"
                isSelected={states.isAlignCenter}
                value="Align Center"
                onPress={commands.onAlignCenter}
              />
              <MemoButton
                icon="lucide:align-right"
                isSelected={states.isAlignRight}
                value="Align Right"
                onPress={commands.onAlignRight}
              />
              <MemoButton
                icon="lucide:align-justify"
                isSelected={states.isAlignJustify}
                value="Align Justify"
                onPress={commands.onAlignJustify}
              />
            </div>
          </MemoPopoverWrapperPicker>
        </CardBody>
      </Card>
    </BubbleMenu>
  );
};
