import { createSlice } from "@reduxjs/toolkit";

const getGraphDataSlice = createSlice({
  name: "graphList",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    graphListRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    graphListSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    graphListFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { graphListRequest, graphListSuccess, graphListFailure } =
  getGraphDataSlice.actions;
export default getGraphDataSlice.reducer;
