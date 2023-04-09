import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPostFormOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setPostOpen: (state) => {
      state.isPostFormOpen = !state.isPostFormOpen;
    },
  },
});

export const { setPostOpen } = modalSlice.actions;

export default modalSlice.reducer;
