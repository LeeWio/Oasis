import { Select, SelectItem } from '@heroui/select'
import { NodeViewContent, NodeViewProps, NodeViewWrapper } from '@tiptap/react'
import { useState, useCallback } from 'react'
import { useCodeBlock } from '../use-code-block'

export const CodeBlockComponent = ({
  updateAttributes,
  node,
  extension,
}: NodeViewProps) => {
  const { color, variant, size, radius } = node.attrs

  const { getCodeBlockProps } = useCodeBlock({
    color,
    variant,
    size,
    radius,
    // className: 'p-4',
  })

  const languages = extension.options.lowlight.listLanguages()

  const [value, setValue] = useState(node.attrs.language ?? 'auto')

  const handleSelectionChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newValue = e.target.value
      setValue(newValue)
      updateAttributes({ language: newValue })
    },
    [updateAttributes]
  )

  return (
    <NodeViewWrapper className="relative">
      <Select
        className="max-w-28 absolute right-2 top-3"
        size="sm"
        selectedKeys={[value]}
        onChange={handleSelectionChange}
        contentEditable={false}
      >
        <SelectItem key={'auto'}>auto</SelectItem>
        {languages.map((lang: string) => (
          <SelectItem key={lang}>{lang}</SelectItem>
        ))}
      </Select>
      <NodeViewContent {...getCodeBlockProps()} />
    </NodeViewWrapper>
  )
}
