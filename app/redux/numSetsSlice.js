// numSetsSlice.js

import { createSlice } from "@reduxjs/toolkit";

const numSetsSlice = createSlice({
  name: "numSets",
  initialState: [],
  apiCallsStatus: [],

  reducers: {
    updateNumSetsArray(state, action) {
      const { index, numSets } = action.payload;
      state[index] = numSets;
    },
    resetNumSetsArray(state) {
      return [];
    },
    updateApiCallStatus(state, action) {
      const { index, success } = action.payload;
      state.apiCallsStatus[index] = { success };
    },
    resetApiCallStatus(state) {
      return [];
    },
  },
});

export const {
  updateNumSetsArray,
  resetNumSetsArray,
  updateApiCallStatus,
  resetApiCallStatus,
} = numSetsSlice.actions;

export default numSetsSlice.reducer;
