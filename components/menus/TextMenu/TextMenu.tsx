import { BubbleMenu, Editor } from "@tiptap/react";
import React, { memo } from "react";
import { Divider } from "@nextui-org/divider";

import { useTextmenuCommands } from "./hooks/useTextmenuCommands";
import { useTextmenuStates } from "./hooks/useTextmenuStates";
import { useTextmenuContentTypes } from "./hooks/useTextmenuContentTypes";
import { FontFamilyPicker } from "./components/FontFamilyPicker";
import { MoreOptionPopover } from "./components/MoreOptionPopover";
import { EditLinkPopover } from "./components/EditLinkPopover";
import { FontSizePicker } from "./components/FontSizePicker";

import { MemoButton } from "@/extensions/MultiColumn/menus";
import { ContentTypePicker } from "@/components/menus/TextMenu/components/ContentTypePicker";
import { ColorPicker } from "@/components/panels/Colorpicker";

export type TextMenuProps = {
  editor: Editor;
};

const MemoContentTypePicker = memo(ContentTypePicker);
const MemoFontSizePicker = memo(FontSizePicker);
const MemoFontFamilyPicker = memo(FontFamilyPicker);
const MemoMoreOptionPopover = memo(MoreOptionPopover);
const MemoColorPicker = memo(ColorPicker);

export const TextMenu = ({ editor }: TextMenuProps) => {
  const commands = useTextmenuCommands(editor);
  const states = useTextmenuStates(editor);
  const blockOptions = useTextmenuContentTypes(editor);

  return (
    <BubbleMenu
      editor={editor}
      pluginKey="textMenu"
      shouldShow={states.shouldShow}
      tippyOptions={{
        popperOptions: {
          placement: "top-start",
          modifiers: [
            {
              name: "preventOverflow",
              options: {
                boundary: "viewport",
                padding: 8,
              },
            },
            {
              name: "flip",
              options: {
                fallbackPlacements: ["bottom-start", "top-end", "bottom-end"],
              },
            },
          ],
        },
        maxWidth: "calc(100vw - 16px)",
      }}
      updateDelay={100}
    >
      <div
        aria-label="Column layout options"
        className="z-10 px-2.5 py-1 w-full inline-flex gap-0.5 flex-row justify-center items-center bg-content1 rounded-medium shadow-medium"
      >
        <MemoContentTypePicker options={blockOptions} />
        <MemoFontFamilyPicker
          value={states.currentFont || ""}
          onChange={commands.onSetFont}
        />
        <MemoFontSizePicker
          value={states.currentSize || ""}
          onChange={commands.onSetFontSize}
        />
        <Divider
          className="my-auto"
          orientation="vertical"
          style={{ height: "1.5rem" }}
        />
        <MemoButton
          icon="lucide:bold"
          isSelected={states.isBold}
          value="Bold"
          onClick={commands.onBold}
        />
        <MemoButton
          icon="lucide:italic"
          isSelected={states.isItalic}
          value="Italic"
          onClick={commands.onItalic}
        />
        <MemoButton
          icon="lucide:underline"
          isSelected={states.isUnderline}
          value="Underline"
          onClick={commands.onUnderline}
        />
        <MemoButton
          icon="lucide:strikethrough"
          isSelected={states.isStrike}
          value="Strike"
          onClick={commands.onStrike}
        />
        <MemoButton
          icon="lucide:code"
          isSelected={states.isCode}
          value="Code"
          onClick={commands.onCode}
        />
        <MemoButton
          icon="lucide:square-code"
          value="CodeBlock"
          onClick={commands.onCodeBlock}
        />
        <EditLinkPopover onSetLink={commands.onLink} />

        <MemoColorPicker
          color={states.currentColor}
          onChange={commands.onChangeColor}
          onClear={commands.onClearColor}
        />
        <MemoMoreOptionPopover editor={editor} />
      </div>
    </BubbleMenu>
  );
};
