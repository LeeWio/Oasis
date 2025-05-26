import { Link } from '@heroui/link'
import { Divider } from '@heroui/divider'

import { MemoButton } from '../../menus/TextMenu'

export type LinkPreviewPanelProps = {
  url: string
  onEdit: () => void
  onClear: () => void
}

export const LinkPreviewPanel = ({ onClear, onEdit, url }: LinkPreviewPanelProps) => {
  const sanitizedLink = url?.startsWith('javascript:') ? '' : url

  return (
    <div
      aria-label="link preview panel"
      className="z-10 inline-flex w-full flex-row items-center justify-center gap-1 rounded-md bg-content1 px-1.5 py-1 shadow-medium"
    >
      <Link
        isBlock
        className="max-w-sm overflow-x-auto scrollbar-hide"
        color="foreground"
        href={sanitizedLink}
        rel="noopener noreferrer"
        size="sm"
        target="_blank"
        underline="always"
      >
        {url}
      </Link>
      <MemoButton icon="lucide:pencil" value="Pencil" onPress={onEdit} />
      <Divider className="mx-1 h-6" orientation="vertical" />
      <MemoButton icon="lucide:trash-2" value="Trash" onPress={onClear} />
    </div>
  )
}
