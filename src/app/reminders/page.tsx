"use client";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import nprogress from "nprogress";
import { BsPlus } from "react-icons/bs";

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
const time = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];
const taskColors: any = {
	"Frontend Development": "bg-blue-700",
	"Backend Development": "bg-green-700",
	"Code Review and Collaborative Problem-Solving": "bg-purple-700",
	"Testing and Debugging": "bg-teal-700",
	"Code Optimization and Refactoring": "bg-red-700",
	"Research and Learning": "bg-yellow-700",
	"Deployment and DevOps": "bg-green-700",
	"Team Stand-Up Meeting": "bg-purple-700",
	"Client Communication / Project Management": "bg-red-700",
	"Break / Stand-Up Stretch": "bg-teal-700",
	"Lunch Break": "bg-pink-700",
	"Short Break": "bg-blue-700",
	"Team Meeting": "bg-amber-700",
};

const taskColorsDark: any = {
	"Frontend Development": "bg-blue-700",
	"Backend Development": "bg-green-700",
	"Code Review and Collaborative Problem-Solving": "bg-purple-700",
	"Testing and Debugging": "bg-teal-700",
	"Code Optimization and Refactoring": "bg-red-700",
	"Research and Learning": "bg-yellow-700",
	"Deployment and DevOps": "bg-green-700",
	"Team Stand-Up Meeting": "bg-purple-700",
	"Client Communication / Project Management": "bg-red-700",
	"Break / Stand-Up Stretch": "bg-teal-700",
	"Lunch Break": "bg-pink-700",
	"Short Break": "bg-amber-700",
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

const schedule2 = [
	{
		day: "Sunday",
		tasks: [],
	},
	{
		day: "Monday",
		tasks: [
			{ from: "9:00 AM", to: "9:15 AM", task: "Team Stand-Up Meeting", start: 1, span: 0 },
			{ from: "9:15 AM", to: "10:30 AM", task: "Frontend Development", start: 2, span: 5 },
			{ from: "10:30 AM", to: "11:00 AM", task: "Break / Stand-Up Stretch", start: 7, span: 2 },
			{ from: "11:00 AM", to: "12:30 PM", task: "Backend Development", start: 9, span: 6 },
			{ from: "12:30 PM", to: "1:30 PM", task: "Lunch Break", start: 15, span: 4 },
			{ from: "1:30 PM", to: "3:00 PM", task: "Code Review and Collaborative Problem-Solving", start: 19, span: 6 },
			{ from: "3:00 PM", to: "3:30 PM", task: "Short Break", start: 25, span: 2 },
			{ from: "3:30 PM", to: "5:00 PM", task: "Client Communication / Project Management", start: 27, span: 6 },
		],
	},
	{
		day: "Tuesday",
		tasks: [
			{ from: "9:00 AM", to: "10:30 AM", task: "Frontend Development", start: 1, span: 6 },
			{ from: "10:30 AM", to: "11:00 AM", task: "Break / Stand-Up Stretch", start: 7, span: 2 },
			{ from: "11:00 AM", to: "12:30 PM", task: "Backend Development", start: 9, span: 6 },
			{ from: "12:30 PM", to: "1:30 PM", task: "Lunch Break", start: 15, span: 4 },
			{ from: "1:30 PM", to: "3:00 PM", task: "Testing and Debugging", start: 19, span: 6 },
			{ from: "3:00 PM", to: "3:30 PM", task: "Short Break", start: 25, span: 2 },
			{ from: "3:30 PM", to: "5:00 PM", task: "Code Optimization and Refactoring", start: 27, span: 6 },
		],
	},
	{
		day: "Wednesday",
		tasks: [
			{ from: "9:00 AM", to: "10:30 AM", task: "Frontend Development", start: 1, span: 6 },
			{ from: "10:30 AM", to: "11:00 AM", task: "Break / Stand-Up Stretch", start: 7, span: 2 },
			{ from: "11:00 AM", to: "12:30 PM", task: "Backend Development", start: 9, span: 6 },
			{ from: "12:30 PM", to: "1:30 PM", task: "Lunch Break", start: 15, span: 4 },
			{ from: "1:30 PM", to: "3:00 PM", task: "Code Review and Collaborative Problem-Solving", start: 19, span: 6 },
			{ from: "3:00 PM", to: "3:30 PM", task: "Short Break", start: 25, span: 2 },
			{ from: "3:30 PM", to: "5:00 PM", task: "Research and Learning", start: 27, span: 6 },
		],
	},
	{
		day: "Thursday",
		tasks: [
			{ from: "9:00 AM", to: "10:30 AM", task: "Frontend Development", start: 1, span: 6 },
			{ from: "10:30 AM", to: "11:00 AM", task: "Break / Stand-Up Stretch", start: 7, span: 2 },
			{ from: "11:00 AM", to: "12:30 PM", task: "Backend Development", start: 9, span: 6 },
			{ from: "12:30 PM", to: "1:30 PM", task: "Lunch Break", start: 15, span: 4 },
			{ from: "1:30 PM", to: "3:00 PM", task: "Testing and Debugging", start: 19, span: 6 },
			{ from: "3:00 PM", to: "3:30 PM", task: "Short Break", start: 25, span: 2 },
			{ from: "3:30 PM", to: "5:00 PM", task: "Code Optimization and Refactoring", start: 27, span: 6 },
		],
	},
	{
		day: "Friday",
		tasks: [
			{ from: "9:00 AM", to: "10:30 AM", task: "Frontend Development", start: 1, span: 6 },
			{ from: "10:30 AM", to: "11:00 AM", task: "Break / Stand-Up Stretch", start: 7, span: 2 },
			{ from: "11:00 AM", to: "12:30 PM", task: "Backend Development", start: 9, span: 6 },
			{ from: "12:30 PM", to: "1:30 PM", task: "Lunch Break", start: 15, span: 4 },
			{ from: "1:30 PM", to: "3:00 PM", task: "Deployment and DevOps", start: 19, span: 6 },
			{ from: "3:00 PM", to: "3:30 PM", task: "Short Break", start: 25, span: 2 },
			{ from: "3:30 PM", to: "5:00 PM", task: "Team Meeting", start: 27, span: 6 },
		],
	},
	{
		day: "Saturday",
		tasks: [],
	},
];

const updatedSchedule = schedule2.map((day) => ({
	...day,
	tasks: day.tasks.map((task) => ({
		...task,
		start: task.start + 1,
	})),
}));

var currentDate = new Date();
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

// Get the day, month, and year components from the Date object
const dayz = today.getDate();
const month = today.getMonth() + 1; // Months are zero-indexed, so we add 1 to get the correct month
const year = today.getFullYear();

export default function Page() {
	const [day, setDay] = useState(currentDayOfWeek);
	const [isFireFox, setIsFireFox] = useState(false);
	const path = usePathname();
	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		nprogress.done();
	}, [path]);

	function getLength(col: number) {
		let sum = 37;
		for (let i = 0; i < schedule2[col].tasks.length; i++) {
			if (schedule2[col].tasks[i].span != 0) sum -= schedule2[col].tasks[i].span - 1;
		}
		return sum;
	}

	

	useEffect(() => {
		if (typeof navigator !== undefined && navigator.userAgent.indexOf("Firefox") != -1) setIsFireFox(true);
	}, []);

	return (
		<main className="h-[calc(100svh-55px)] flex-col overflow-hidden bg-white dark:bg-neutral-950 dark:text-neutral-50">
			<div className="border-b  border-dashed bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950 laptop-sm:dark:bg-neutral-950">
				<div className="text-2xl font-semibold ">Today</div>
			</div>
			<div className="border-b border-dashed bg-white  p-5 px-5 py-2 dark:border-neutral-800 dark:bg-neutral-950 laptop-sm:dark:bg-neutral-950">
				<span>{`${month}/${dayz}/${year}`}</span>
			</div>
			<div
				className="flex justify-between border-b py-5 dark:border-neutral-800 laptop-sm:grid laptop-sm:grid-cols-8 laptop-sm:py-0 "
				style={{ gridTemplateColumns: "110px repeat(7, 1fr) 7px" }}>
				<div className="h-full w-10 "></div>
				{next7Days.map((key: any, index: number) => (
					<div key={index} className=" flex flex-col items-center gap-3 laptop-sm:gap-0  laptop-sm:border-l dark:laptop-sm:border-neutral-800">
						<div className="flex h-10 w-10 items-center justify-center laptop-sm:hidden">{key.day}</div>
						<div className="hidden h-10  items-center justify-center text-xl laptop-sm:flex ">{key.day2}</div>
						<button
							className={`${
								index === day && "rounded-full bg-blue-700 text-white laptop-sm:bg-transparent"
							} flex h-10 w-10 items-center justify-center hover:cursor-pointer laptop-sm:hover:cursor-default `}
							onClick={() => setDay(index)}>
							{key.date}
						</button>
					</div>
				))}
			</div>
			<div className="relative h-[calc(100%-(+133px+37px+22px))] overflow-y-auto ">
				<div className="hidden  w-full text-white  laptop-sm:grid" style={{ gridTemplateColumns: `111px repeat(7, 1fr)  ${isFireFox ? "6px" : ""}` }}>
					<div className="flex flex-col">
						{time.map((timeKey: string, timeIndex: number) => (
							<div key={timeIndex} className="flex  border-b border-r dark:border-neutral-800">
								<div className={`h-[319px] w-full min-w-[110px] max-w-[110px] p-5`}>{timeKey}</div>
							</div>
						))}
					</div>
					{Array.from({ length: 7 }).map((_, col: number) => {
						return (
							<div ref={ref} id="myDiv" className="grid grid-rows-layout  border-r dark:border-neutral-800 ">
								{Array.from({ length: getLength(col) }).map((_, row) => {
									if (row < schedule2[col].tasks.length && schedule2[col].tasks.length !== 0) {
										let startRow = schedule2[col].tasks[row].start;
										let spanRows = schedule2[col].tasks[row].span;
										return (
											<div
												key={row}
												className={` h-full  truncate border-b p-2  line-clamp-1 hover:cursor-pointer hover:bg-neutral-200 dark:border-neutral-800 dark:hover:bg-neutral-900 `}
												style={{
													gridRow: `${startRow} / span ${spanRows}`,
												}}>
												<div
													className={`h-full rounded-md px-2 py-1 dark:${taskColorsDark[schedule2[col].tasks[row].task]} ${
														taskColors[schedule2[col].tasks[row].task]
													}`}>
													<p className=" truncate ">{schedule2[col].tasks[row].task}</p>
													<p className="truncate text-xs">{`${schedule2[col].tasks[row].from} - ${schedule2[col].tasks[row].to}`}</p>
												</div>
											</div>
										);
									} else {
										return (
											<div
												key={row}
												className={` h-full  truncate border-b p-2  line-clamp-1 hover:cursor-pointer hover:bg-neutral-200 dark:border-neutral-800 dark:hover:bg-neutral-900 `}>
												<div className={`h-full rounded-md px-2 py-1 `}></div>
											</div>
										);
									}
								})}
							</div>
						);
					})}
				</div>

				<div
					className={`fixed mx-10  flex h-full items-center border-l p-5 dark:border-neutral-800 ${schedule[day].tasks.length === 0 && "hidden"} laptop-sm:hidden`}></div>
				<div className={`h-[72px] ${schedule[day].tasks.length === 0 && "hidden"} laptop-sm:hidden`}></div>
				{schedule[day].tasks.length === 0 ? (
					<div className=" grid h-full place-items-center text-neutral-500 line-clamp-2 dark:text-neutral-400">No schedule for today</div>
				) : (
					schedule[day].tasks.map((key: any, index: number) => (
						<div key={index} className="relative mx-10  flex  p-5 pt-0 dark:border-neutral-800 laptop-sm:hidden">
							<div>
								<div>{key.time}</div>
								<div className="text-xs text-neutral-500 line-clamp-2 dark:text-neutral-400">{key.task}</div>
							</div>
							<div className={`absolute left-[-3.6px] top-[7px] h-2  w-2 rounded-full ${taskColors[key.task]}`}></div>
						</div>
					))
				)}
				<div className={`h-[72px] ${schedule[day].tasks.length === 0 && "hidden"} laptop-sm:hidden`}></div>
				<button className="msg fixed bottom-5 right-5  rounded-full bg-blue-700 p-4  text-white laptop-sm:hidden">
					<BsPlus size={25} />
				</button>
			</div>
		</main>
	);
}
