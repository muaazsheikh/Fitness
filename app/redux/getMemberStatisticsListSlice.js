import { createSlice } from "@reduxjs/toolkit";

const getMemberStatisticsListSlice = createSlice({
  name: "statisticsList",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    statisticsListRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    statisticsListSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    statisticsListFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { statisticsListRequest, statisticsListSuccess, statisticsListFailure } =
  getMemberStatisticsListSlice.actions;
export default getMemberStatisticsListSlice.reducer;
