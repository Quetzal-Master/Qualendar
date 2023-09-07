import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./CalendarSlice";

const calendarStore = configureStore({
	reducer: {
		calendar: calendarReducer,
	},
});

export default calendarStore;
