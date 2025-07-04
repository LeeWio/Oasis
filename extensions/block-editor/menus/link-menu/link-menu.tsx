import React, { useCallback, useState, JSX } from "react";
import { useEditorState } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";

import { MenuProps } from "../types";
import { LinkEditorPanel } from "../../panels/link-editor-panel";
import { LinkPreviewPanel } from "../../panels/link-preview-panel";

export const LinkMenu = ({ editor }: MenuProps): JSX.Element => {
  const [showEdit, setShowEdit] = useState(false);
  const { link, target } = useEditorState({
    editor,
    selector: (ctx) => {
      const attrs = ctx.editor.getAttributes("link");

      return { link: attrs.href, target: attrs.target };
    },
  });

  const shouldShow = useCallback(() => {
    const isActive = editor.isActive("link");

    return isActive;
  }, [editor]);

  const handleEdit = useCallback(() => {
    setShowEdit(true);
  }, []);

  const onSetLink = useCallback(
    (url: string, openInNewTab?: boolean) => {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url, target: openInNewTab ? "_blank" : "" })
        .run();
      setShowEdit(false);
    },
    [editor],
  );

  const onUnsetLink = useCallback(() => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    setShowEdit(false);

    return null;
  }, [editor]);

  return (
    <BubbleMenu editor={editor} pluginKey="linkMenu" shouldShow={shouldShow}>
      {showEdit ? (
        <div
          aria-label="link editor panel"
          className="z-10 inline-flex w-full flex-col items-start justify-center gap-1 rounded-md bg-content1 px-1.5 py-1 shadow-medium"
        >
          <LinkEditorPanel
            initialOpenInNewTab={target === "_blank"}
            initialUrl={link}
            onSetLink={onSetLink}
          />
        </div>
      ) : (
        <LinkPreviewPanel
          url={link}
          onClear={onUnsetLink}
          onEdit={handleEdit}
        />
      )}
    </BubbleMenu>
  );
};
