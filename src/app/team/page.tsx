"use client";
import { usePathname } from "next/navigation";
import nprogress from "nprogress";
import { useEffect } from "react";
import { BsFilter, BsThreeDots } from "react-icons/bs";
import Image from "next/image";;
const data = [
	{
		fullName: "John Doe",
		role: "Software Engineer",
		email: "john.doe@example.com",
		location: "New York, USA",
		phoneNumber: "+1 (555) 123-4567",
		avatar: "/assets/customers/1.jpg",
		status: "Active",
	},
	{
		fullName: "Jane Smith",
		role: "Senior Software Engineer",
		email: "jane.smith@example.com",
		location: "San Francisco, USA",
		phoneNumber: "+1 (555) 987-6543",
		avatar: "/assets/customers/2.jpg",
		status: "Active",
	},
	{
		fullName: "Michael Johnson",
		role: "Software Developer",
		email: "michael.johnson@example.com",
		location: "London, UK",
		phoneNumber: "+44 20 1234 5678",
		avatar: "/assets/customers/5.jpg",
		status: "Disabled",
	},
	{
		fullName: "Emily Wang",
		role: "Frontend Engineer",
		email: "emily.wang@example.com",
		location: "Toronto, Canada",
		phoneNumber: "+1 (416) 555-7890",
		avatar: "/assets/customers/8.jpg",
		status: "Suspended",
	},
	{
		fullName: "Alex Ramirez",
		role: "Backend Developer",
		email: "alex.ramirez@example.com",
		location: "Mexico City, Mexico",
		phoneNumber: "+52 55 1234 5678",
		avatar: "/assets/customers/12.jpg",
		status: "Terminated",
	},
];

export default function Page() {
	const path = usePathname();
	useEffect(() => {
		nprogress.done();
	}, [path]);
	return (
		<main className=" flex h-[calc(100%-55px)] flex-col   bg-white text-neutral-800  dark:bg-neutral-950  dark:text-neutral-50 laptop-sm:gap-0 laptop-sm:p-0">
			<div className="border-b border-dashed bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950 laptop-sm:border-b laptop-sm:dark:bg-neutral-950">
				<div className="text-2xl font-semibold ">Team</div>
			</div>
			<div className=" h-auto laptop-sm:h-[calc(100%-(55px+79px))] laptop-sm:overflow-y-auto laptop-sm:bg-white laptop-sm:dark:bg-neutral-950">
				<div className=" z-10 hidden grid-cols-4  gap-5 p-5 font-semibold  dark:border-neutral-800 laptop-sm:sticky laptop-sm:top-0 laptop-sm:grid laptop-sm:border-b laptop-sm:bg-white dark:laptop-sm:bg-neutral-950">
					<span className="flex gap-3 truncate">Name</span>
					<span className="truncate">Email</span>

					<span className="truncate">phoneNumber</span>
					<div className="flex justify-between">
						<span className="grid min-w-[75.72px]  truncate">Status</span>
						<span>Action</span>
					</div>
				</div>
				<div className="flex h-[calc(100svh-(55px+79px))]  flex-col overflow-y-auto pb-[137px] laptop-sm:h-auto laptop-sm:gap-0 laptop-sm:pb-0">
					{data.map((customer: any, index: number) => (
						<div
							key={index}
							className={`relative flex w-full gap-1  border-b bg-white    p-5 dark:border-neutral-800 dark:bg-neutral-950 laptop-sm:rounded-none laptop-sm:border-x-0 laptop-sm:${
								index === data.length - 1 && "border-b-0"
							} border-neutral-100 laptop-sm:shadow-none`}>
							<div className="cool flex w-full items-center  gap-3 laptop-sm:grid laptop-sm:grid-cols-4">
								<div className="flex items-center gap-3 ">
									<div className="relative h-10  w-10 shrink-0 overflow-hidden rounded-full px-5">
										<Image src={customer.avatar} fill alt="profile image" style={{ objectFit: "cover" }} sizes="(max-width: 40px) 40px, 100vw" />
									</div>
									<div className="hidden flex-col laptop-sm:flex">
										<span className="font-semibold line-clamp-1">{customer.fullName}</span>
										<div className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400">{customer.role}</div>

									</div>
								</div>
								<div className="flex w-full flex-col justify-center gap-1 laptop-sm:hidden">
									<span className="font-semibold">{customer.fullName}</span>
									<span className="text-xs text-neutral-600 dark:text-neutral-400 ">{customer.role}</span>
									<span className="text-xs text-neutral-600 dark:text-neutral-400 ">{customer.email}</span>
									<span className="text-xs text-neutral-600 dark:text-neutral-400 ">{customer.phoneNumber}</span>
								</div>

								<span className="text hidden text-neutral-600 dark:text-neutral-50 laptop-sm:block">{customer.email}</span>
								<span className="hidden  text-neutral-600 before:content-['Updated_'] dark:text-neutral-50 laptop-sm:block laptop-sm:before:content-['']">
									{customer.phoneNumber}
								</span>
								<div className="hidden items-center justify-between laptop-sm:flex">
									<span className="flex items-center justify-between">
										<span
											className={`${
												customer.status === "Active"
													? " text-emerald-500"
													: customer.status === "Disabled"
													? " text-neutral-500"
													: customer.status === "Suspended"
													? " text-yellow-500"
													: " text-red-500"
											} rounded px-3 py-1 font-medium`}>
											{customer.status}
										</span>
									</span>
									<BsThreeDots size={16} className="hidden laptop-sm:block" />
								</div>
							</div>
							<BsThreeDots className="absolute right-5 laptop-sm:hidden" size={16} />
							<span className="absolute bottom-5 right-5 flex items-center justify-between laptop-sm:hidden">
								<span
									className={`${
										customer.status === "Active"
											? " text-emerald-500"
											: customer.status === "Disabled"
											? " text-neutral-500"
											: customer.status === "Suspended"
											? " text-yellow-500"
											: " text-red-500"
									} rounded text-xs font-medium laptop-sm:px-3 laptop-sm:py-1 `}>
									{customer.status}
								</span>
							</span>
						</div>
					))}
					<div className="msg fixed bottom-5  right-5 rounded-full bg-blue-700 p-4  text-white laptop-sm:hidden ">
						<BsFilter size={25} />
					</div>
				</div>
			</div>
		</main>
	);
}
