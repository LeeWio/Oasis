'use client'

import { addToast } from '@heroui/toast'
import { Button } from '@heroui/button'

import { useAppDispatch } from '@/hooks/store'
import {
  resetToastConfig,
  setColor,
  setToastPlacement,
} from '@/feature/util/toastSlice'
import { useGetQuery } from '@/feature/api/article-api'

export default function BlogPage() {
  const { data } = useGetQuery()

  return (
    <>
      {data && (
        <div>
          {data.map((article, index) => (
            <div key={index}>{article.title}</div>
          ))}
        </div>
      )}
    </>
  )
}
