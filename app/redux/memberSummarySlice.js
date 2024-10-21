import { createSlice } from "@reduxjs/toolkit";

const memberSummarySlice = createSlice({
  name: "memberSummary",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    memberSummaryRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    memberSummarySuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    memberSummaryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  memberSummaryRequest,
  memberSummarySuccess,
  memberSummaryFailure,
} = memberSummarySlice.actions;
export default memberSummarySlice.reducer;
