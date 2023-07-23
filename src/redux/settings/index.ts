import { createSlice, PayloadAction } from "@reduxjs/toolkit";

if (typeof localStorage !== "undefined" && (typeof window !== "undefined" && window.localStorage.getItem("notifications") === null)) {
	const notifications = {
		messages: false,
		reminders: false,
		alerts: false,
		sounds: false,
	};

	if (typeof window !== "undefined") {
		window.localStorage.setItem("notifications", JSON.stringify(notifications));
	} else {
		console.error("window is not available. Notifications cannot be stored.");
	}
}
interface NotificationsObject {
	messages: boolean;
	reminders: boolean;
	alerts: boolean;
	sounds: boolean;
	[key: string]: boolean;
}

const notificationsString = typeof window !== "undefined" ? window.localStorage.getItem("notifications") : null;
let noti;

if (notificationsString !== null) {
	noti = JSON.parse(notificationsString) as NotificationsObject;
}
type InitialState = {
	value: {
		open: boolean;
		notifications: NotificationsObject;
	};
};

const initialState = {
	value: {
		open: false,
		notifications: {
			messages: noti?.messages,
			reminders: noti?.reminders,
			alerts: noti?.alerts,
			sounds: noti?.sounds,
		},
	},
} as InitialState;

export const settings = createSlice({
	name: "settings",
	initialState,
	reducers: {
		open: (state) => {
			state.value.open = true;
		},
		close: (state) => {
			state.value.open = false;
		},
		changeSettings(state, action: PayloadAction<string>) {
			state.value.notifications[action.payload] = !state.value.notifications[action.payload];
			try {
				// Store the updated notifications object in localStorage
				window.localStorage.setItem("notifications", JSON.stringify(state.value.notifications));
			} catch (error) {
				console.error("Error while updating localStorage:", error);
			}
		},
	},
});

export const { open, close, changeSettings } = settings.actions;
export default settings.reducer;
