"use client";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid,  Legend, Area, AreaChart } from "recharts";

const data = [
	{
		year: 2020,
		data: [
			{
				name: "Jan",
				expense: 6200,
				revenue: 2100,
			},
			{
				name: "Feb",
				expense: 2900,
				revenue: 4900,
			},
			{
				name: "Mar",
				expense: 4100,
				revenue: 3700,
			},
			{
				name: "Apr",
				expense: 5200,
				revenue: 6600,
			},
			{
				name: "May",
				expense: 3400,
				revenue: 4600,
			},
			{
				name: "Jun",
				expense: 5700,
				revenue: 1800,
			},
			{
				name: "Jul",
				expense: 4000,
				revenue: 5200,
			},
			{
				name: "Aug",
				expense: 1800,
				revenue: 3300,
			},
			{
				name: "Sep",
				expense: 4600,
				revenue: 4000,
			},
			{
				name: "Oct",
				expense: 6300,
				revenue: 2800,
			},
			{
				name: "Nov",
				expense: 2500,
				revenue: 5400,
			},
			{
				name: "Dec",
				expense: 3800,
				revenue: 4100,
			},
		],
	},
	{
		year: 2021,
		data: [
			{
				name: "Jan",
				expense: 4000,
				revenue: 6000,
			},
			{
				name: "Feb",
				expense: 3000,
				revenue: 5000,
			},
			{
				name: "Mar",
				expense: 2000,
				revenue: 8000,
			},
			{
				name: "Apr",
				expense: 3500,
				revenue: 4500,
			},
			{
				name: "May",
				expense: 2500,
				revenue: 5500,
			},
			{
				name: "Jun",
				expense: 4000,
				revenue: 7000,
			},
			{
				name: "Jul",
				expense: 3200,
				revenue: 4000,
			},
			{
				name: "Aug",
				expense: 3800,
				revenue: 4500,
			},
			{
				name: "Sep",
				expense: 4200,
				revenue: 6000,
			},
			{
				name: "Oct",
				expense: 3700,
				revenue: 5500,
			},
			{
				name: "Nov",
				expense: 4500,
				revenue: 7000,
			},
			{
				name: "Dec",
				expense: 3500,
				revenue: 6000,
			},
		],
	},
	{
		year: 2022,
		data: [
			{
				name: "Jan",
				expense: 3500,
				revenue: 5500,
			},
			{
				name: "Feb",
				expense: 6000,
				revenue: 3200,
			},
			{
				name: "Mar",
				expense: 4000,
				revenue: 4200,
			},
			{
				name: "Apr",
				expense: 2000,
				revenue: 3800,
			},
			{
				name: "May",
				expense: 5500,
				revenue: 7000,
			},
			{
				name: "Jun",
				expense: 4500,
				revenue: 4000,
			},
			{
				name: "Jul",
				expense: 5000,
				revenue: 3500,
			},
			{
				name: "Aug",
				expense: 3200,
				revenue: 4500,
			},
			{
				name: "Sep",
				expense: 3800,
				revenue: 6000,
			},
			{
				name: "Oct",
				expense: 7000,
				revenue: 2500,
			},
			{
				name: "Nov",
				expense: 4500,
				revenue: 4000,
			},
			{
				name: "Dec",
				expense: 4200,
				revenue: 3000,
			},
		],
	},
	{
		year: 2023,
		data: [
			{
				name: "Jan",
				expense: 3500,
				revenue: 4500,
			},
			{
				name: "Feb",
				expense: 5500,
				revenue: 4000,
			},
			{
				name: "Mar",
				expense: 2000,
				revenue: 7000,
			},
		],
	},
];

const years = [2020, 2021, 2022, 2023];

