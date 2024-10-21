import { createSlice } from "@reduxjs/toolkit";

const preferredExerciseUpdateSlice = createSlice({
  name: "preferredUpdate",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    preferredExerciseUpdateRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    preferredExerciseUpdateSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    preferredExerciseUpdateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { preferredExerciseUpdateRequest, preferredExerciseUpdateSuccess, preferredExerciseUpdateFailure } =
preferredExerciseUpdateSlice.actions;
export default preferredExerciseUpdateSlice.reducer;
