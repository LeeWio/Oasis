import { Icon } from '@iconify/react'
import { Editor } from '@tiptap/react'

import { useTextmenuCommands } from '../hooks/useTextmenuCommands'
import { useTextmenuStates } from '../hooks/useTextmenuStates'

import { MemoButton } from '@/extensions/MultiColumn/menus'
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover'
import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/link'
import { Divider } from '@nextui-org/divider'

export const MoreOptionPopover = ({ editor }: { editor: Editor }) => {
  const commands = useTextmenuCommands(editor)
  const states = useTextmenuStates(editor)

  return (
    <Popover placement="top" radius="md">
      <PopoverTrigger>
        <Button disableRipple isIconOnly as={Link} color={'default'} size={'sm'} variant={'light'}>
          <Icon fontSize={20} icon={'lucide:ellipsis-vertical'} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-row gap-1">
        <MemoButton
          icon="lucide:subscript"
          isSelected={states.isSubscript}
          value="Subscript"
          onClick={commands.onSubscript}
        />
        <MemoButton
          icon="lucide:superscript"
          isSelected={states.isSuperscript}
          value="Superscript"
          onClick={commands.onSuperscript}
        />
        <Divider className="my-auto" orientation="vertical" style={{ height: '1.5rem' }} />
        <MemoButton
          icon="lucide:align-left"
          isSelected={states.isAlignLeft}
          value="Align Left"
          onClick={commands.onAlignLeft}
        />
        <MemoButton
          icon="lucide:align-center"
          isSelected={states.isAlignCenter}
          value="Align Center"
          onClick={commands.onAlignCenter}
        />
        <MemoButton
          icon="lucide:align-right"
          isSelected={states.isAlignRight}
          value="Align Right"
          onClick={commands.onAlignRight}
        />
        <MemoButton
          icon="lucide:align-justify"
          isSelected={states.isAlignJustify}
          value="Justify"
          onClick={commands.onAlignJustify}
        />
      </PopoverContent>
    </Popover>
  )
}
