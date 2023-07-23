"use client";
import { usePathname } from "next/navigation";
import nprogress from "nprogress";
import { useEffect } from "react";
import { BsFilter, BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";
import Image from "next/image";
import { BiEdit } from "react-icons/bi";
const data = [
	{
		fullname: "John Doe",
		email: "john.doe@example.com",
		phone: "+1 (123) 456-7890",
		profile_image: "/assets/customers/1.jpg",
		location: "New York, USA",
		status: "Active",
	},
	{
		fullname: "Jane Smith",
		email: "jane.smith@example.com",
		phone: "+44 1234 567890",
		profile_image: "/assets/customers/2.jpg",
		location: "London, UK",
		status: "Active",
	},
	{
		fullname: "Robert Johnson",
		email: "robert.johnson@example.com",
		phone: "+61 2 1234 5678",
		profile_image: "/assets/customers/3.jpg",
		location: "Sydney, Australia",
		status: "Inactive",
	},
	{
		fullname: "Emily Williams",
		email: "emily.williams@example.com",
		phone: "+33 1 23 45 67 89",
		profile_image: "/assets/customers/4.jpg",
		location: "Paris, France",
		status: "Suspended",
	},
	{
		fullname: "Michael Brown",
		email: "michael.brown@example.com",
		phone: "+1 (987) 654-3210",
		profile_image: "/assets/customers/5.jpg",
		location: "Los Angeles, USA",
		status: "Active",
	},
	{
		fullname: "Laura Johnson",
		email: "laura.johnson@example.com",
		phone: "+44 5678 123456",
		profile_image: "/assets/customers/6.jpg",
		location: "Manchester, UK",
		status: "Terminated",
	},
	{
		fullname: "William Davis",
		email: "william.davis@example.com",
		phone: "+61 3 8765 4321",
		profile_image: "/assets/customers/7.jpg",
		location: "Melbourne, Australia",
		status: "Active",
	},
	{
		fullname: "Olivia Wilson",
		email: "olivia.wilson@example.com",
		phone: "+33 2 34 56 78 90",
		profile_image: "/assets/customers/8.jpg",
		location: "Nice, France",
		status: "Inactive",
	},
	{
		fullname: "James Lee",
		email: "james.lee@example.com",
		phone: "+1 (567) 890-1234",
		profile_image: "/assets/customers/9.jpg",
		location: "Chicago, USA",
		status: "Active",
	},
	{
		fullname: "Sophia Taylor",
		email: "sophia.taylor@example.com",
		phone: "+44 6789 123456",
		profile_image: "/assets/customers/10.jpg",
		location: "Birmingham, UK",
		status: "Inactive",
	},
	{
		fullname: "David Clark",
		email: "david.clark@example.com",
		phone: "+61 4 4321 8765",
		profile_image: "/assets/customers/11.jpg",
		location: "Brisbane, Australia",
		status: "Active",
	},
	{
		fullname: "Ava Martinez",
		email: "ava.martinez@example.com",
		phone: "+33 3 45 67 89 01",
		profile_image: "/assets/customers/12.jpg",
		location: "Marseille, France",
		status: "Suspended",
	},
	{
		fullname: "Daniel Adams",
		email: "daniel.adams@example.com",
		phone: "+1 (890) 123-4567",
		profile_image: "/assets/customers/13.jpg",
		location: "New York, USA",
		status: "Active",
	},
	{
		fullname: "Chloe Hernandez",
		email: "chloe.hernandez@example.com",
		phone: "+44 7890 123456",
		profile_image: "/assets/customers/14.jpg",
		location: "London, UK",
		status: "Terminated",
	},
	{
		fullname: "Josephine King",
		email: "josephine.king@example.com",
		phone: "+61 5 6543 2109",
		profile_image: "/assets/customers/15.jpg",
		location: "Sydney, Australia",
		status: "Active",
	},
	{
		fullname: "Ethan Turner",
		email: "ethan.turner@example.com",
		phone: "+33 4 56 78 90 12",
		profile_image: "/assets/customers/16.jpg",
		location: "Paris, France",
		status: "Active",
	},
	{
		fullname: "Matthew Cooper",
		email: "matthew.cooper@example.com",
		phone: "+1 (234) 567-8901",
		profile_image: "/assets/customers/17.jpg",
		location: "Los Angeles, USA",
		status: "Inactive",
	},
	{
		fullname: "Mia Murphy",
		email: "mia.murphy@example.com",
		phone: "+44 9012 345678",
		profile_image: "/assets/customers/18.jpg",
		location: "London, UK",
		status: "Active",
	},
	{
		fullname: "Aiden Richardson",
		email: "aiden.richardson@example.com",
		phone: "+61 6 5432 1098",
		profile_image: "/assets/customers/19.jpg",
		location: "Sydney, Australia",
		status: "Suspended",
	},
	{
		fullname: "Isabella Bailey",
		email: "isabella.bailey@example.com",
		phone: "+33 5 67 89 01 23",
		profile_image: "/assets/customers/20.jpg",
		location: "Paris, France",
		status: "Active",
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
				<div className="text-2xl font-semibold ">Customers</div>
			</div>
			<div className=" h-auto overflow-hidden laptop-sm:h-[calc(100%-(55px+79px))] laptop-sm:overflow-y-auto laptop-sm:bg-white laptop-sm:dark:bg-neutral-950">
				<div className=" hidden grid-cols-4  gap-5 p-5 font-semibold  dark:border-neutral-800 laptop-sm:sticky laptop-sm:top-0 laptop-sm:grid laptop-sm:border-b laptop-sm:bg-white dark:laptop-sm:bg-neutral-950">
					<span className="flex gap-3 truncate">Name</span>
					<span className="truncate">Email</span>

					<span className="truncate">Phone</span>
					<div className="flex justify-between">
						<span className="grid min-w-[75.72px]  truncate">Status</span>
						<span>Action</span>
					</div>
				</div>
				<div className="flex flex-col  pb-[137px] laptop-sm:gap-0 laptop-sm:pb-0 h-[calc(100svh-(55px+79px))] laptop-sm:h-auto overflow-y-auto">
					
					{data.map((customer: any, index: number) => (
						<div
							key={index}
							className={`relative flex w-full gap-1  border-b bg-white    p-5 dark:border-neutral-800 dark:bg-neutral-950 laptop-sm:rounded-none laptop-sm:border-x-0 laptop-sm:${
								index === data.length - 1 && "border-b-0"
							} border-neutral-100 laptop-sm:shadow-none`}>
							<div className="cool flex w-full items-center  gap-3 laptop-sm:grid laptop-sm:grid-cols-4">
								<div className="flex items-center gap-3 ">
									<div className="relative h-10  w-10 shrink-0 overflow-hidden rounded-full px-5">
										<Image src={customer.profile_image} fill alt="profile image" style={{ objectFit: "cover" }} sizes="(max-width: 40px) 40px, 100vw" />
									</div>
									<div className="hidden flex-col laptop-sm:flex">
										<span className="font-semibold line-clamp-1">{customer.fullname}</span>
										<div className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400">
											<div className="">{customer.location}</div>
										</div>
									</div>
								</div>
								<div className="flex w-full flex-col justify-center gap-1 laptop-sm:hidden">
									<span className="font-semibold">{customer.fullname}</span>
									<span className="text-xs text-neutral-600 dark:text-neutral-400 ">{customer.location}</span>
									<span className="text-xs text-neutral-600 dark:text-neutral-400 ">{customer.email}</span>
									<span className="text-xs text-neutral-600 dark:text-neutral-400 ">{customer.phone}</span>
								</div>

								<span className="text hidden text-neutral-600 dark:text-neutral-50 laptop-sm:block">{customer.email}</span>
								<span className="hidden  text-neutral-600 before:content-['Updated_'] dark:text-neutral-50 laptop-sm:block laptop-sm:before:content-['']">
									{customer.phone}
								</span>
								<div className="hidden items-center justify-between laptop-sm:flex">
									<span className="flex items-center justify-between">
										<span
											className={`${
												customer.status === "Active"
													? " text-emerald-500"
													: customer.status === "Inactive"
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
											: customer.status === "Inactive"
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
