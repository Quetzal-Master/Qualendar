import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
		isLogged:
			localStorage.getItem("googleAuthToken") === null ? false : true,
		gapiInitialized: false,
	},
	reducers: {
		toggleIsLogged: (state) => {
			state.isLogged = !state.isLogged;
		},
		gapiIsInitialized: (state) => {
			state.gapiInitialized = true;
		},
	},
});

export const { toggleIsLogged, gapiIsInitialized } = userSlice.actions;
export default userSlice.reducer;
