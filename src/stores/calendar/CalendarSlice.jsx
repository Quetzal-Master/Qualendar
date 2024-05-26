import {createSlice} from "@reduxjs/toolkit";
import { initializeCalendarApi } from "@/common/GoogleCalendarFacade.jsx";

const currentDate = new Date();


const calendarSlice = createSlice({
	name: "calendar",
	initialState: {
		currentMonth: currentDate.getMonth(),
		currentDay: currentDate.getDate(),
		currentYear: currentDate.getFullYear(),
		events: [],
		dayEvents: [],
		selectedDay: null,
	},
	reducers: {
		setCurrentMonth: (state, action) => {
			const newMonth = action.payload;

			if (newMonth > 11) {
				state.currentYear += 1;
				state.currentMonth = 0;
			} else if (newMonth < 0) {
				state.currentYear -= 1;
				state.currentMonth = 11;
			} else {
				state.currentMonth = newMonth;
			}
		},
		setCurrentDay: (state, action) => {
			const newDay = action.payload;
			const maxDaysInMonth = new Date(state.currentYear, state.currentMonth + 1, 0).getDate();

			if (newDay < 1) {
				state.currentDay = 1;
			} else if (newDay > maxDaysInMonth) {
				state.currentDay = maxDaysInMonth;
			} else {
				state.currentDay = newDay;
			}
		},
		setCurrentYear: (state, action) => {
			const newYear = action.payload;

			if (newYear > state.currentYear) {
				state.currentYear = newYear;
			} else if (newYear < state.currentYear) {
				state.currentYear = newYear;
				state.currentMonth = 11;
				state.currentDay = 1;
			}
		},
		setEvents: (state, action) => {
			state.events = action.payload;
		},
		setSelectedDay: (state, action) => {
			state.selectedDay = action.payload;

			// Fetch day events when selectedDay is updated
			if (state.selectedDay !== null) {
				const apiCalendar = initializeCalendarApi();
				const date = new Date(state.currentYear, state.currentMonth, state.selectedDay + 1);
				const dateEnd = new Date(state.currentYear, state.currentMonth, state.selectedDay + 2);
				apiCalendar.listEvents({
					timeMin: date.toISOString(),
					timeMax: dateEnd.toISOString(),
					showDeleted: true,
					maxResults: 10,
					orderBy: "updated",
				})
					.then(({ result }) => {
						state.dayEvents = result.items;
					});
			}
		},
	},
});

export const { setCurrentMonth, setCurrentDay, setCurrentYear, setEvents, setSelectedDay } = calendarSlice.actions;
export default calendarSlice.reducer;
