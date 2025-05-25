import { memo } from "react";
import { BubbleMenu } from "@tiptap/react/menus";
import { Divider } from "@heroui/divider";

import { MenuProps } from "../types";
import PopoverFilterWrapper from "../../panels/ColorPicker/PopoverFilterWrapper";
import { LinkEditorPanel } from "../../panels/LinkEditorPanel";
import { ColorPicker } from "../../panels/ColorPicker/ColorPicker";

import { useTextmenuCommands } from "./hooks/useTextmenuCommands";
import { useTextmenuStates } from "./hooks/useTextmenuStates";
import { useTextmenuContentTypes } from "./hooks/useTextmenuContentTypes";
import TextMenuItem from "./components/TextMenuItem";
import { FontSizePicker } from "./components/FontSizePicker";
import { FontFamilyPicker } from "./components/FontFamilyPicker";
import { ContentTypePicker } from "./components/ContentTypePicker";

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
			<div
				aria-label="Column layout options"
				className="z-10 inline-flex w-full flex-row items-center justify-center gap-1 rounded-lg bg-content1 px-1.5 py-1 shadow-medium"
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
					className="mt-1 flex w-[200px] flex-col gap-2"
					icon="lucide:palette"
				>
					<MemoColorPicker
						color={states.currentColor}
						onChange={commands.onChangeColor}
						onClear={commands.onClearColor}
					/>
				</MemoPopoverWrapperPicker>

				<MemoPopoverWrapperPicker
					className="mt-1 flex w-[200px] flex-col gap-2"
					icon="fa6-solid:highlighter"
				>
					<MemoColorPicker
						color={states.currentHighlight}
						onChange={commands.onChangeHighlight}
						onClear={commands.onClearHighlight}
					/>
				</MemoPopoverWrapperPicker>

				<Divider className="mx-1 h-6" orientation="vertical" />

				<MemoPopoverWrapperPicker
					className="flex flex-row items-center"
					icon="fa6-solid:ellipsis-vertical"
				>
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
				</MemoPopoverWrapperPicker>
			</div>
		</BubbleMenu>
	);
};
