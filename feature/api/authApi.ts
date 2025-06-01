import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RootState } from "@/app/store";
import { AuthUser, setAuthUser } from "@/feature/auth/authSlice";
import { ResultResponse } from "@/types";
import { addToast } from "@heroui/toast";

/**
 * User Authentication Payload
 */
export type UserAuthPayload = {
  username?: string; // Username, optional for both registration and login (supports login with either email or username)
  email: string; // Email address, required for registration
  password: string; // Password, required for both registration and login
  confirmPassword?: string;
  bio?: string; // User's biography, optional for registration
  avatarUrl?: string; // User's avatar URL, optional for registration
  phoneNumber?: string; // Phone number, optional for registration
  dateOfBirth?: string; // Date of birth, in ISO8601 format (e.g., "1990-01-01")
};

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["Auth"],
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/auth",
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
    authenticateUser: builder.mutation<AuthUser, UserAuthPayload>({
      query: (credentials) => ({
        url: "/authenticate",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: ResultResponse<AuthUser>) => {
        if (response.status === 200) {
          // Ensure the response data is in the correct structure
          const { data } = response;

          if (!data || !data.authorization) {
            addToast({
              title: "Invalid authentication response data",
              color: "danger",
            });
            throw new Error("Invalid authentication response data");
          }

          return data;
        } else {
          addToast({
            title: response.message || "Authentication failed",
            color: "danger",
          });
          // Handle various error cases based on status code or message
          throw new Error(response.message || "Authentication failed");
        }
      },
      // Optional, for error response handling
      transformErrorResponse: (error) => {
        // Here you can transform the error response into a custom error format
        if (error.status === 400) {
          // Example: Handle bad request error and format message
          return {
            message: "Bad request: Invalid input data",
            status: error.status,
          };
        } else if (error.status === 401) {
          // Example: Handle unauthorized error
          return {
            message: "Unauthorized: Invalid credentials",
            status: error.status,
          };
        } else {
          // Default error response
          return {
            message: "An error occurred",
            status: error.status,
          };
        }
      },
      // Optimistic update or caching could be added here if needed
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          // wait for the query to be fulfilled and get the response data
          const { data } = await queryFulfilled;

          if (data && data.authorization) {
            // upon successful authentication, store the user information in the Redux state
            dispatch(setAuthUser(data)); // store the authenticated user details in the state
          } else {
            throw new Error("Invalid authentication response data");
          }
          // You can perform other actions here, such as redirecting to the user dashboard
          // router.push('/dashboard'); // Example: redirect to dashboard
        } catch (error) {
          // handle authentication failure
          addToast({
            title: "Authentication failed:" + error,
          });
          // you can process the error or display an error message here
        }
      },
    }),
    createAccount: builder.mutation<AuthUser, UserAuthPayload>({
      query: (credentials) => ({
        url: "", // Register API endpoint
        method: "POST",
        body: credentials, // User data required for registration
      }),
      transformResponse: (response: ResultResponse<AuthUser>) => {
        if (response.status === 200) {
          // Ensure the response data is in the correct structure
          const { data } = response;

          if (!data || !data.authorization) {
            addToast({
              title: "Invalid authentication response data",
              color: "danger",
            });
            throw new Error("Invalid authentication response data");
          }

          return data;
        } else {
          addToast({
            title: response.message || "Authentication failed",
            color: "danger",
          });
          // Handle various error cases based on status code or message
          throw new Error(response.message || "Authentication failed");
        }
      },
      transformErrorResponse: (error) => {
        if (error.status === 400) {
          // Handle bad request (e.g., invalid input data)
          return {
            message: "Bad request: Invalid input data",
            status: error.status,
          };
        } else if (error.status === 409) {
          // Handle conflict (e.g., user already exists)
          return {
            message: "Conflict: User already exists",
            status: error.status,
          };
        } else {
          // Default error message for other cases
          return {
            message: "An error occurred during registration",
            status: error.status,
          };
        }
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          // wait for the query to be fulfilled and get the response data
          const { data } = await queryFulfilled;

          if (data && data.authorization) {
            // upon successful authentication, store the user information in the Redux state
            dispatch(setAuthUser(data)); // store the authenticated user details in the state
          } else {
            throw new Error("Invalid authentication response data");
          }
          // You can perform other actions here, such as redirecting to the user dashboard
          // router.push('/dashboard'); // Example: redirect to dashboard
        } catch (error) {
          // handle authentication failure
          addToast({
            title: "Authentication failed:" + error,
          });
          // you can process the error or display an error message here
        }
      },
    }),
  }),
});

export const { useAuthenticateUserMutation, useCreateAccountMutation } =
  authApi;
