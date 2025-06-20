import { ChangeEvent, memo, useState } from 'react'
import { CircularProgress } from '@heroui/progress'
import { Button } from '@heroui/button'
import { Icon } from '@iconify/react'
import { Select, SelectItem } from '@heroui/select'
import { Chip } from '@heroui/chip'
import { Avatar } from '@heroui/avatar'

import {
  CategoryPayload,
  useGetQuery as useGetCategoriesQuery,
} from '@/feature/api/category-api'
import { useGetQuery as useGetTagsQuery } from '@/feature/api/tag-api'
import {
  ArticlePayload,
  useCreateMutation as useCreateArticleMutation,
} from '@/feature/api/article-api'
import { Input } from '@heroui/input'

export type EditorFooterProps = {
  characters: number
  words: number
  isOpen?: boolean
}

const EditorStats = ({ characters, words }: EditorFooterProps) => (
  <div className="flex flex-col justify-center pr-1 text-right">
    <div className="text-xs font-semibold ">
      {words} {words === 1 ? 'word' : 'words'}
    </div>
    <div className="text-xs font-semibold">
      {characters} {characters === 1 ? 'character' : 'characters'}
    </div>
  </div>
)
export const NotificationIcon = ({
  size,
  height,
  width,
  ...props
}: {
  size?: number
  height?: number
  width?: number
}) => {
  return (
    <svg
      fill="none"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M18.707 8.796c0 1.256.332 1.997 1.063 2.85.553.628.73 1.435.73 2.31 0 .874-.287 1.704-.863 2.378a4.537 4.537 0 01-2.9 1.413c-1.571.134-3.143.247-4.736.247-1.595 0-3.166-.068-4.737-.247a4.532 4.532 0 01-2.9-1.413 3.616 3.616 0 01-.864-2.378c0-.875.178-1.682.73-2.31.754-.854 1.064-1.594 1.064-2.85V8.37c0-1.682.42-2.781 1.283-3.858C7.861 2.942 9.919 2 11.956 2h.09c2.08 0 4.204.987 5.466 2.625.82 1.054 1.195 2.108 1.195 3.745v.426zM9.074 20.061c0-.504.462-.734.89-.833.5-.106 3.545-.106 4.045 0 .428.099.89.33.89.833-.025.48-.306.904-.695 1.174a3.635 3.635 0 01-1.713.731 3.795 3.795 0 01-1.008 0 3.618 3.618 0 01-1.714-.732c-.39-.269-.67-.694-.695-1.173z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  )
}
export const EditorFooter = memo(
  ({ isOpen, characters, words }: EditorFooterProps) => {
    const { data: categories, isLoading: isGetCategoriesQuery } =
      useGetCategoriesQuery()

    const { data: tags, isLoading: isGetTagsQuery } = useGetTagsQuery()

    const [createArticle, { isLoading: isCreateArticleLoading }] =
      useCreateArticleMutation()

    const [article, setArticle] = useState<ArticlePayload>({
      categories: [],
      thumbnailUrl: '',
      tags: [],
      summary: '',
      slug: '',
      content: '',
      title: '',
    })

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedIds = e.target.value.split(',')

      const selectedCategories = selectedIds
        .map((id) => categories?.find((c) => c.id === id))
        .filter((category): category is CategoryPayload => !!category)

      setArticle((prev) => ({
        ...prev,
        categories: selectedCategories,
      }))
    }

    const handleChange = ({
      target: { name, value },
    }: ChangeEvent<HTMLInputElement>) =>
      setArticle((pre) => ({
        ...pre,
        [name]: value,
      }))

    const handleCreateArticle = () => {
      console.log(article)
      createArticle(article)
    }

    return isOpen ? (
      <div className="flex flex-col w-full">
        <Select
          isLoading={isGetCategoriesQuery}
          classNames={{
            base: 'max-w-xs',
            trigger: 'min-h-12 py-2',
          }}
          onChange={handleCategoryChange}
          label="Select a category"
          selectionMode="multiple"
          labelPlacement="outside"
          items={categories}
          renderValue={(items) => (
            <div className="flex gap-2">
              {items.map((item) => (
                <Chip key={item.key}>{item.data?.name}</Chip>
              ))}
            </div>
          )}
        >
          {(category) => (
            <SelectItem key={category.id} textValue={category.name}>
              <div className="flex gap-2 items-center">
                <Avatar
                  alt={category.name}
                  className="flex-shrink-0"
                  size="sm"
                />
                <div className="flex flex-col">
                  <span className="text-small ">{category.name}</span>
                  <span className="text-tiny text-default-400  truncate ">
                    {category.description}
                  </span>
                </div>
              </div>
            </SelectItem>
          )}
        </Select>

        {tags?.map((tag, index) => <Chip key={index}>{tag.name}</Chip>)}

        <Input
          label="Title"
          value={article.title}
          onChange={handleChange}
          name="title"
          size="sm"
        />
        <Input
          size="sm"
          label="Summay"
          value={article.summary}
          onChange={handleChange}
          name="summary"
        />
        <Input
          size="sm"
          label="Slug"
          value={article.slug}
          onChange={handleChange}
          name="slug"
        />
        <div className="flex flex-row">
          <Button color="danger" variant="light">
            Close
          </Button>
          <Button color="primary" onPress={handleCreateArticle}>
            Action
          </Button>
        </div>
      </div>
    ) : (
      <div className="flex justify-between w-full items-center text-neutral-500 dark:text-neutral-400">
        <Button isIconOnly size="md" variant="light">
          <Icon
            icon="lucide:panel-left"
            width="24"
            height="24"
            className="text-neutral-500 dark:text-neutral-400"
          />
        </Button>
        <CircularProgress
          showValueLabel
          classNames={{
            base: 'flex flex-row-reverse',
          }}
          aria-label="editor-footer circular progress"
          label={<EditorStats characters={characters} words={words} />}
          maxValue={10000}
          value={characters}
        />
      </div>
    )
  }
)
