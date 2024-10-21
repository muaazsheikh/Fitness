import { createSlice } from "@reduxjs/toolkit";

const memberDetailSlice = createSlice({
  name: "memberDetail",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    memberDetailRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    memberDetailSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    memberDetailFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { memberDetailRequest, memberDetailSuccess, memberDetailFailure } =
  memberDetailSlice.actions;
export default memberDetailSlice.reducer;
