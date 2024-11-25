import { BubbleMenu as BaseBubbleMenu } from '@tiptap/react'
import { MenuProps } from '@/components/menus/types'
import { useCallback } from 'react'


export const NextInputMenu = ({ editor }: MenuProps) => {

  const shouldShow = useCallback(() => {
    return editor.isEditable
  }, [editor])

  return (
    <BaseBubbleMenu
      className={"z-[999]"}
      shouldShow={shouldShow}
      options={{
        strategy: "fixed",
        placement: "top",
        autoPlacement:{
          crossAxis: true,
        },
      }}
      editor={editor}
      updateDelay={10}
    >
      123123123213123123123213123123asdasd123123123213123123123213123123asdasd123123123213123123123213123123asdasd123123123213123123123213123123asdasd123123123213123123123213123123asdasd
    </BaseBubbleMenu>
  )

}