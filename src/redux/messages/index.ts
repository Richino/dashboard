import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
	value: {
		open: boolean;
	};
};

const initialState = {
	value: {
		open: false,
	},
} as InitialState;

export const navbar = createSlice({
	name: "message",
	initialState,
	reducers: {
		open: (state) => {
			state.value.open = true;
		},
		close: (state) => {
			state.value.open = false;
		},
	},
});

export const { open, close } = navbar.actions;
export default navbar.reducer;
