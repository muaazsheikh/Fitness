import { createSlice } from "@reduxjs/toolkit";

const geNotificationsListSlice = createSlice({
  name: "notificationsList",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    notificationsListRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    notificationsListSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    notificationsListFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  notificationsListRequest,
  notificationsListSuccess,
  notificationsListFailure,
} = geNotificationsListSlice.actions;
export default geNotificationsListSlice.reducer;
