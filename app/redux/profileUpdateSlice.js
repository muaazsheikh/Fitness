import { createSlice } from "@reduxjs/toolkit";

const profileUpdateSlice = createSlice({
  name: "profileUpdate",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    profileUpdateRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    profileUpdateSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    profileUpdateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  profileUpdateRequest,
  profileUpdateSuccess,
  profileUpdateFailure,
} = profileUpdateSlice.actions;
export default profileUpdateSlice.reducer;
