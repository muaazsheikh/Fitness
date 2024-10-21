import { createSlice } from "@reduxjs/toolkit";

const dietUpdateSlice = createSlice({
  name: "dietUpdate",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    dietUpdateRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    dietUpdateSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    dietUpdateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { dietUpdateRequest, dietUpdateSuccess, dietUpdateFailure } =
  dietUpdateSlice.actions;
export default dietUpdateSlice.reducer;
