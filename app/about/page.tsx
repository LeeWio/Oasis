'use client'

import { BlockEditor } from '@/components/block-editor'
import { FileUpload } from '@/components/file-upload'
import { useGetQuery, useLazyGetQuery } from '@/feature/api/tag-api'
import { useGetQuery as useGetCategoryQuery } from '@/feature/api/category-api'

import { Button } from '@heroui/button'
import { useDisclosure } from '@heroui/modal'

export default function AboutPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { data: tags, isLoading } = useGetQuery()

  const { data: categories, isLoading: isCategoryLoading } =
    useGetCategoryQuery()

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      {isLoading ? (
        <p>Loading tags...</p>
      ) : (
        <ul className="space-y-2">
          {tags?.map((tag, index) => (
            <li
              key={index}
              className="bg-gray-100 px-4 py-2 rounded dark:bg-gray-800"
            >
              {tag.name}-{tag.id}-{tag.createdAt}
            </li>
          ))}
        </ul>
      )}
      <Button onPress={onOpen}>Open Block Editor</Button>
      {isCategoryLoading ? (
        <p>Loading category</p>
      ) : (
        <ul className="space-y-2">
          {categories?.map((tag, index) => (
            <li
              key={index}
              className="bg-gray-100 px-4 py-2 rounded dark:bg-gray-800"
            >
              {tag.name}-{tag.id}-{tag.createdAt}
            </li>
          ))}
        </ul>
      )}

      <BlockEditor isModalOpen={isOpen} onModalOpenChange={onOpenChange} />
      <FileUpload onUpload={() => {}} />
    </div>
  )
}