export default function Chart() {
	const [open, setOpen] = useState(false);
	const [modal, setModalOpen] = useState(false);
	const { theme } = useTheme();

	const [currentYear, setCurrentYear] = useState(2023);
	const [index, setIndex] = useState(data.length - 1);
	const ref = useRef<HTMLDivElement>(null);
	const modalRef = useRef<HTMLDivElement>(null);
	const formatNumber = (number: number) => {
		if (Math.abs(number) >= 1e6) {
			return (number / 1e6).toFixed(1).replace(".0", "") + "M";
		} else if (Math.abs(number) >= 1e3) {
			const num = (number / 1e3).toFixed(1);
			const decimal = num.split(".")[1];
			if (decimal === "0") {
				return num.split(".")[0] + "k";
			}
			return num + "k";
		}
		return number.toString();
	};

	const CustomTooltip = ({ active, payload }: any) => {
		if (active && payload && payload.length) {
			const gross = payload[1].value;
			const expense = payload[0].value;
			const value = payload[1].value - payload[0].value;
			const month = payload[0].payload.name;
			return (
				<div className="flex flex-col overflow-hidden rounded-md  dark:text-neutral-50 text-neutral-800 border border-neutral-200 dark:border-neutral-900">
					<span className="label border-b border-neutral-200 bg-neutral-100 dark:bg-neutral-900 p-5 py-2 pl-2 dark:border-neutral-800 ">{month}</span>
					<div className="space-y-2 bg-white dark:bg-neutral-800 p-5 py-2 pl-2">
						<p className="label">
							Gross:
							<span className="ml-2 font-bold text-green-500">{`$${formatNumber(gross)}`}</span>
						</p>
						<p className="label">
							Expense:
							<span className="ml-2 font-bold text-red-500">{`$${formatNumber(expense)}`}</span>
						</p>
						<p className="label">
							Profit:
							<span className={`ml-2 font-bold ${value < 0 ? "text-red-500" : "text-blue-500"}`}>{`$${formatNumber(value)}`}</span>
						</p>
					</div>
				</div>
			);
		}
		return null;
	};

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
			if (modalRef.current && modalRef.current == (e.target as Node)) setModalOpen(false);
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="flex h-[300px] max-h-[500px] w-full flex-col gap-5 overflow-visible  rounded-lg border border-neutral-200 bg-white p-5 text-neutral-800 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 laptop-sm:col-span-2 laptop-sm:row-start-1 laptop-sm:h-auto  laptop-sm:max-h-none  laptop-lg:row-start-1">
			{modal && (
				<div ref={modalRef} className="fixed left-0 top-0 z-50 grid h-[100svh] w-screen place-items-center bg-black/40 p-10">
					<div
						ref={ref}
						className={` mt-1 flex  w-full flex-col border border-[#EDEDED] bg-white text-neutral-800 shadow-md dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 `}>
						{years.map((year: number, index: number) => {
							if (year != currentYear)
								return (
									<button
										className={`w-full p-5  ${index !== 0 && "border-t border-[#EDEDED]"} dark:border-neutral-800`}
										onClick={() => {
											const index = data.findIndex((item) => item.year === year);
											setIndex(index);
											setModalOpen(false);
											setCurrentYear(year);
										}}>
										{year}
									</button>
								);
						})}
					</div>
				</div>
			)}
			<div className="flex min-h-[37.81px] w-full justify-between">
				<span className="">Sales</span>
				<div className="flex gap-5 small-phone:gap-2">
					<div className=" relative text-neutral-50">
						<button
							className={` w-24 border border-[#EDEDED] py-2 text-neutral-800  hover:cursor-pointer dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50 small-phone:w-16`}
							onClick={() => {
								if (window.innerWidth > 768) {
									setOpen(!open);
								} else {
									setModalOpen(true);
								}
							}}>
							{currentYear}
						</button>
						{open && (
							<div
								ref={ref}
								className="absolute z-10 mt-1 flex w-24 flex-col border border-[#EDEDED]  bg-white text-neutral-800 shadow dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50">
								{years.map((year: number,index:number) => {
									if (year != currentYear)
										return (
											<button
                                 key={index}
												className="dark w-full py-2 hover:bg-[#EDEDED]  dark:hover:bg-neutral-800"
												onClick={() => {
													const index = data.findIndex((item) => item.year === year);
													setIndex(index);
													setOpen(false);
													setCurrentYear(year);
												}}>
												{year}
											</button>
										);
								})}
							</div>
						)}
					</div>
				</div>
			</div>
			<ResponsiveContainer height={"80%"} maxHeight={292}>
				<AreaChart data={data[index].data} margin={{ top: 0, left: -25, right: 5, bottom: 0 }}>
					<defs>
						<linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
							<stop offset="40%" stopColor="#007BFF" />
							<stop offset="100%" stopColor={`${theme === "light" ? "#f8f8f8": "#0a0a0a"}`}/>
						</linearGradient>
						<linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
							<stop offset="40%" stopColor="#ef4444" />
							<stop offset="100%" stopColor={`${theme === "light" ? "#f8f8f8": "#0a0a0a"}`} />
						</linearGradient>
					</defs>
               <CartesianGrid strokeDasharray="3 3"  className="stroke-neutral-200 dark:stroke-neutral-800"/>
					{/*<CartesianGrid stroke={`${theme === "light" ? "#292524" : "#525252"}`} strokeDasharray="5" vertical={false} />*/}
					<Legend />

					<Area dataKey="expense"  type="monotone" stroke="#ef4444" fill="url(#gradient2)"  strokeWidth={1} />
					<Area dataKey="revenue"  type="monotone" stroke="#007BFF" fill="url(#gradient)" strokeWidth={1} />
              
					<XAxis
						dataKey="name"
						stroke={`${theme === "light" ? "#525252" : "#d4d4d4"}`}
						strokeWidth={0}
						tick={{ color: `${theme === "light" ? "#525252" : "#d4d4d4"}` }}
					/>
					<YAxis
						stroke={`${theme === "light" ? "#525252" : "#d4d4d4"}`}
						tickFormatter={formatNumber}
						strokeWidth={0}
						tick={{ color: `${theme === "light" ? "#525252" : "#d4d4d4"}` }}
					/>
					<Tooltip content={CustomTooltip} cursor={false} />
                <CartesianGrid strokeDasharray="3 3"  className="stroke-neutral-500 dark:stroke-neutral-800"/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
}
