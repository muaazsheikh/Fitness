import { createSlice } from "@reduxjs/toolkit";

const getTrainerSlice = createSlice({
  name: "trainerDetail",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    trainerDetailRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    trainerDetailSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    trainerDetailFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  trainerDetailRequest,
  trainerDetailSuccess,
  trainerDetailFailure,
} = getTrainerSlice.actions;
export default getTrainerSlice.reducer;
