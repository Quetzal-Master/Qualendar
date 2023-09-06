import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
	name: "event",
	initialState: [],
	reducers: {
		addEvent: (state, action) => {
			const newEvent = {};
		},
		selectEvent: () => {},
	},
});
