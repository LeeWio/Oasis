import { BubbleMenu } from "@tiptap/react/menus";
import { useEditorState } from "@tiptap/react";
import { useCallback } from "react";

import { ColumnLayout } from "../Columns";

import { MenuProps } from "@/extensions/block-editor/menus/types";

export const ColumnsMenu = ({ editor }: MenuProps) => {
  const shouldShow = useCallback(() => {
    return editor.isActive("columns");
  }, [editor]);

  const onColumnLeft = useCallback(() => {
    editor.chain().focus().setLayout(ColumnLayout.SidebarLeft).run();
  }, [editor]);

  const onColumnRight = useCallback(() => {
    editor.chain().focus().setLayout(ColumnLayout.SidebarRight).run();
  }, [editor]);

  const onColumnTwo = useCallback(() => {
    editor.chain().focus().setLayout(ColumnLayout.TwoColumn).run();
  }, [editor]);

  const { isColumnLeft, isColumnRight, isColumnTwo } = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isColumnLeft: ctx.editor.isActive("columns", {
          layout: ColumnLayout.SidebarLeft,
        }),
        isColumnRight: ctx.editor.isActive("columns", {
          layout: ColumnLayout.SidebarRight,
        }),
        isColumnTwo: ctx.editor.isActive("columns", {
          layout: ColumnLayout.TwoColumn,
        }),
      };
    },
  });

  return (
    <BubbleMenu editor={editor} options={{}} shouldShow={shouldShow}>
      adfskaslfjalskdjfalskfjlasdfjlasjflskdjfalksjfalksdjflkwjrlkjelqwjelqjel
    </BubbleMenu>
  );
};

export default ColumnsMenu;
