import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ArticlePayload } from '../api/article-api'

interface ArticleState {
  draft: ArticlePayload | null
}

const initialState: ArticleState = {
  draft: null,
}

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    /**
     * Updates the current draft with new values.
     * Merges the existing draft with the new changes from the action payload.
     *
     * @param state - Current state of the slice
     * @param action - Action containing partial updates for the draft
     */
    updateDraft: (state, action: PayloadAction<ArticlePayload>) => {
      state.draft = { ...state.draft, ...action.payload }
    },
    /**
     * Clears the current draft.
     * Resets the draft to `null` to indicate no active draft.
     *
     * @param state - Current state of the slice
     */
    clearDraft: (state) => {
      state.draft = null
    },
  },
})

export const { updateDraft, clearDraft } = articleSlice.actions

export default articleSlice.reducer
