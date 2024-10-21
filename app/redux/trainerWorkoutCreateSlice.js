import { createSlice } from "@reduxjs/toolkit";

const trainerWorkoutCreateSlice = createSlice({
  name: "trainerWorkoutCreate",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    trainerWorkoutCreateRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    trainerWorkoutCreateSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    trainerWorkoutCreateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  trainerWorkoutCreateRequest,
  trainerWorkoutCreateSuccess,
  trainerWorkoutCreateFailure,
} = trainerWorkoutCreateSlice.actions;
export default trainerWorkoutCreateSlice.reducer;
