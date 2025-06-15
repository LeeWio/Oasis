import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CategoryPayload } from './category-api'
import { TagPayload } from './tag-api'
import { RootState } from '@/app/store'
import { ResultResponse } from '@/types'

export type ArticlePayload = {
  id?: string
  title: string
  content: string
  slug: string
  summary: string
  authorId?: string
  createAt?: string
  updateAt?: string
  tags?: TagPayload[]
  Categories?: CategoryPayload[]
  thumbnailUrl?: string
}

export const ArticleApi = createApi({
  reducerPath: 'article-api',
  tagTypes: ['Article'],
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/article',
    prepareHeaders: (headers, { getState }) => {
      const authorization = (getState() as RootState).auth.userDetail
        ?.authorization

      if (authorization) {
        headers.set('Authorization', `Bearer ${authorization}`)
      }

      return headers
    },
  }),
  endpoints: (build) => ({
    create: build.mutation<string, ArticlePayload>({
      query: (article) => ({
        url: ``,
        method: 'GET',
        body: article,
      }),
    }),
    get: build.query<ArticlePayload[], void>({
      query: () => ({
        url: ``,
        method: 'GET',
      }),
      transformResponse(response: ResultResponse<ArticlePayload[]>) {
        if (response.status === 200) {
          if (
            !response.data ||
            (Array.isArray(response.data) && response.data.length === 0)
          ) {
            throw new Error(
              'Empty data, please check your input or try again later.'
            )
          }

          return response.data
        }

        throw new Error(response.message || 'Request failed.')
      },
      transformErrorResponse(error) {
        switch (error.status) {
          case 400:
            return {
              message: 'Bad request: Please check your input.',
              status: 400,
            }
          case 401:
            return {
              message: 'Unauthorized: Please log in again.',
              status: 401,
            }
          case 500:
            return {
              message: 'Server error: Please try again later.',
              status: 500,
            }
          default:
            return {
              message: 'Unknown error occurred.',
              status: error.status || -1,
            }
        }
      },
    }),
  }),
})

export const { useGetQuery, useLazyGetQuery } = ArticleApi
