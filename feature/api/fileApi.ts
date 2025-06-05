import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/app/store";
import { FileTypeEnum, ResultResponse } from "@/types";
import { addToast } from "@heroui/toast";

export interface UploadFileResult {
  id: string;
  originalName: string;
  fileUrl: string;
  contentType: string;
  fileSize: number;
  fileType: FileTypeEnum;
  createdAt: string;
  updatedAt?: string;
}

export const fileApi = createApi({
  reducerPath: "fileApi",
  tagTypes: ["File"],
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/file",
    prepareHeaders: (headers, { getState }) => {
      const authorization = (getState() as RootState).auth.userDetail
        ?.authorization;
      if (authorization) {
        headers.set("Authorization", `Bearer ${authorization}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    uploadFile: builder.mutation<
      UploadFileResult,
      { file: File; type?: FileTypeEnum }
    >({
      query: ({ file, type }) => {
        const formData = new FormData();
        formData.append("file", file);
        if (type) {
          formData.append("type", type);
        }

        return {
          url: "/upload",
          method: "POST",
          body: formData,
        };
      },
      transformResponse: (response: ResultResponse<UploadFileResult>) => {
        if (response.status === 200) {
          const { data } = response;
          if (!data || !data.fileUrl) {
            addToast({
              title: "Invalid upload response format",
              color: "danger",
            });
            throw new Error("Invalid upload response format");
          }
          return data;
        } else {
          addToast({
            title: response.message || "File upload failed",
            color: "danger",
          });
          throw new Error(response.message || "File upload failed");
        }
      },
      transformErrorResponse: (error) => {
        if (error.status === 413) {
          return {
            message: "The file is too large to upload",
            status: error.status,
          };
        } else if (error.status === 415) {
          return {
            message: "Unsupported file type",
            status: error.status,
          };
        } else {
          return {
            message: "An error occurred during upload",
            status: error.status,
          };
        }
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          addToast({
            title: "Upload successful",
            description: data.originalName,
            color: "success",
          });
        } catch (error) {
          addToast({
            title: "Upload failed: " + error,
            color: "danger",
          });
        }
      },
    }),
    uploadFiles: builder.mutation<
      UploadFileResult[],
      { files: File[]; type?: FileTypeEnum }
    >({
      query: ({ files, type }) => {
        const formData = new FormData();

        files.forEach((file) => {
          formData.append("files", file);
        });

        if (type) {
          formData.append("type", type);
        }

        return {
          url: "/uploads",
          method: "POST",
          body: formData,
        };
      },
      transformResponse: (response: ResultResponse<UploadFileResult[]>) => {
        if (response.status === 200) {
          const { data } = response;

          if (!Array.isArray(data) || !data) {
            addToast({
              title: "Invalid upload response format",
              color: "danger",
            });
            throw new Error("Expected array but got invalid data");
          }

          data.forEach((file) => {
            if (!file || !file.fileUrl) {
              addToast({
                title: "Invalid upload response format",
                color: "danger",
              });
              throw new Error("Invalid file data in response");
            }
          });

          return data;
        } else {
          addToast({
            title: response.message || "File upload failed",
            color: "danger",
          });
          throw new Error(response.message || "File upload failed");
        }
      },
      transformErrorResponse: (error) => {
        if (error.status === 413) {
          return {
            message: "The file is too large to upload",
            status: error.status,
          };
        } else if (error.status === 415) {
          return {
            message: "Unsupported file type",
            status: error.status,
          };
        } else {
          return {
            message: "An error occurred during upload",
            status: error.status,
          };
        }
      },
      async onQueryStarted(args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          const count = data?.length || 0;

          if (count > 0) {
            addToast({
              title: `${count} files uploaded successfully`,
              description: `e.g. ${data[0].originalName}`,
              color: "success",
            });
          }
        } catch (error) {
          addToast({
            title: "Batch upload failed",
            color: "danger",
          });
        }
      },
    }),
  }),
});

export const { useUploadFileMutation, useUploadFilesMutation } = fileApi;
