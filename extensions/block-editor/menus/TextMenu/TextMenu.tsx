import { useEffect, useState } from 'react'
import { MenuProps } from '../types'
import { useTextmenuCommands } from './hooks/useTextmenuCommands'
import { useTextmenuStates } from './hooks/useTextmenuStates'
import { useTextmenuContentTypes } from './hooks/useTextmenuContentTypes'
import { BubbleMenu } from '@tiptap/react/menus'

export const TextMenu = ({ editor }: MenuProps) => {
  const [selecting, setSelecting] = useState(false)
  const commands = useTextmenuCommands(editor)
  const states = useTextmenuStates(editor)
  const blockOptions = useTextmenuContentTypes(editor)

  useEffect(() => {
    const controller = new AbortController()
    let selectionTimeout: number

    const onSelectionChange = () => {
      setSelecting(true)

      if (selectionTimeout) {
        window.clearTimeout(selectionTimeout)
      }

      selectionTimeout = window.setTimeout(() => {
        setSelecting(false)
      }, 500)
    }

    editor.on('selectionUpdate', onSelectionChange)

    return () => {
      editor.off('selectionUpdate', onSelectionChange)
    }
  }, [editor])

  return (
    <BubbleMenu editor={editor} shouldShow={states.shouldShow}>
      asp
    </BubbleMenu>
  )
}
