import { createSlice } from "@reduxjs/toolkit";

const choiceWindowSlice = createSlice({
  name: "choiceWindow",
  initialState: {
    show: false,
  },
  reducers: {
    toggleChoiceWindow: (state, param) => {
      state.show = param?.payload.show;
      console.log(JSON.stringify(param?.payload.show))
      return state;
    },
  },
});

export const { toggleChoiceWindow } = choiceWindowSlice.actions;
export default choiceWindowSlice.reducer;
