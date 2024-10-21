import { createSlice } from "@reduxjs/toolkit";

const getProfileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    profileRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    profileSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    profileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { profileRequest, profileSuccess, profileFailure } =
  getProfileSlice.actions;
export default getProfileSlice.reducer;
