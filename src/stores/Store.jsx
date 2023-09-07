import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./calendar/CalendarSlice";
import userReducer from "./user/UserSlice";

const store = configureStore({
	reducer: {
		calendar: calendarReducer,
		user: userReducer,
	},
});

export default store;
