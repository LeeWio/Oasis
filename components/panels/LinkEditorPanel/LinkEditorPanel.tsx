import { Input } from '@nextui-org/input'
import React, { useCallback, useMemo, useState } from 'react'
import { Button } from '@nextui-org/button'
import { Switch } from '@nextui-org/switch'

export type LinkEditorPanelProps = {
  initialUrl?: string
  initialOpenInNewTab?: boolean
  onSetLink: (url: string, openInNewTab?: boolean) => void
}

export const useLinkEditorState = ({ initialUrl, initialOpenInNewTab, onSetLink }: LinkEditorPanelProps) => {
  const [url, setUrl] = useState(initialUrl || '')
  const [openInNewTab, setOpenInNewTab] = useState(initialOpenInNewTab || false)

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value)
  }, [])

  const isValidUrl = useMemo(() => /^(\S+):(\/\/)?\S+$/.test(url), [url])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (isValidUrl) {
        onSetLink(url, openInNewTab)
      }
    },
    [url, isValidUrl, openInNewTab, onSetLink],
  )

  return {
    url,
    setUrl,
    openInNewTab,
    setOpenInNewTab,
    onChange,
    handleSubmit,
    isValidUrl,
  }
}

export const LinkEditorPanel = ({ onSetLink, initialOpenInNewTab, initialUrl }: LinkEditorPanelProps) => {
  const state = useLinkEditorState({ onSetLink, initialOpenInNewTab, initialUrl })

  return (
    <div className={'flex flex-col justify-center items-start px-1 py-2 w-full'}>
      <form className="flex flex-row items-center justify-center mb-2 gap-2" onSubmit={state.handleSubmit}>
        <Input
          isClearable
          placeholder="Enter URL"
          radius={'sm'}
          size={'sm'}
          type="url"
          value={state.url}
          onChange={state.onChange}
          onClear={() => state.setUrl('')}
        />
        <Button isDisabled={!state.isValidUrl} radius={'sm'} size={'sm'} type={'submit'}>
          Set Link
        </Button>
      </form>
      <Switch color="primary" isSelected={state.openInNewTab} size="sm" onValueChange={state.setOpenInNewTab}>
        Open in new tab
      </Switch>
    </div>
  )
}
