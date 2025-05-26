import type { PayloadAction } from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit'

/**
 * AuthUser represents the structure of a user's authentication details.
 */
export type AuthUser = {
  uid: string // Unique identifier for the user
  username: string // The username of the user
  email: string // The user's email address
  authorization: string // JWT token used for authentication
  avatarUrl?: string // The URL of the user's avatar (optional)
  phoneNumber?: string // The user's phone number (optional)
  dateOfBirth?: string // The user's date of birth (optional)
  bio?: string // The user's biography or personal description (optional)
  role?: string // The user's role (e.g., 'admin' or 'user') (optional)
}

/**
 * AuthState represents the structure of the authentication state, which includes the user's details.
 * userDetail will be null when the user is not authenticated.
 */
interface AuthState {
  userDetail: AuthUser | null
}

/**
 * Initial state for the auth slice, with userDetail set to null, indicating no authenticated user.
 */
const initialState: AuthState = {
  userDetail: null,
}

/**
 * The authSlice manages authentication-related state, including storing and removing user details
 * when logging in or out.
 *
 * - setAuthUser: Sets the authenticated user's details in the state upon successful login.
 * - removeAuthUser: Clears the user's details from the state, typically used when the user logs out.
 */
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * setAuthUser stores the provided user details in the state.
     * @param {AuthUser} action.payload - The authenticated user's details.
     */
    setAuthUser: (state, action: PayloadAction<AuthUser>) => {
      state.userDetail = action.payload
    },

    /**
     * removeAuthUser clears the user details from the state, effectively logging out the user.
     */
    removeAuthUser: state => {
      state.userDetail = null
    },
  },
})

export const { setAuthUser, removeAuthUser } = authSlice.actions

export default authSlice.reducer
