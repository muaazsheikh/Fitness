import { createSlice } from "@reduxjs/toolkit";

const dietCreateSlice = createSlice({
  name: "dietCreate",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    dietRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    dietSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    dietFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { dietRequest, dietSuccess, dietFailure } =
  dietCreateSlice.actions;
export default dietCreateSlice.reducer;
