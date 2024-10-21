import { createSlice } from "@reduxjs/toolkit";

const getExerciseSlice = createSlice({
  name: "exercise",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    exerciseRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    exerciseSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    exerciseFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { exerciseRequest, exerciseSuccess, exerciseFailure } =
  getExerciseSlice.actions;
export default getExerciseSlice.reducer;
