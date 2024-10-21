import { createSlice } from "@reduxjs/toolkit";

const memberShareTrainerSlice = createSlice({
  name: "memberToShare",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    memberToShareRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    memberToShareSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    memberToShareFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  memberToShareRequest,
  memberToShareSuccess,
  memberToShareFailure,
} = memberShareTrainerSlice.actions;
export default memberShareTrainerSlice.reducer;
