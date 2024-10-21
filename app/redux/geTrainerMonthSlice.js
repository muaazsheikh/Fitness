import { createSlice } from "@reduxjs/toolkit";

const geTrainerMonthSlice = createSlice({
  name: "trainerMonth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    trainerMonthRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    trainerMonthSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    trainerMonthFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { trainerMonthRequest, trainerMonthSuccess, trainerMonthFailure } =
  geTrainerMonthSlice.actions;
export default geTrainerMonthSlice.reducer;
