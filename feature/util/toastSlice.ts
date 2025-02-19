import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ToastProviderProps = {
  placement?:
    | "bottom-right"
    | "bottom-left"
    | "bottom-center"
    | "top-right"
    | "top-left"
    | "top-center";
  maxVisibleToasts: number;
};
export const toastSlice = createSlice({
  name: "toast",
  initialState: {
    placement: "top-center",
    maxVisibleToasts: 3,
  } as ToastProviderProps,
  reducers: {
    setToastPlacement: (
      state,
      action: PayloadAction<ToastProviderProps["placement"]>,
    ) => {
      state.placement = action.payload;
    },
    setMaxVisibleToasts: (
      state,
      action: PayloadAction<ToastProviderProps["maxVisibleToasts"]>,
    ) => {
      state.maxVisibleToasts = action.payload;
    },
  },
});

export const { setToastPlacement, setMaxVisibleToasts } = toastSlice.actions;
export default toastSlice.reducer;
