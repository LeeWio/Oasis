import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/app/store";
import { ResultResponse } from "@/types";

export type CategoryPayload = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  articles?: null;
};

export const CategoryApi = createApi({
  reducerPath: "category-api",
  tagTypes: ["Category"],
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/category",
    prepareHeaders: (headers, { getState }) => {
      const authorization = (getState() as RootState).auth.userDetail
        ?.authorization;

      if (authorization) {
        headers.set("Authorization", `Bearer ${authorization}`);
      }

      return headers;
    },
  }),

  endpoints: (build) => ({
    create: build.mutation<string, CategoryPayload>({
      query: (category) => ({
        url: ``,
        method: "POST",
        body: category,
      }),
      transformResponse(response: ResultResponse<string>) {
        if (response.status === 200) {
          const { data } = response;

          if (!data || data.length <= 0) {
            throw new Error(response.message);
          }

          return data;
        } else {
          throw new Error(response.message);
        }
      },
    }),
    get: build.query<CategoryPayload[], void>({
      query: () => ({
        url: ``,
        method: "GET",
      }),
      transformResponse(response: ResultResponse<CategoryPayload[]>) {
        if (response.status === 200) {
          if (
            !response.data ||
            (Array.isArray(response.data) && response.data.length === 0)
          ) {
            throw new Error(
              "Empty data, please check your input or try again later.",
            );
          }
          return response.data;
        }
        throw new Error(response.message || "Request failed.");
      },
      transformErrorResponse(error) {
        switch (error.status) {
          case 400:
            return {
              message: "Bad request: Please check your input.",
              status: 400,
            };
          case 401:
            return {
              message: "Unauthorized: Please log in again.",
              status: 401,
            };
          case 500:
            return {
              message: "Server error: Please try again later.",
              status: 500,
            };
          default:
            return {
              message: "Unknown error occurred.",
              status: error.status || -1,
            };
        }
      },
    }),
  }),
});

export const { useCreateMutation, useLazyGetQuery, useGetQuery } = CategoryApi;
