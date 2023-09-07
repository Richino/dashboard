"use client";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import nprogress from "nprogress";
import { BsPlus } from "react-icons/bs";
import React from "react";
import { useTheme } from "next-themes";
type TaskWithPosition = {
	from: string;
	to: string;
	task: string;
	pos: {
		start: number;
		span: number;
	};
};

type TaskWithoutPosition = {
	from: string;
	to: string;
	task: string;
};
type ScheduleDay = {
	day: string;
	tasks: Task[];
};

type Task = TaskWithPosition | TaskWithoutPosition;
interface TaskColor {
	[key: string]: [string, string]; // Array with two elements: text color and background color
}
const time = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];
const taskColors: TaskColor = {
	"Frontend Development": ["text-white", "bg-indigo-300"],
	"Backend Development": ["text-white", "bg-green-400"],
	"Code Review and Collaborative Problem-Solving": ["text-white", "bg-purple-400"],
	"Testing and Debugging": ["text-white", "bg-teal-400"],
	"Code Optimization and Refactoring": ["text-white", "bg-red-400"],
	"Research and Learning": ["text-white", "bg-yellow-400"],
	"Deployment and DevOps": ["text-white", "bg-blue-400"],
	"Team Stand-Up Meeting": ["text-white", "bg-pink-400"],
	"Client Communication / Project Management": ["text-white", "bg-orange-400"],
	"Break / Stand-Up Stretch": ["text-white", "bg-cyan-400"],
	"Lunch Break": ["text-white", "bg-rose-400"],
	"Short Break": ["text-white", "bg-amber-400"],
	"Team Meeting": ["text-white", "bg-emerald-400"],
};

const schedule = [
	{
		day: "Sunday",
		tasks: [],
	},
	// Day 1 (Monday)
	{
		day: "Monday",
		tasks: [
			{ time: "9:00 AM - 9:15 AM", task: "Team Stand-Up Meeting" },
			{ time: "9:15 AM - 10:30 AM", task: "Frontend Development" },
			{ time: "10:30 AM - 11:00 AM", task: "Break / Stand-Up Stretch" },
			{ time: "11:00 AM - 12:30 PM", task: "Backend Development" },
			{ time: "12:30 PM - 1:30 PM", task: "Lunch Break" },
			{ time: "1:30 PM - 3:00 PM", task: "Code Review and Collaborative Problem-Solving" },
			{ time: "3:00 PM - 3:30 PM", task: "Short Break" },
			{ time: "3:30 PM - 5:00 PM", task: "Client Communication / Project Management" },
		],
	},

	// Day 2 (Tuesday)
	{
		day: "Tuesday",
		tasks: [
			{ time: "9:00 AM - 10:30 AM", task: "Frontend Development" },
			{ time: "10:30 AM - 11:00 AM", task: "Break / Stand-Up Stretch" },
			{ time: "11:00 AM - 12:30 PM", task: "Backend Development" },
			{ time: "12:30 PM - 1:30 PM", task: "Lunch Break" },
			{ time: "1:30 PM - 3:00 PM", task: "Testing and Debugging" },
			{ time: "3:00 PM - 3:30 PM", task: "Short Break" },
			{ time: "3:30 PM - 5:00 PM", task: "Code Optimization and Refactoring" },
		],
	},

	// Day 3 (Wednesday)
	{
		day: "Wednesday",
		tasks: [
			{ time: "9:00 AM - 10:30 AM", task: "Frontend Development" },
			{ time: "10:30 AM - 11:00 AM", task: "Break / Stand-Up Stretch" },
			{ time: "11:00 AM - 12:30 PM", task: "Backend Development" },
			{ time: "12:30 PM - 1:30 PM", task: "Lunch Break" },
			{ time: "1:30 PM - 3:00 PM", task: "Code Review and Collaborative Problem-Solving" },
			{ time: "3:00 PM - 3:30 PM", task: "Short Break" },
			{ time: "3:30 PM - 5:00 PM", task: "Research and Learning" },
		],
	},

	// Day 4 (Thursday)
	{
		day: "Thursday",
		tasks: [
			{ time: "9:00 AM - 10:30 AM", task: "Frontend Development" },
			{ time: "10:30 AM - 11:00 AM", task: "Break / Stand-Up Stretch" },
			{ time: "11:00 AM - 12:30 PM", task: "Backend Development" },
			{ time: "12:30 PM - 1:30 PM", task: "Lunch Break" },
			{ time: "1:30 PM - 3:00 PM", task: "Testing and Debugging" },
			{ time: "3:00 PM - 3:30 PM", task: "Short Break" },
			{ time: "3:30 PM - 5:00 PM", task: "Code Optimization and Refactoring" },
		],
	},

	// Day 5 (Friday)
	{
		day: "Friday",
		tasks: [
			{ time: "9:00 AM - 10:30 AM", task: "Frontend Development" },
			{ time: "10:30 AM - 11:00 AM", task: "Break / Stand-Up Stretch" },
			{ time: "11:00 AM - 12:30 PM", task: "Backend Development" },
			{ time: "12:30 PM - 1:30 PM", task: "Lunch Break" },
			{ time: "1:30 PM - 3:00 PM", task: "Deployment and DevOps" },
			{ time: "3:00 PM - 3:30 PM", task: "Short Break" },
			{ time: "3:30 PM - 5:00 PM", task: "Team Meeting" },
		],
	},

	{
		day: "Saturday",
		tasks: [],
	},
];

