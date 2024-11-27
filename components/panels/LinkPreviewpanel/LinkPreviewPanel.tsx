import { Link } from '@nextui-org/link'
import React from 'react'

import { MemoButton } from '@/extensions/MultiColumn/menus'

export type LinkPreviewPanelProps = {
  url: string
  onEdit: () => void
  onClear: () => void
}
export const LinkPreviewPanel = ({ onClear, onEdit, url }: LinkPreviewPanelProps) => {
  return (
    <div className="z-10 px-2.5 py-1 w-full inline-flex gap-0.5 flex-row justify-center items-center bg-content1 rounded-medium shadow-medium">
      <Link
        className="text-sm underline text-foreground  overflow-x-hidden max-w-60"
        href={url}
        rel={'noopener noreferrer'}
        target={'_blank'}
      >
        {url}
      </Link>
      <MemoButton icon="lucide:pencil" value="Pencil" onClick={onEdit} />
      <MemoButton icon="lucide:trash-2" value="Pencil" onClick={onClear} />
    </div>
  )
}
