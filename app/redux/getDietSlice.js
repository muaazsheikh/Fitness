import { createSlice } from "@reduxjs/toolkit";

const getDietSlice = createSlice({
  name: "dietList",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    dietListRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    dietListSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    dietListFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { dietListRequest, dietListSuccess, dietListFailure } =
  getDietSlice.actions;
export default getDietSlice.reducer;
