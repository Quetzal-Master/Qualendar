import { createSlice } from "@reduxjs/toolkit";

const currentDate = new Date();

const calendarSlice = createSlice({
	name: "calendar",
	initialState: {
		currentMonth: currentDate.getMonth(),
		currentDay: currentDate.getDate(),
		currentYear: currentDate.getFullYear(),
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
			const maxDaysInMonth = new Date(
				state.currentYear,
				state.currentMonth + 1,
				0
			).getDate();

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
	},
});

export const { setCurrentMonth, setCurrentDay, setCurrentYear } =
	calendarSlice.actions;
export default calendarSlice.reducer;
