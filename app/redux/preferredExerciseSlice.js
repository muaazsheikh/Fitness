import { createSlice } from "@reduxjs/toolkit";

const preferredExerciseSlice = createSlice({
  name: "preferredExercise",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    preferredExerciseRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    preferredExerciseSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    preferredExerciseFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { preferredExerciseRequest, preferredExerciseSuccess, preferredExerciseFailure } =
preferredExerciseSlice.actions;
export default preferredExerciseSlice.reducer;
