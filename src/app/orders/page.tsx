"use client";
import { BsThreeDots, BsThreeDotsVertical, BsFilter } from "react-icons/bs";
import nprogress from "nprogress";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const data = [
	{
		order: "2648",
		date: "03/05/2023",
		status: "Delivered",
		emailAddress: "emily.johnson@example.com",
		location: "Maldives - Maafushi Island",
	},
	{
		order: "6815",
		date: "03/04/2023",
		status: "Shipped",
		emailAddress: "john.doe@example.com",
		location: "Greece - Santorini",
	},
	{
		order: "3942",
		date: "03/03/2023",
		status: "Cancelled",
		emailAddress: "jane.smith@example.com",
		location: "Thailand - Phuket",
	},
	{
		order: "5137",
		date: "03/02/2023",
		status: "Delivered",
		emailAddress: "michael.brown@example.com",
		location: "Brazil - Rio de Janeiro",
	},
	{
		order: "8189",
		date: "03/01/2023",
		status: "Cancelled",
		emailAddress: "sarah.wilson@example.com",
		location: "Australia - Gold Coast",
	},
	{
		order: "1521",
		date: "02/28/2023",
		status: "Shipped",
		emailAddress: "alexander.davis@example.com",
		location: "Spain - Ibiza",
	},
	{
		order: "7293",
		date: "02/27/2023",
		status: "Delivered",
		emailAddress: "olivia.thompson@example.com",
		location: "Philippines - Boracay Island",
	},
	{
		order: "4409",
		date: "02/26/2023",
		status: "Cancelled",
		emailAddress: "ethan.johnson@example.com",
		location: "Morocco - Agadir",
	},
	{
		order: "9525",
		date: "02/25/2023",
		status: "Shipped",
		emailAddress: "ava.miller@example.com",
		location: "Fiji - Denarau Island",
	},
	{
		order: "1102",
		date: "02/24/2023",
		status: "Delivered",
		emailAddress: "noah.wilson@example.com",
		location: "Mauritius - Grand Baie",
	},
];

export default function Page() {
	const path = usePathname();
	useEffect(() => {
		nprogress.done();
	}, [path]);
	return (
		<main className="flex h-[calc(100%-55px)] flex-col bg-white text-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 laptop-sm:gap-0 laptop-sm:p-0">
			<div className="border-b border-dashed bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950 laptop-sm:dark:bg-neutral-950">
				<div className="text-2xl font-semibold">Orders</div>
			</div>
			<div className="h-auto rounded-md laptop-sm:h-[calc(100%-(55px+79px))] laptop-sm:overflow-y-auto laptop-sm:bg-white laptop-sm:dark:bg-neutral-950">
				<div className="grid grid-cols-5 gap-5 p-5 font-semibold dark:border-neutral-800 laptop-sm:sticky laptop-sm:top-0 laptop-sm:grid laptop-sm:border-b laptop-sm:bg-white laptop-sm:dark:bg-neutral-950">
					<span className="flex gap-3 truncate">Order ID</span>
					<span className="truncate">Email</span>
					<span className="truncate">Location</span>
					<span className="truncate">Date</span>
					<div className="flex justify-between">
						<span className="grid min-w-[75.72px] place-items-center truncate">Status</span>
						<span>Action</span>
					</div>
				</div>
				<div className="flex flex-col overflow-y-auto pb-[137px] laptop-sm:h-auto laptop-sm:gap-0 laptop-sm:pb-0">
					<div className="msg fixed bottom-5 right-5 rounded-full bg-blue-700 p-4 text-white laptop-sm:hidden">
						<BsFilter size={25} />
					</div>
					{data.map((order:any, index) => (
						<div
							key={index}
							className={`${
								index === data.length - 1 ? "border-b-0" : ""
							} flex flex-col justify-center gap-2 border-b border-neutral-100 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950 laptop-sm:grid laptop-sm:grid-cols-5 laptop-sm:gap-5 laptop-sm:rounded-none laptop-sm:border-x-0 laptop-sm:shadow-none laptop-sm:dark:bg-neutral-950`}>
							<div className="flex justify-between">
								<div className="flex items-center font-semibold laptop-sm:text-sm laptop-sm:font-normal"># {order.order}</div>
								<button className="px-2 laptop-sm:hidden">
									<BsThreeDots className="hover:cursor-pointer" size={16} />
								</button>
							</div>
							<div className="flex w-full items-center truncate rounded text-xs text-neutral-600 dark:text-neutral-400 laptop-sm:text-sm">
								<span className="truncate">{order.emailAddress}</span>
							</div>
							<div className="flex items-center text-xs text-neutral-600 dark:text-neutral-400 laptop-sm:text-sm">
								<span className="truncate">{order.location}</span>
							</div>
							<div className="hidden laptop-sm:block laptop-sm:text-sm">{order.date}</div>
							<div className="flex justify-between text-xs text-neutral-600 dark:text-neutral-400 laptop-sm:items-center laptop-sm:text-sm">
								<div className="laptop-sm:hidden">{order.date}</div>
								<span
									className={`${order.color} -mt-1 flex min-w-[75.73px] items-center justify-center truncate p-1 laptop-sm:mt-0 ${
										order.status === "Delivered"
											? "border-emerald-300 bg-emerald-50 text-emerald-500 dark:bg-transparent"
											: order.status === "Pending"
											? "border-yellow-500 bg-yellow-50 text-yellow-500 dark:bg-transparent"
											: order.status === "Shipped"
											? "border-blue-300 bg-blue-50 text-blue-500 dark:bg-transparent"
											: "border-red-300 bg-red-50 text-red-500 dark:bg-transparent"
									} font-medium`}>
									{order.status}
								</span>
								<div className="hidden min-w-[50.28px] place-items-center dark:text-neutral-400 laptop-sm:grid">
									<BsThreeDotsVertical size={16} />
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</main>
	);
}
