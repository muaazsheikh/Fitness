import { createSlice } from "@reduxjs/toolkit";

const updateBodySlice = createSlice({
  name: "bodyUpdate",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    bodyUpdateRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    bodyUpdateSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    bodyUpdateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { bodyUpdateRequest, bodyUpdateSuccess, bodyUpdateFailure } =
  updateBodySlice.actions;
export default updateBodySlice.reducer;
