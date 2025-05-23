import { Link } from '@heroui/link'
import { MemoButton } from '../../menus/TextMenu'
import { Divider } from '@heroui/divider'

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
      className="z-10 inline-flex w-full flex-row items-center justify-center gap-1 rounded-md bg-content1 px-1.5 py-0.5 shadow-medium"
    >
      <Link
        href={sanitizedLink}
        rel="noopener noreferrer"
        target="_blank"
        className="max-w-sm overflow-x-auto scrollbar-hide"
        underline="always"
        size="sm"
        color="foreground"
        isBlock
      >
        {url}
      </Link>
      <MemoButton icon="lucide:pencil" value="Pencil" onPress={onEdit} />
      <Divider orientation="vertical" className="mx-1 h-6" />
      <MemoButton icon="lucide:trash-2" value="Trash" onPress={onClear} />
    </div>
  )
}
