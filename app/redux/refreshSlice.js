import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shouldRefresh: false,
};

const refreshSlice = createSlice({
  name: "refresh",
  initialState,
  reducers: {
    triggerRefresh: (state) => {
      state.shouldRefresh = !state.shouldRefresh;
    },
  },
});

export const { triggerRefresh } = refreshSlice.actions;
export default refreshSlice.reducer;
