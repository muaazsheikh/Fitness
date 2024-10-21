// workoutSlice.js
import { createSlice } from "@reduxjs/toolkit";

const workoutSlice = createSlice({
  name: "work",
  initialState: {
    workList: null,
    selectedItems: [],
    selectedType: "All",
    selectedTime: "",
    selectedDate: null,
    sessionId: null,
    loading: false,
    memberName: null,
    error: null,
    workoutReload: false,
    dietVisible:false
  },
  reducers: {
    workoutExercise: (state) => {
      state.loading = true;
      state.error = null;
    },
    workoutDate: (state, action) => {
      state.loading = false;
      state.selectedDate = action.payload;
    },
    workoutTime: (state, action) => {
      state.loading = false;
      state.selectedTime = action.payload;
    },
    workoutList: (state, action) => {
      state.loading = false;
      state.workList = action.payload;
    },
    setSelectedWorkout: (state, action) => {
      state.selectedItems = action.payload;
    },
    setSelectedExercise: (state, action) => {
      state.selectedType = action.payload;
    },
    updateSessionID: (state, action) => {
      state.sessionId = action.payload;
    },
    updateName: (state, action) => {
      state.memberName = action.payload;
    },
    workoutLoading: (state, action) => {
      state.loading = false;
      state.workoutReload = action.payload;
    },
    showDiet: (state, action) => {
      state.loading = false;
      state.dietVisible = action.payload;
    },
  },
});

export const {
  workoutExercise,
  workoutDate,
  workoutTime,
  workoutList,
  setSelectedWorkout,
  setSelectedExercise,
  updateSessionID,
  updateName,
  workoutLoading,
  showDiet,
} = workoutSlice.actions;
export default workoutSlice.reducer;
