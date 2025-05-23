import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import { Switch } from '@heroui/switch'
import { Icon } from '@iconify/react'
import { useCallback, useMemo, useState } from 'react'

export type LinkEditorPanelProps = {
  initialUrl?: string
  initialOpenInNewTab?: boolean
  onSetLink: (url: string, openInNewTab?: boolean) => void
}

export const useLinkEditorState = ({
  initialUrl,
  initialOpenInNewTab,
  onSetLink,
}: LinkEditorPanelProps) => {
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

export const LinkEditorPanel = ({
  onSetLink,
  initialOpenInNewTab,
  initialUrl,
}: LinkEditorPanelProps) => {
  const state = useLinkEditorState({ onSetLink, initialOpenInNewTab, initialUrl })

  return (
    <>
      <form onSubmit={state.handleSubmit} className="flex items-start gap-2">
        <Input
          startContent={<Icon icon="lucide:link" />}
          isClearable
          placeholder="Enter URL"
          radius="sm"
          size="sm"
          type="url"
          value={state.url}
          onChange={state.onChange}
          onClear={() => state.setUrl('')}
        />
        <Button isDisabled={!state.isValidUrl} radius="sm" size="sm" type="submit">
          Set Link
        </Button>
      </form>
      <Switch
        color="default"
        isSelected={state.openInNewTab}
        size="sm"
        onValueChange={state.setOpenInNewTab}
      >
        Open in new tab
      </Switch>
    </>
  )
}
