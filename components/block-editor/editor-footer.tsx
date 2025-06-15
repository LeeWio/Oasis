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
import { ArticlePayload } from '@/feature/api/article-api'
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

export const EditorFooter = memo(
  ({ isOpen, characters, words }: EditorFooterProps) => {
    const { data: categories, isLoading: isGetCategoriesQuery } =
      useGetCategoriesQuery()

    const { data: tags, isLoading: isGetTagsQuery } = useGetTagsQuery()

    const [article, setArticle] = useState<ArticlePayload>({
      Categories: [],
      thumbnailUrl: '',
      tags: [],
      summary: '',
      slug: '',
      content: '',
      title: '',
    })

    const [category, setCategory] = useState<CategoryPayload>()

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedIds = e.target.value.split(',')

      const selectedCategories = selectedIds
        .map((id) => categories?.find((c) => c.id === id))
        .filter((category): category is CategoryPayload => !!category)

      setArticle((prev) => ({
        ...prev,
        Categories: selectedCategories,
      }))
    }

    const handleChange = ({
      target: { name, value },
    }: ChangeEvent<HTMLInputElement>) =>
      setArticle((pre) => ({
        ...pre,
        [name]: value,
      }))

    return isOpen ? (
      <div className="flex flex-col w-full">
        <Select
          isLoading={isGetCategoriesQuery}
          classNames={{
            base: 'max-w-xs',
            trigger: 'min-h-12 py-2',
          }}
          size="sm"
          onChange={handleCategoryChange}
          label="Select a category"
          selectionMode="multiple"
          labelPlacement="outside"
          items={categories}
          renderValue={(items) => (
            <div className="flex gap-2">
              {items.map((item) => (
                <Chip key={item.key} className="truncate">
                  {item.data?.name}
                </Chip>
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
                  <span className="text-tiny text-default-400 ">
                    {category.description}
                  </span>
                </div>
              </div>
            </SelectItem>
          )}
        </Select>
        {tags?.map((tag, index) => <div key={index}>{tag.name}</div>)}

        <Input
          label="Title"
          value={article.title}
          onChange={handleChange}
          name="title"
        />
        <Input
          label="Summay"
          value={article.summary}
          onChange={handleChange}
          name="summary"
        />
        <Input
          label="Slug"
          value={article.slug}
          onChange={handleChange}
          name="slug"
        />
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
