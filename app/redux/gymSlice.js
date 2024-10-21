import { createSlice } from "@reduxjs/toolkit";

const gymSlice = createSlice({
  name: "gym",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    selectRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    selectGymSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    selectgymFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { selectRequest, selectGymSuccess, selectgymFailure } =
  gymSlice.actions;
export default gymSlice.reducer;