function formatDate(date: any) {
	const options = { month: "long", day: "numeric" };
	return date.toLocaleString("en-US", options);
}

var currentDate = new Date();
const formattedDate = formatDate(currentDate);
var currentDayOfWeek = currentDate.getDay();
var firstDayOfWeek = new Date(currentDate);
firstDayOfWeek.setDate(currentDate.getDate() - currentDayOfWeek);

var next7Days: any = [];
const symbol = ["S", "M", "T", "W", "T", "F", "S"];
const symbol2 = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
for (var i = 0; i < 7; i++) {
	var nextDay = new Date(firstDayOfWeek);
	nextDay.setDate(firstDayOfWeek.getDate() + i);
	var dayNumber = nextDay.getDate();
	next7Days.push({ day: symbol[i], day2: symbol2[i], date: dayNumber });
}

const today = new Date();

const timeSlots = [
	"09:00 AM",
	"09:15 AM",
	"09:30 AM",
	"09:45 AM",
	"10:00 AM",
	"10:15 AM",
	"10:30 AM",
	"10:45 AM",
	"11:00 AM",
	"11:15 AM",
	"11:30 AM",
	"11:45 AM",
	"12:00 PM",
	"12:15 PM",
	"12:30 PM",
	"12:45 PM",
	"01:00 PM",
	"01:15 PM",
	"01:30 PM",
	"01:45 PM",
	"02:00 PM",
	"02:15 PM",
	"02:30 PM",
	"02:45 PM",
	"03:00 PM",
	"03:15 PM",
	"03:30 PM",
	"03:45 PM",
	"04:00 PM",
	"04:15 PM",
	"04:30 PM",
	"04:45 PM",
	"05:00 PM",
	"05:15 PM",
	"05:30 PM",
	"05:45 PM",
	"06:00 PM",
];

// Get the day, month, and year components from the Date object
const dayz = today.getDate();
const month = today.getMonth() + 1; // Months are zero-indexed, so we add 1 to get the correct month
const year = today.getFullYear();

