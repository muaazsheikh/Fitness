import { createSlice } from "@reduxjs/toolkit";

const showDiscardModalSlice = createSlice({
  name: "discardModal",
  initialState: {
    showModal: false,
  },
  reducers: {
    showDiscardModal: (state, param) => {
      state.showModal = param?.payload;
      return state;
    },
  },
});

export const { showDiscardModal } = showDiscardModalSlice.actions;
export default showDiscardModalSlice.reducer;
