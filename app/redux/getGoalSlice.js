import { createSlice } from "@reduxjs/toolkit";

const getGoalSlice = createSlice({
  name: "goal",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    goalRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    goalSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    goalFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { goalRequest, goalSuccess, goalFailure } = getGoalSlice.actions;
export default getGoalSlice.reducer;
