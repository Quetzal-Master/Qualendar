import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
		isLogged: false,
	},
	reducers: {
		toggleIsLogged: (state) => {
			state.isLogged = !state.isLogged;
		},
	},
});

export const { toggleIsLogged } = userSlice.actions;
export default userSlice.reducer;
