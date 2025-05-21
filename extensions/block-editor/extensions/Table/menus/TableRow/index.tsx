import { BubbleMenu as BaseBubbleMenu } from '@tiptap/react'
import React, { useCallback, JSX } from 'react'

import { isRowGripSelected } from './utils'

import * as PopoverMenu from '@/components/ui/PopoverMenu'
import { Toolbar } from '@/components/ui/Toolbar'
import { Icon } from '@/components/ui/Icon'
import { MenuProps, ShouldShowProps } from '@/components/menus/types'

export const TableRowMenu = React.memo(({ editor, appendTo }: MenuProps): JSX.Element => {
  const shouldShow = useCallback(
    ({ view, state, from }: ShouldShowProps) => {
      if (!state || !from) {
        return false
      }

      return isRowGripSelected({ editor, view, state, from })
    },
    [editor],
  )

  const onAddRowBefore = useCallback(() => {
    editor.chain().focus().addRowBefore().run()
  }, [editor])

  const onAddRowAfter = useCallback(() => {
    editor.chain().focus().addRowAfter().run()
  }, [editor])

  const onDeleteRow = useCallback(() => {
    editor.chain().focus().deleteRow().run()
  }, [editor])

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey="tableRowMenu"
      shouldShow={shouldShow}
      tippyOptions={{
        appendTo: () => {
          return appendTo?.current
        },
        placement: 'left',
        offset: [0, 15],
        popperOptions: {
          modifiers: [{ name: 'flip', enabled: false }],
        },
      }}
      updateDelay={0}
    >
      <Toolbar.Wrapper isVertical>
        <PopoverMenu.Item
          close={false}
          iconComponent={<Icon name="ArrowUpToLine" />}
          label="Add row before"
          onClick={onAddRowBefore}
        />
        <PopoverMenu.Item
          close={false}
          iconComponent={<Icon name="ArrowDownToLine" />}
          label="Add row after"
          onClick={onAddRowAfter}
        />
        <PopoverMenu.Item close={false} icon="Trash" label="Delete row" onClick={onDeleteRow} />
      </Toolbar.Wrapper>
    </BaseBubbleMenu>
  )
})

TableRowMenu.displayName = 'TableRowMenu'

export default TableRowMenu
