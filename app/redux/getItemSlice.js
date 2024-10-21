import { createSlice } from "@reduxjs/toolkit";

const getItemSlice = createSlice({
  name: "item",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    itemRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    itemSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    itemFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { itemRequest, itemSuccess, itemFailure } = getItemSlice.actions;
export default getItemSlice.reducer;
