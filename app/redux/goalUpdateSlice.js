import { createSlice } from "@reduxjs/toolkit";

const goalUpdateSlice = createSlice({
  name: "goalUpdate",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    goalUpdateRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    goalUpdateSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    goalUpdateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { goalUpdateRequest, goalUpdateSuccess, goalUpdateFailure } =
  goalUpdateSlice.actions;
export default goalUpdateSlice.reducer;
