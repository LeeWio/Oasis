'use client'

import React, { memo, useCallback } from 'react'
import { v4 as uuid } from 'uuid'
import { sticky } from 'tippy.js'
import { BubbleMenu as BaseBubbleMenu, useEditorState } from '@tiptap/react'

import { getRenderContainer } from '@/lib/utils'
import { ColumnLayout } from '@/extensions/MultiColumn'
import TextMenuItem from '@/components/menus/TextMenu/components/TextMenuItem'
import { MenuProps } from '@/components/menus/types'

export const MemoButton = memo(TextMenuItem)

export const ColumnsMenu = ({ editor, appendTo }: MenuProps) => {
  const getReferenceClientRect = useCallback(() => {
    const renderContainer = getRenderContainer(editor, 'columns')

    return renderContainer?.getBoundingClientRect() || new DOMRect(-1000, -1000, 0, 0)
  }, [editor])

  const shouldShow = useCallback(() => editor.isEditable && editor.isActive('columns'), [editor])

  const changeLayout = useCallback(
    (layout: ColumnLayout) => {
      editor.chain().focus().setLayout(layout).run()
    },
    [editor],
  )

  const { isColumnLeft, isColumnRight, isColumnTwo } = useEditorState({
    editor,
    selector: ctx => ({
      isColumnLeft: ctx.editor.isActive('columns', { layout: ColumnLayout.SidebarLeft }),
      isColumnRight: ctx.editor.isActive('columns', { layout: ColumnLayout.SidebarRight }),
      isColumnTwo: ctx.editor.isActive('columns', { layout: ColumnLayout.TwoColumn }),
    }),
  })

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey={`columnsMenu-${uuid()}`}
      shouldShow={shouldShow}
      tippyOptions={{
        offset: [0, 8],
        popperOptions: {
          modifiers: [{ name: 'flip', enabled: false }],
        },
        getReferenceClientRect,
        appendTo: () => appendTo?.current,
        plugins: [sticky],
        sticky: 'popper',
      }}
      updateDelay={10}
    >
      <div
        aria-label="Column layout options"
        className="z-10 px-2.5 py-1 w-full inline-flex gap-0.5 flex-row justify-center items-center bg-content1 rounded-medium shadow-medium"
      >
        <MemoButton
          aria-label="Sidebar left"
          icon="lucide:align-horizontal-distribute-start"
          isSelected={isColumnLeft}
          value="Sidebar left"
          onClick={() => changeLayout(ColumnLayout.SidebarLeft)}
        />
        <MemoButton
          aria-label="Two columns"
          icon="lucide:align-horizontal-distribute-center"
          isSelected={isColumnTwo}
          value="Two columns"
          onClick={() => changeLayout(ColumnLayout.TwoColumn)}
        />
        <MemoButton
          aria-label="Sidebar right"
          icon="lucide:align-horizontal-distribute-end"
          isSelected={isColumnRight}
          value="Sidebar right"
          onClick={() => changeLayout(ColumnLayout.SidebarRight)}
        />
      </div>
    </BaseBubbleMenu>
  )
}
