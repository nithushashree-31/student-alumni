import { createSlice } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    notificationList: [],
  },
  reducers: {
    setNotifications: (state, action) => {
      state.notificationList = action.payload.data;
    },
    updateNotification: (state, action) => {
      const { id } = action.payload;
      const notification = state.notificationList.find(
        (notif) => notif.id === id
      );
      if (notification) {
        notification.isRead = true;
      }
    },
    readAllNotifications: (state) => {
        state.notificationList = state.notificationList.map((notification) => ({...notification, isRead: true}));
    }
  },
});

export const { setNotifications, updateNotification, readAllNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;
