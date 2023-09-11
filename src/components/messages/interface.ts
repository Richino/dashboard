type M = {
	fullName: string;
	message: string;
	timeSent: string;
	unread: number;
	avatar: string;
	status: string;
};

type D = {
	content: string;
	timeSent: string;
	unread: number;
	sender: string;
	id?: number;
};

export interface Dialogue {
	dialogue: D[];
}
export interface Message {
	messages: M[];
}

export interface Input {
	width: number | null;
}

export interface UserHeader {
	user: {
		fullName: string;
		avatar: string;
		status: string;
	};
}
