import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import notificationsReducer from './slices/notificationsSlice.js'

const store = configureStore({
    reducer: {
        auth: authReducer, 
        notifications: notificationsReducer
    },
});

export default store;