export default function Page() {
	const [day, setDay] = useState(currentDayOfWeek);
	const [isFireFox, setIsFireFox] = useState(false);
	const [endDate, setEndDate] = useState("End date");
	const { theme } = useTheme();
	const [schedule2, setSchedule] = useState<any>([
		{
			day: "Sunday",
			tasks: [],
			bgColor: "#f5f5f5",
			darkBgColor: "#444",
			borderColor: "#ddd",
			darkBorderColor: "#777",
			lightFontColor: "#333",
			darkFontColor: "#f7f7f7",
		},
		{
			day: "Monday",
			tasks: [
				{
					from: "9:00 AM",
					to: "9:15 AM",
					task: "Stand-Up Meeting",
					start: 1,
					span: 1,
					bgColor: "#e3f2fd",
					darkBgColor: "#555",
					borderColor: "#b0d4ff",
					darkBorderColor: "#888",
					lightFontColor: "#333",
					darkFontColor: "#f7f7f7",
				},
				{
					from: "9:15 AM",
					to: "10:30 AM",
					task: "Frontend Dev",
					start: 2,
					span: 2,
					bgColor: "#fce4ec",
					darkBgColor: "#666",
					borderColor: "#ff80ab",
					darkBorderColor: "#999",
					lightFontColor: "#333",
					darkFontColor: "#f7f7f7",
				},
				{
					from: "10:30 AM",
					to: "11:00 AM",
					task: "Break",
					start: 7,
					span: 2,
					bgColor: "#fff9c4",
					darkBgColor: "#444",
					borderColor: "#ffd54f",
					darkBorderColor: "#777",
					lightFontColor: "#333",
					darkFontColor: "#f7f7f7",
				},
				{
					from: "11:00 AM",
					to: "12:30 PM",
					task: "Backend Dev",
					start: 9,
					span: 6,
					bgColor: "#c8e6c9",
					darkBgColor: "#555",
					borderColor: "#81c784",
					darkBorderColor: "#888",
					lightFontColor: "#333",
					darkFontColor: "#f7f7f7",
				},
				{
					from: "12:30 PM",
					to: "1:30 PM",
					task: "Lunch Break",
					start: 15,
					span: 4,
					bgColor: "#ffe0b2",
					darkBgColor: "#666",
					borderColor: "#ffb74d",
					darkBorderColor: "#999",
					lightFontColor: "#333",
					darkFontColor: "#f7f7f7",
				},
				{
					from: "1:30 PM",
					to: "3:00 PM",
					task: "Code Review",
					start: 19,
					span: 6,
					bgColor: "#ffccbc",
					darkBgColor: "#555",
					borderColor: "#ff8a65",
					darkBorderColor: "#888",
					lightFontColor: "#333",
					darkFontColor: "#f7f7f7",
				},
				{
					from: "3:00 PM",
					to: "3:30 PM",
					task: "Short Break",
					start: 25,
					span: 2,
					bgColor: "#e1bee7",
					darkBgColor: "#444",
					borderColor: "#ab47bc",
					darkBorderColor: "#777",
					lightFontColor: "#333",
					darkFontColor: "#f7f7f7",
				},
				{
					from: "3:30 PM",
					to: "5:00 PM",
					task: "Client Communication",
					start: 27,
					span: 6,
					bgColor: "#c5cae9",
					darkBgColor: "#555",
					borderColor: "#7986cb",
					darkBorderColor: "#888",
					lightFontColor: "#333",
					darkFontColor: "#f7f7f7",
				},
			],
		},
		{
			day: "Tuesday",
			tasks: [
				{
					from: "9:00 AM",
					to: "10:30 AM",
					task: "Backend Dev",
					start: 1,
					span: 6,
					bgColor: "#c8e6c9",
					darkBgColor: "#444",
					borderColor: "#81c784",
					darkBorderColor: "#777",
					lightFontColor: "#333",
					darkFontColor: "#f7f7f7",
				},
				{
					from: "10:30 AM",
					to: "11:00 AM",
					task: "Break",
					start: 7,
					span: 2,
					bgColor: "#fff9c4",
					darkBgColor: "#444",
					borderColor: "#ffd54f",
					darkBorderColor: "#777",
					lightFontColor: "#333",
					darkFontColor: "#f7f7f7",
				},
				{
					from: "11:00 AM",
					to: "12:30 PM",
					task: "Code Review",
					start: 9,
					span: 6,
					bgColor: "#ffccbc",
					darkBgColor: "#555",
					borderColor: "#ff8a65",
					darkBorderColor: "#888",
					lightFontColor: "#333",
					darkFontColor: "#f7f7f7",
				},
				{
					from: "12:30 PM",
					to: "1:30 PM",
					task: "Lunch Break",
					start: 15,
					span: 4,
					bgColor: "#ffe0b2",
					darkBgColor: "#666",
					borderColor: "#ffb74d",
					darkBorderColor: "#999",
					lightFontColor: "#333",
					darkFontColor: "#f7f7f7",
				},
				{
					from: "1:30 PM",
					to: "3:00 PM",
					task: "Testing",
					start: 19,
					span: 6,
					bgColor: "#d1c4e9",
					darkBgColor: "#666",
					borderColor: "#9575cd",
					darkBorderColor: "#999",
					lightFontColor: "#333",
					darkFontColor: "#f7f7f7",
				},
				{
					from: "3:00 PM",
					to: "3:30 PM",
					task: "Short Break",
					start: 25,
					span: 2,
					bgColor: "#e1bee7",
					darkBgColor: "#444",
					borderColor: "#ab47bc",
					darkBorderColor: "#777",
					lightFontColor: "#333",
					darkFontColor: "#f7f7f7",
				},
				{
					from: "3:30 PM",
					to: "5:00 PM",
					task: "Optimization",
					start: 27,
					span: 6,
					bgColor: "#b2dfdb",
					darkBgColor: "#555",
					borderColor: "#4db6ac",
					darkBorderColor: "#888",
					lightFontColor: "#333",
					darkFontColor: "#f7f7f7",
				},
			],
		},
		{
			day: "Wednesday",
			tasks: [
				{
					from: "9:00 AM",
					to: "10:30 AM",
					task: "Code Review",
					start: 1,
					span: 6,
					bgColor: "#ffccbc",
					darkBgColor: "#555",
					borderColor: "#ff8a65",
					darkBorderColor: "#888",
					lightFontColor: "#333",
					darkFontColor: "#f7f7f7",
				},
				{
					from: "10:30 AM",
					to: "11:00 AM",
					task: "Break",
					start: 7,
					span: 2,
					bgColor: "#fff9c4",
					darkBgColor: "#444",
					borderColor: "#ffd54f",
					darkBorderColor: "#777",
					lightFontColor: "#333",
					darkFontColor: "#f7f7f7",
				},
				{
					from: "11:00 AM",
					to: "12:30 PM",
					task: "Research",
					start: 9,
					span: 6,
					bgColor: "#f0f4c3",
					darkBgColor: "#666",
					borderColor: "#cddc39",
					darkBorderColor: "#999",
					lightFontColor: "#333",
					darkFontColor: "#f7f7f7",
				},
				{
					from: "12:30 PM",
					to: "1:30 PM",
					task: "Lunch Break",
					start: 15,
					span: 4,
					bgColor: "#ffe0b2",
					darkBgColor: "#666",
					borderColor: "#ffb74d",
					darkBorderColor: "#999",
					lightFontColor: "#333",
					darkFontColor: "#f7f7f7",
				},
				{
					from: "1:30 PM",
					to: "3:00 PM",
					task: "Frontend Dev",
					start: 19,
					span: 6,
					bgColor: "#fce4ec",
					darkBgColor: "#666",
					borderColor: "#ff80ab",
					darkBorderColor: "#999",
					lightFontColor: "#333",
					darkFontColor: "#f7f7f7",
				},
				{
					from: "3:00 PM",
					to: "3:30 PM",
					task: "Short Break",
					start: 25,
					span: 2,
					bgColor: "#e1bee7",
					darkBgColor: "#444",
					borderColor: "#ab47bc",
					darkBorderColor: "#777",
					lightFontColor: "#333",
					darkFontColor: "#f7f7f7",
				},
				{
					from: "3:30 PM",
					to: "5:00 PM",
					task: "Meeting",
					start: 27,
					span: 6,
					bgColor: "#c5cae9",
					darkBgColor: "#555",
					borderColor: "#7986cb",
					darkBorderColor: "#888",
					lightFontColor: "#333",
					darkFontColor: "#f7f7f7",
				},
			],
		},
		{
			day: "Thursday",
			tasks: [
				{
					from: "9:00 AM",
					to: "10:30 AM",
					task: "Testing",
					start: 1,
					span: 6,
					bgColor: "#d1c4e9",
					darkBgColor: "#666",
					borderColor: "#9575cd",
					darkBorderColor: "#999",
					lightFontColor: "#333",
					darkFontColor: "#f7f7f7",
				},
				{
					from: "10:30 AM",
					to: "11:00 AM",
					task: "Break",
					start: 7,
					span: 2,
					bgColor: "#fff9c4",
					darkBgColor: "#444",
					borderColor: "#ffd54f",
					darkBorderColor: "#777",
					lightFontColor: "#333",
					darkFontColor: "#f7f7f7",
				},
				{
					from: "11:00 AM",
					to: "12:30 PM",
					task: "Deployment",
					start: 9,
					span: 6,
					bgColor: "#b2dfdb",
					darkBgColor: "#555",
					borderColor: "#4db6ac",
					darkBorderColor: "#888",
					lightFontColor: "#333",
					darkFontColor: "#f7f7f7",
				},
				{
					from: "12:30 PM",
					to: "1:30 PM",
					task: "Lunch Break",
					start: 15,
					span: 4,
					bgColor: "#ffe0b2",
					darkBgColor: "#666",
					borderColor: "#ffb74d",
					darkBorderColor: "#999",
					lightFontColor: "#333",
					darkFontColor: "#f7f7f7",
				},
				{
					from: "1:30 PM",
					to: "3:00 PM",
					task: "Client Meeting",
					start: 19,
					span: 6,
					bgColor: "#c5cae9",
					darkBgColor: "#555",
					borderColor: "#7986cb",
					darkBorderColor: "#888",
					lightFontColor: "#333",
					darkFontColor: "#f7f7f7",
				},
				{
					from: "3:00 PM",
					to: "3:30 PM",
					task: "Short Break",
					start: 25,
					span: 2,
					bgColor: "#e1bee7",
					darkBgColor: "#444",
					borderColor: "#ab47bc",
					darkBorderColor: "#777",
					lightFontColor: "#333",
					darkFontColor: "#f7f7f7",
				},
				{
					from: "3:30 PM",
					to: "5:00 PM",
					task: "Documentation",
					start: 27,
					span: 6,
					bgColor: "#f0f4c3",
					darkBgColor: "#666",
					borderColor: "#cddc39",
					darkBorderColor: "#999",
					lightFontColor: "#333",
					darkFontColor: "#f7f7f7",
				},
			],
		},
		{
			day: "Friday",
			tasks: [
				{
					from: "9:00 AM",
					to: "10:30 AM",
					task: "Optimization",
					start: 1,
					span: 6,
					bgColor: "#b2dfdb",
					darkBgColor: "#555",
					borderColor: "#4db6ac",
					darkBorderColor: "#888",
					lightFontColor: "#333",
					darkFontColor: "#f7f7f7",
				},
				{
					from: "10:30 AM",
					to: "11:00 AM",
					task: "Break",
					start: 7,
					span: 2,
					bgColor: "#fff9c4",
					darkBgColor: "#444",
					borderColor: "#ffd54f",
					darkBorderColor: "#777",
					lightFontColor: "#333",
					darkFontColor: "#f7f7f7",
				},
				{
					from: "11:00 AM",
					to: "12:30 PM",
					task: "Meeting",
					start: 9,
					span: 6,
					bgColor: "#c5cae9",
					darkBgColor: "#555",
					borderColor: "#7986cb",
					darkBorderColor: "#888",
					lightFontColor: "#333",
					darkFontColor: "#f7f7f7",
				},
				{
					from: "12:30 PM",
					to: "1:30 PM",
					task: "Lunch Break",
					start: 15,
					span: 4,
					bgColor: "#ffe0b2",
					darkBgColor: "#666",
					borderColor: "#ffb74d",
					darkBorderColor: "#999",
					lightFontColor: "#333",
					darkFontColor: "#f7f7f7",
				},
				{
					from: "1:30 PM",
					to: "3:00 PM",
					task: "Code Review",
					start: 19,
					span: 6,
					bgColor: "#ffccbc",
					darkBgColor: "#555",
					borderColor: "#ff8a65",
					darkBorderColor: "#888",
					lightFontColor: "#333",
					darkFontColor: "#f7f7f7",
				},
				{
					from: "3:00 PM",
					to: "3:30 PM",
					task: "Short Break",
					start: 25,
					span: 2,
					bgColor: "#e1bee7",
					darkBgColor: "#444",
					borderColor: "#ab47bc",
					darkBorderColor: "#777",
					lightFontColor: "#333",
					darkFontColor: "#f7f7f7",
				},
				{
					from: "3:30 PM",
					to: "5:00 PM",
					task: "Research",
					start: 27,
					span: 6,
					bgColor: "#f0f4c3",
					darkBgColor: "#666",
					borderColor: "#cddc39",
					darkBorderColor: "#999",
					lightFontColor: "#333",
					darkFontColor: "#f7f7f7",
				},
			],
		},
		{
			day: "Saturday",
			tasks: [],
			bgColor: "#f5f5f5",
			darkBgColor: "#444",
			borderColor: "#ddd",
			darkBorderColor: "#777",
			lightFontColor: "#333",
			darkFontColor: "#f7f7f7",
		},
	]);

	const path = usePathname();
	const [modal, setModal] = useState<boolean>(false);
	const [cell, setCell] = useState({
		row: 0,
		col: 0,
		date: "",
	});
	const [title, setTitle] = useState("");
	const [slots, openTimeSlots] = useState(false);
	const [error, setError] = useState({
		message: "",
		error: false,
	});
	const modalRef = useRef<HTMLDivElement>(null);
	const modalRef2 = useRef<HTMLDivElement>(null);

	useEffect(() => {
		nprogress.done();
	}, [path]);

	const handleTitleChange = (event: any) => {
		setTitle(event.target.value);
		setError({
			...error,
			message: "",
			error: false,
		});
	};

	const handleAddTask = (row: number, col: number) => {
		const columnTasks = schedule2[col].tasks;

		const to = timeSlots.indexOf(endDate);
		if (to === -1) {
			setError({
				...error,
				message: "Please set a time",
				error: true,
			});
			return;
		}

		let span = to - row;

		for (let i = 0; i < 3; i++) {
			const findExist = row + i + 1;
			const exist = columnTasks.find((task: any) => task.start === findExist);

			if (exist) {
				if (exist.start - to === 1 || row - exist.start - exist.span === 1) {
					span = exist.start - to + 1;
				} else {
					setError({
						...error,
						message: "Time cannot overlap existing time",
						error: true,
					});
					return;
				}
			}
		}

		const task = {
			from: timeSlots[row],
			to: timeSlots[to],
			task: title,
			start: row + 1,
			span,
		};

		setSchedule((prevSchedule: any) => {
			const updatedSchedule = [...prevSchedule];
			updatedSchedule[col].tasks.push(task);
			return updatedSchedule;
		});
		setError({
			...error,
			message: "",
			error: false,
		});
		setModal(false);
	};

	const openModal = (row: number, col: number) => {
		setCell({ ...cell, row, col, date: timeSlots[row] });
		setModal(true);
	};

	const closeModal = () => {
		setEndDate("End date");
		setError({
			...error,
			message: "",
			error: false,
		});
		setModal(false);
	};

	useEffect(() => {
		if (typeof navigator !== undefined && navigator.userAgent.indexOf("Firefox") != -1) setIsFireFox(true);
	}, [schedule2]);

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (modalRef.current && modalRef.current == (e.target as Node)) setModal(false);
			if (modalRef2.current && modalRef2.current == (e.target as Node)) openTimeSlots(false);
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<main className="h-[calc(100svh-55px)] flex-col place-items-center  overflow-hidden dark:bg-neutral-900 dark:text-neutral-50 laptop-sm:grid">
			{modal && (
				<div ref={modalRef} className="fixed left-0 top-0 z-50 grid laptop-sm:h-screen h-[100svh] w-screen place-items-center bg-black/40 ">
					<div className="laptop-sm:aspect-square laptop-sm:w-[30%] rounded-md bg-white dark:bg-neutral-950 laptop-sm:h-auto h-full w-full laptop-sm:shadow-lg">
						<div className="w-auto border-b border-neutral-100 p-5 text-lg font-semibold dark:border-neutral-800">Add Event</div>
						<div className=" flex  laptop-sm:h-full h-[calc(100svh-69px)] flex-col justify-between gap-5 overflow-y-auto p-5">
							<div className="flex flex-col gap-5">
								<input
									type="text"
									placeholder="Title"
									className="rounded-md border bg-transparent p-5 outline-none dark:border-neutral-800"
									value={title}
									onChange={handleTitleChange}
								/>
								<textarea placeholder="Description" className="rounded-md border bg-transparent p-5 outline-none dark:border-neutral-800"></textarea>
								<div className="flex justify-between  gap-5">
									<div className="w-full rounded-md border p-5 hover:cursor-pointer dark:border-neutral-800">{cell.date}</div>
									<div className="w-full rounded-md border p-5 hover:cursor-pointer dark:border-neutral-800" onClick={() => openTimeSlots(true)}>
										{endDate}
									</div>
								</div>
							</div>
							<div className=" w-full ">
								<div className=" flex justify-end gap-5">
									<button className="rounded-md border border-blue-700 p-2 text-blue-700 dark:text-white" onClick={closeModal}>
										Cancel
									</button>
									<button className="rounded-md bg-blue-700 p-2 px-5 text-white" onClick={() => handleAddTask(cell.row, cell.col)}>
										Add
									</button>
								</div>
								{error && <div className="grid place-items-center text-red-500">{error.message}</div>}
							</div>
						</div>
					</div>
				</div>
			)}
			{slots && (
				<div ref={modalRef2} className="fixed left-0 top-0 z-[60] grid h-screen w-screen place-items-center bg-black/40 ">
					<div className="aspect-[5/7] h-[60%]  overflow-hidden rounded-md bg-white dark:bg-neutral-900">
						<div className="h-full overflow-y-auto">
							{timeSlots.map((key: string, index: number) => {
								if (cell.row < index)
									return (
										<div
											className="grid place-items-center border-b p-5 hover:cursor-pointer dark:border-neutral-800"
											onClick={() => {
												setEndDate(key);
												openTimeSlots(false);
											}}>
											{key}
										</div>
									);
							})}
						</div>
					</div>
				</div>
			)}
			<div className="h-full bg-white hover:cursor-pointer dark:border-neutral-800 dark:bg-neutral-950 laptop-sm:aspect-video laptop-sm:h-auto laptop-sm:w-[85%] laptop-sm:border">
				<div className="flex justify-between border-b  bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950 laptop-sm:dark:bg-neutral-950">
					<div className="text-2xl font-semibold ">Today {formattedDate}</div>
					<button className="hidden rounded-md bg-blue-700 px-5 py-2 text-white laptop-sm:block">Add Event</button>
				</div>
				<div className="border-b   bg-white  p-5 px-5 py-2 dark:border-neutral-800 dark:bg-neutral-950 laptop-sm:dark:bg-neutral-950">
					<span>{`${month}/${dayz}/${year}`}</span>
				</div>
				<div
					className="flex justify-between overflow-hidden border-b border-neutral-200 py-5 dark:border-neutral-800 laptop-sm:grid laptop-sm:grid-cols-8 laptop-sm:py-0"
					style={{ gridTemplateColumns: "110px repeat(7, 1fr) 7px" }}>
					<div className="h-full w-10 hover:cursor-pointer "></div>
					{next7Days.map((key: any, index: number) => (
						<div
							key={index}
							className=" flex flex-col items-center gap-3 border-neutral-200 bg-transparent laptop-sm:gap-0 laptop-sm:border-l laptop-sm:bg-neutral-50 dark:laptop-sm:border-neutral-800 dark:laptop-sm:bg-neutral-900">
							<div className="flex h-10 w-10 items-center justify-center laptop-sm:hidden">{key.day}</div>
							<div className="hidden h-10  items-center justify-center text-xl laptop-sm:flex">{key.day2}</div>
							<button
								className={`${
									index === day && "rounded-full bg-blue-700 hover:cursor-pointer dark:text-white laptop-sm:bg-transparent"
								} flex h-10 w-10 items-center justify-center hover:cursor-pointer laptop-sm:hover:cursor-default `}
								onClick={() => setDay(index)}>
								{key.date}
							</button>
						</div>
					))}
					<div className="hover h-full w-10 bg-neutral-50 hover:cursor-pointer dark:bg-neutral-900"></div>
				</div>
				<div className="relative h-[calc(100%-(+133px+37px+21px))] overflow-y-auto ">
					<div
						className="hidden  w-full hover:cursor-pointer dark:text-white  laptop-sm:grid"
						style={{ gridTemplateColumns: `111px repeat(7, 1fr)  ${isFireFox ? "6px" : ""}` }}>
						<div className="flex flex-col">
							{time.map((timeKey: string, timeIndex: number) => (
								<div key={timeIndex} className={`flex   border-r border-neutral-200 dark:border-neutral-800 ${timeIndex < 8 && "border-b"}`}>
									<div className={`h-[319px] w-full min-w-[110px] max-w-[110px] p-5 hover:cursor-pointer`}>{timeKey}</div>
								</div>
							))}
						</div>

						{Array.from({ length: 7 }).map((_, col: number) => {
							const columnTasks = schedule2[col].tasks;
							const columnDivs = [];

							for (let row = 0; row < 36; row++) {
								const task = columnTasks.find((task: any) => task.start === row + 1);

								if (task) {
									const span = task.span || 1;
									columnDivs.push(
										<div
											key={row}
											style={{ gridRow: `span ${span} / span ${span}` }}
											className={`h-full truncate hover:cursor-pointer ${
												row < 35 && "border-b"
											} p-2 line-clamp-1 hover:cursor-pointer hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-900`}>
											<div
												style={{
													backgroundColor: theme === "light" ? task.bgColor : task.darkBgColor,
													border: `1px solid ${theme === "light" ? task.borderColor : task.darkBorderColor}`,
													color: theme === "light" ? task.lightFontColor : task.darkFontColor,
												}}
												className={`h-full rounded-md px-2  py-1 hover:cursor-pointer `}>
												<p className="truncate font-semibold">{task.task}</p>
												<p className="truncate text-xs">{`${task.from} - ${task.to}`}</p>
											</div>
										</div>
									);

									row += span - 1;
								} else {
									columnDivs.push(
										<div
											key={row}
											onClick={() => openModal(row, col)}
											className={`${row + 1} ${
												row < 35 && "border-b"
											} h-full truncate p-2  line-clamp-1 hover:cursor-pointer  hover:bg-neutral-200 dark:border-neutral-800 dark:hover:bg-neutral-900`}>
											<div className={`h-full rounded-md px-2 py-1 hover:cursor-pointer `}></div>
										</div>
									);
								}
							}

							return (
								<div id={`day-${col + 1}`} className="grid grid-rows-layout border-r dark:border-neutral-800" key={col}>
									{columnDivs}
								</div>
							);
						})}
					</div>

					<div
						className={`fixed mx-10  flex h-full items-center border-l p-5 hover:cursor-pointer dark:border-neutral-800 ${
							schedule[day].tasks.length === 0 && "hidden"
						} laptop-sm:hidden`}></div>
					<div className={`h-[72px] ${schedule[day].tasks.length === 0 && "hidden"} laptop-sm:hidden`}></div>
					{schedule[day].tasks.length === 0 ? (
						<div className=" grid h-full place-items-center text-neutral-500 line-clamp-2 hover:cursor-pointer dark:text-neutral-400 laptop-sm:hidden">
							No schedule for today
						</div>
					) : (
						schedule[day].tasks.map((key: any, index: number) => (
							<div key={index} className="relative mx-10  flex  p-5 pt-0 dark:border-neutral-800 laptop-sm:hidden">
								<div>
									<div>{key.time}</div>
									<div className="text-xs text-neutral-500 line-clamp-2 dark:text-neutral-400">{key.task}</div>
								</div>
								<div className={`absolute left-[-3.6px] top-[7px] h-2  w-2 rounded-full hover:cursor-pointer ${taskColors[key.task]}`}></div>
							</div>
						))
					)}
					<div className={`h-[72px] ${schedule[day].tasks.length === 0 && "hidden"} laptop-sm:hidden`}></div>
					<button className="msg fixed bottom-5 right-5  rounded-full bg-blue-700 p-4 text-white  hover:cursor-pointer laptop-sm:hidden" onClick={() => setModal(true)}>
						<BsPlus size={25} />
					</button>
				</div>
			</div>
		</main>
	);
}
