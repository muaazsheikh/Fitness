import { createSlice } from "@reduxjs/toolkit";

const getBodySlice = createSlice({
  name: "getBody",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    getBodyRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getBodySuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    getBodyFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getBodyRequest, getBodySuccess, getBodyFailure } =
  getBodySlice.actions;
export default getBodySlice.reducer;
