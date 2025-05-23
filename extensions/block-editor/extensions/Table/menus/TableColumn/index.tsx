import { BubbleMenu as BaseBubbleMenu } from "@tiptap/react";
import React, { useCallback, JSX } from "react";

import { isColumnGripSelected } from "./utils";

import * as PopoverMenu from "@/components/ui/PopoverMenu";
import { Icon } from "@/components/ui/Icon";
import { MenuProps, ShouldShowProps } from "@/components/menus/types";

export const TableColumnMenu = React.memo(
  ({ editor, appendTo }: MenuProps): JSX.Element => {
    const shouldShow = useCallback(
      ({ view, state, from }: ShouldShowProps) => {
        if (!state) {
          return false;
        }

        return isColumnGripSelected({ editor, view, state, from: from || 0 });
      },
      [editor],
    );

    const onAddColumnBefore = useCallback(() => {
      editor.chain().focus().addColumnBefore().run();
    }, [editor]);

    const onAddColumnAfter = useCallback(() => {
      editor.chain().focus().addColumnAfter().run();
    }, [editor]);

    const onDeleteColumn = useCallback(() => {
      editor.chain().focus().deleteColumn().run();
    }, [editor]);

    return (
      <BaseBubbleMenu
        editor={editor}
        pluginKey="tableColumnMenu"
        shouldShow={shouldShow}
        tippyOptions={{
          appendTo: () => {
            return appendTo?.current;
          },
          offset: [0, 15],
          popperOptions: {
            modifiers: [{ name: "flip", enabled: false }],
          },
        }}
        updateDelay={0}
      >
        <Toolbar.Wrapper isVertical>
          <PopoverMenu.Item
            close={false}
            iconComponent={<Icon name="ArrowLeftToLine" />}
            label="Add column before"
            onClick={onAddColumnBefore}
          />
          <PopoverMenu.Item
            close={false}
            iconComponent={<Icon name="ArrowRightToLine" />}
            label="Add column after"
            onClick={onAddColumnAfter}
          />
          <PopoverMenu.Item
            close={false}
            icon="Trash"
            label="Delete column"
            onClick={onDeleteColumn}
          />
        </Toolbar.Wrapper>
      </BaseBubbleMenu>
    );
  },
);

TableColumnMenu.displayName = "TableColumnMenu";

export default TableColumnMenu;
