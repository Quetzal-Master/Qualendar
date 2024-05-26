import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./calendar/CalendarSlice";
import userReducer from "./user/UserSlice";
import uiReducer from "./ui/UiSlice";

const store = configureStore({
	reducer: {
		calendar: calendarReducer,
		user: userReducer,
		ui: uiReducer,
	},
});

export default store;
