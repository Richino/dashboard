import { configureStore } from "@reduxjs/toolkit";
import navbar from "./navbar";
import messages from "./messages";
import settings from "./settings";

export const store = configureStore({
	reducer: {
		navbar,
		messages,
		settings,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
