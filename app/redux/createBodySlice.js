import { createSlice } from "@reduxjs/toolkit";

const createBodySlice = createSlice({
  name: "bodyCreate",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    bodyCreateRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    bodyCreateSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    bodyCreateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { bodyCreateRequest, bodyCreateSuccess, bodyCreateFailure } =
  createBodySlice.actions;
export default createBodySlice.reducer;
