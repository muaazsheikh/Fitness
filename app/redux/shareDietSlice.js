import { createSlice } from "@reduxjs/toolkit";

const shareDietSlice = createSlice({
  name: "shareDiet",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    shareDietRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    shareDietSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    shareDietFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { shareDietRequest, shareDietSuccess, shareDietFailure } =
shareDietSlice.actions;
export default shareDietSlice.reducer;
