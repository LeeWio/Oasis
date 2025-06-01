import type { ToastProviderProps } from "@/types";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Initial configuration for the toast provider
const initialState: ToastProviderProps = {
  placement: "top-right", // Position where toasts appear
  maxVisibleToasts: 3, // Maximum number of toasts visible at once
  radius: "md", // Border radius for the toasts
  color: "default", // Theme color of the toast
  toastOffset: 0, // Vertical spacing between stacked toasts
  variant: "solid", // Toast style variant
  hideIcon: false, // Whether to hide the icon
  severity: "default", // Severity level for visual indication
  hideCloseButton: false, // Whether to hide the close (X) button
  shouldShowTimeoutProgress: false, // Whether to show a timeout progress bar
  timeout: 6000, // Auto-dismiss timeout duration in milliseconds
};

// Create a Redux slice for managing toast settings
export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    // Update the toast placement
    setToastPlacement: (
      state,
      action: PayloadAction<ToastProviderProps["placement"]>,
    ) => {
      state.placement = action.payload;
    },

    // Update the maximum number of visible toasts
    setMaxVisibleToasts: (
      state,
      action: PayloadAction<ToastProviderProps["maxVisibleToasts"]>,
    ) => {
      state.maxVisibleToasts = action.payload;
    },

    // Update the toast radius
    setRadius: (state, action: PayloadAction<ToastProviderProps["radius"]>) => {
      state.radius = action.payload;
    },

    // Update the toast color
    setColor: (state, action: PayloadAction<ToastProviderProps["color"]>) => {
      state.color = action.payload;
    },

    // Update the toast offset
    setToastOffset: (
      state,
      action: PayloadAction<ToastProviderProps["toastOffset"]>,
    ) => {
      state.toastOffset = action.payload;
    },

    // Update the toast variant (solid, bordered, flat)
    setVariant: (
      state,
      action: PayloadAction<ToastProviderProps["variant"]>,
    ) => {
      state.variant = action.payload;
    },

    // Update the toast timeout duration
    setTimeout: (
      state,
      action: PayloadAction<ToastProviderProps["timeout"]>,
    ) => {
      state.timeout = action.payload;
    },

    // Show or hide the toast icon
    setHideIcon: (
      state,
      action: PayloadAction<ToastProviderProps["hideIcon"]>,
    ) => {
      state.hideIcon = action.payload;
    },

    // Show or hide the close button
    setHideCloseButton: (
      state,
      action: PayloadAction<ToastProviderProps["hideCloseButton"]>,
    ) => {
      state.hideCloseButton = action.payload;
    },

    // Show or hide the timeout progress bar
    setShowTimeoutProgress: (
      state,
      action: PayloadAction<ToastProviderProps["shouldShowTimeoutProgress"]>,
    ) => {
      state.shouldShowTimeoutProgress = action.payload;
    },

    // Update the severity level
    setSeverity: (
      state,
      action: PayloadAction<ToastProviderProps["severity"]>,
    ) => {
      state.severity = action.payload;
    },

    // Bulk update any combination of toast config options
    updateToastConfig: (
      state,
      action: PayloadAction<Partial<ToastProviderProps>>,
    ) => {
      return { ...state, ...action.payload };
    },

    // Reset toast config to initial default state
    resetToastConfig: () => initialState,
  },
});

// Export specific actions for use in components
export const {
  setToastPlacement,
  setMaxVisibleToasts,
  setRadius,
  setColor,
  setToastOffset,
  setVariant,
  setTimeout,
  setHideIcon,
  setHideCloseButton,
  setShowTimeoutProgress,
  setSeverity,
  updateToastConfig,
  resetToastConfig,
} = toastSlice.actions;

// Export the reducer to be added to the Redux store
export default toastSlice.reducer;
