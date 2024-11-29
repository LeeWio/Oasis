import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the structure of a blog post.
// Fields like `uid`, `isTop`, and `cover` are optional.
export type PostModel = {
    uid?: string;         // Unique identifier for the post
    title: string;        // Title of the post
    content: string;      // Main content of the post
    summary: string;      // Summary or excerpt of the post
    isTop?: boolean;      // Flag indicating if the post is pinned to the top
    cover?: string;       // URL or path to the cover image
};

// Define the state structure for managing posts.
// Includes the draft, which may be partially filled during editing.
interface PostState {
    draft: Partial<PostModel> | null; // Current draft being edited, can be null or partial
}

// Initialize the state with no active draft.
const initialState: PostState = {
    draft: null,
};

// Create a Redux slice for managing post-related operations.
export const postSlice = createSlice({
    name: "post", // Name of the slice, used for action types
    initialState, // Initial state for the slice
    reducers: {
        /**
         * Updates the current draft with new values.
         * Merges the existing draft with the new changes from the action payload.
         *
         * @param state - Current state of the slice
         * @param action - Action containing partial updates for the draft
         */
        updateDraft: (state, action: PayloadAction<Partial<PostModel>>) => {
            state.draft = { ...state.draft, ...action.payload };
        },
        /**
         * Clears the current draft.
         * Resets the draft to `null` to indicate no active draft.
         *
         * @param state - Current state of the slice
         */
        clearDraft: (state) => {
            state.draft = null;
        },
    },
});

// Export the actions for use in dispatch calls.
export const { updateDraft, clearDraft } = postSlice.actions;

// Export the reducer to include it in the Redux store.
export default postSlice.reducer;
