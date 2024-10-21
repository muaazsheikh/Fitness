import { createSlice } from "@reduxjs/toolkit";

const memberWorkoutCreateSlice = createSlice({
  name: "memberWorkoutCreate",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    memberWorkoutCreateRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    memberWorkoutCreateSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    memberWorkoutCreateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  memberWorkoutCreateRequest,
  memberWorkoutCreateSuccess,
  memberWorkoutCreateFailure,
} = memberWorkoutCreateSlice.actions;
export default memberWorkoutCreateSlice.reducer;
