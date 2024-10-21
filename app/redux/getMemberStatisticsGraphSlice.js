import { createSlice } from "@reduxjs/toolkit";

const getMemberStatisticsGraphSlice = createSlice({
  name: "statisticsList",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    statisticsGraphRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    statisticsGraphSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    statisticsGraphFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { statisticsGraphRequest, statisticsGraphSuccess, statisticsGraphFailure } =
  getMemberStatisticsGraphSlice.actions;
export default getMemberStatisticsGraphSlice.reducer;
