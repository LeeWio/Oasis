import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addToast } from "@heroui/toast";

import { RootState } from "@/app/store";
import { AuthUser, setAuthUser } from "@/feature/auth/authSlice";
import { ResultResponse } from "@/types";

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
  verificationCode?: string;
};

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["Auth"],
  baseQuery: fetchBaseQuery({
    baseUrl: `/auth`,
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
    requestVerificationCode: build.query<string, string>({
      query: (email) => ({
        url: `/requestVerificationCode/${email}`,
        method: "POST",
      }),
      transformResponse: (response: ResultResponse<string>) => {
        if (response.status === 200) {
          // Ensure the response data is in the correct structure
          const { data } = response;

          if (!data) {
            addToast({
              title: "Invalid data",
              timeout: 3000,
              shouldShowTimeoutProgess: true,
            });
          }

          return data;
        } else {
          addToast({
            title: response.message || "Authentication failed",
          });
          // Handle various error cases based on status code or message
        }
      },
      transformErrorResponse: (response: { status: string | number }) => {
        if (response.status === 400) {
          // Example: Handle bad request error and format message
          return {
            data: "Bad request: Invalid input data",
            status: response.status,
          };
        } else if (response.status === 401) {
          // Example: Handle unauthorized error
          return {
            data: "Unauthorized: Invalid credentials",
            status: response.status,
          };
        } else {
          // Default error response
          return {
            data: "An error occurred",
            status: response.status,
          };
        }
      },
    }),
    validateCaptcha: build.mutation<AuthUser, UserAuthPayload>({
      query: ({ email, verificationCode }) => ({
        url: `/validateCaptcha/${email}/${verificationCode}`,
        method: "POST",
      }),
      transformResponse: (response: ResultResponse<AuthUser>) => {
        if (response.status === 200) {
          // Ensure the response data is in the correct structure
          const { data } = response;

          if (!data || !data.authorization) {
            addToast({
              title: "Invalid authentication response data",
            });
          }

          return data;
        } else {
          addToast({
            title: response.message || "validate failed.",
          });
        }
      },
      transformErrorResponse: (response: { status: string | number }) => {
        if (response.status === 400) {
          return {
            data: "Bad request: Invalid input data",
            status: response.status,
          };
        } else if (response.status === 401) {
          return {
            data: "Unauthorized: Invalid credentials",
            status: response.status,
          };
        } else if (response.status === 404) {
          return {
            data: "Verification code not found",
            status: response.status,
          };
        } else {
          return { data: "An error occurred", status: response.status };
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
            addToast({
              color: "primary",
              title: "welcom back",
              description: data.username,
              timeout: 3000,
              shouldShowTimeoutProgess: true,
            });
          } else {
            addToast({
              color: "danger",
              title: "Invalid authentication response data",
              timeout: 3000,
              shouldShowTimeoutProgess: true,
            });
          }
          // You can perform other actions here, such as redirecting to the user dashboard
          // router.push('/dashboard'); // Example: redirect to dashboard
        } catch (error) {
          // handle authentication failure
          addToast({
            color: "danger",
            title: "Authentication failed: " + error,
            timeout: 3000,
            shouldShowTimeoutProgess: true,
          });
          // you can process the error or display an error message here
        }
      },
    }),
    authenticateUser: build.mutation<AuthUser, UserAuthPayload>({
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
              color: "danger",
              title: "Invalid authentication response data",
              timeout: 3000,
              shouldShowTimeoutProgess: true,
            });
          }

          return data;
        } else {
          addToast({
            color: "danger",
            title: response.message,
            timeout: 3000,
            shouldShowTimeoutProgess: true,
          });
        }
      },
      // Optional, for error response handling
      transformErrorResponse: (error) => {
        // Here you can transform the error response into a custom error format
        if (error.status === 400) {
          // Example: Handle bad request error and format message
          return {
            data: "Bad request: Invalid input data",
            status: error.status,
          };
        } else if (error.status === 401) {
          // Example: Handle unauthorized error
          return {
            data: "Unauthorized: Invalid credentials",
            status: error.status,
          };
        } else {
          // Default error response
          return {
            data: "An error occurred",
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
            addToast({
              title: "welcom back",
              description: data.username,
              timeout: 3000,
              shouldShowTimeoutProgess: true,
            });
          } else {
            addToast({
              color: "danger",
              title: "Invalid authentication response data",
              timeout: 3000,
              shouldShowTimeoutProgess: true,
            });
          }
          // You can perform other actions here, such as redirecting to the user dashboard
          // router.push('/dashboard'); // Example: redirect to dashboard
        } catch (error) {
          addToast({
            color: "danger",
            title: "Authentication failed:" + error,
            timeout: 3000,
            shouldShowTimeoutProgess: true,
          });
          // you can process the error or display an error message here
        }
      },
    }),
    createAccount: build.mutation<String, UserAuthPayload>({
      query: (credentials) => ({
        url: "", // Register API endpoint
        method: "POST",
        body: credentials, // User data required for registration
      }),
      transformResponse: (response: ResultResponse) => {
        if (response.status === 200) {
          // Registration successful response, no data needs to be returned
          return response.message; // Returning undefined or any indicator of success
        } else {
          addToast({
            color: "danger",
            title: response.message || "Registration failed",
            timeout: 3000,
            shouldShowTimeoutProgess: true,
          });
          // Handle failure response
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
          // Wait for the API request to be completed
          await queryFulfilled;

          // After successful registration, perform any subsequent actions like redirecting
          // If needed, you can update state here
          // dispatch(setAuthUser(data)); // If user information needs to be stored after registration

          // Example: Redirecting to the login page or welcome page after successful registration
          // router.push('/welcome'); // Example: redirect to a welcome page
        } catch (error) {
          addToast({
            color: "danger",
            title: "Registration failed: " + error,
            timeout: 3000,
            shouldShowTimeoutProgess: true,
          });
          // Optionally, you can display error messages to the user here
        }
      },
    }),
  }),
});

export const {
  useAuthenticateUserMutation,
  useCreateAccountMutation,
  useLazyRequestVerificationCodeQuery,
  useValidateCaptchaMutation,
} = authApi;
