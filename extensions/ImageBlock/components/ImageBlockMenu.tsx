import { BubbleMenu as BaseBubbleMenu, useEditorState } from "@tiptap/react";
import React, { useCallback, useRef } from "react";
import { Instance, sticky } from "tippy.js";
import { v4 as uuid } from "uuid";

import { getRenderContainer } from "@/lib/utils";
import { MenuProps } from "@/components/menus/types";
import { MemoButton } from "@/extensions/MultiColumn/menus";
import { ImageBlockWidth } from "@/extensions/ImageBlock/components/ImageBlockWidth";

export const ImageBlockMenu = ({
  editor,
  appendTo,
}: MenuProps): JSX.Element => {
  const menuRef = useRef<HTMLDivElement>(null);
  const tippyInstance = useRef<Instance | null>(null);

  const getReferenceClientRect = useCallback(() => {
    const renderContainer = getRenderContainer(editor, "node-imageBlock");

    return (
      renderContainer?.getBoundingClientRect() ||
      new DOMRect(-1000, -1000, 0, 0)
    );
  }, [editor]);

  const shouldShow = useCallback(() => {
    return editor.isActive("imageBlock");
  }, [editor]);

  const onAlignImageLeft = useCallback(() => {
    editor
      .chain()
      .focus(undefined, { scrollIntoView: false })
      .setImageBlockAlign("left")
      .run();
  }, [editor]);

  const onAlignImageCenter = useCallback(() => {
    editor
      .chain()
      .focus(undefined, { scrollIntoView: false })
      .setImageBlockAlign("center")
      .run();
  }, [editor]);

  const onAlignImageRight = useCallback(() => {
    editor
      .chain()
      .focus(undefined, { scrollIntoView: false })
      .setImageBlockAlign("right")
      .run();
  }, [editor]);

  const onWidthChange = useCallback(
    (value: number) => {
      editor
        .chain()
        .focus(undefined, { scrollIntoView: false })
        .setImageBlockWidth(value)
        .run();
    },
    [editor],
  );
  const { isImageCenter, isImageLeft, isImageRight, width } = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isImageLeft: ctx.editor.isActive("imageBlock", { align: "left" }),
        isImageCenter: ctx.editor.isActive("imageBlock", { align: "center" }),
        isImageRight: ctx.editor.isActive("imageBlock", { align: "right" }),
        width: parseInt(ctx.editor.getAttributes("imageBlock")?.width || 0),
      };
    },
  });

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey={`imageBlockMenu-${uuid()}`}
      shouldShow={shouldShow}
      tippyOptions={{
        offset: [0, 8],
        popperOptions: {
          modifiers: [{ name: "flip", enabled: false }],
        },
        getReferenceClientRect,
        onCreate: (instance: Instance) => {
          tippyInstance.current = instance;
        },
        appendTo: () => {
          return appendTo?.current;
        },
        plugins: [sticky],
        sticky: "popper",
      }}
      updateDelay={0}
    >
      <div className="z-10 px-2.5 py-1 inline-flex gap-0.5 flex-row justify-center items-center bg-content1 rounded-medium shadow-medium">
        <MemoButton
          aria-label="Align image left"
          icon="lucide:align-horizontal-distribute-start"
          isSelected={isImageLeft}
          value="Align image left"
          onClick={onAlignImageLeft}
        />
        <MemoButton
          aria-label="Align image center"
          icon="lucide:align-horizontal-distribute-center"
          isSelected={isImageCenter}
          value="Align image center"
          onClick={onAlignImageCenter}
        />
        <MemoButton
          aria-label="Align image right"
          icon="lucide:align-horizontal-distribute-end"
          isSelected={isImageRight}
          value="Align image right"
          onClick={onAlignImageRight}
        />

        <ImageBlockWidth value={width} onChange={onWidthChange} />
      </div>
    </BaseBubbleMenu>
  );
};

export default ImageBlockMenu;
