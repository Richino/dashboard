export type Id = string | number;

export type Column = {
	id: Id;
	title: string;
};

export type Task = {
	id: Id;
	columnId: Id;
	content: string;
	title: string;
	role: string;
	bgColor: string;
	textColor: string;
};
