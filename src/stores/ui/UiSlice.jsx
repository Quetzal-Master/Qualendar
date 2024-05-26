import { createSlice } from "@reduxjs/toolkit";
import CalendarMode from '../../constants/CalendarMode';

const uiSlice = createSlice({
    name: "ui",
    initialState: {
        darkMode: false,
        calendarMode: CalendarMode.MODERN,
    },
    reducers: {
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode;
        },
        setCalendarMode: (state, action) => {
            state.calendarMode = action.payload;
        },
    },
});

export const { toggleDarkMode, setCalendarMode } = uiSlice.actions;
export default uiSlice.reducer;