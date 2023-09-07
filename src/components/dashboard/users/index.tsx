import User from "./user";
import Link from "next/link";

const people = [
	{
		fullName: "Emily Johnson",
		state: "Manchester, UK",
		mobileNumber: "(123) 456 7890",
		emailAddress: "emily.johnson@example.com",
		status: "Active",
		avatar: "/assets/top_users/emily.jpg",
	},
	{
		fullName: "Alexander Lee",
		state: "Paris, France",
		mobileNumber: "(987) 654 3210",
		emailAddress: "alexander.lee@example.com",
		status: "Inactive",
		avatar: "/assets/top_users/alex.jpg",
	},
	{
		fullName: "Sophia Hernandez",
		state: "London, UK",
		mobileNumber: "(555) 123 4567",
		emailAddress: "sophia.hernandez@example.com",
		status: "Suspended",
		avatar: "/assets/top_users/sophia.jpg",
	},
];

export default function Users() {
	return (
		<div className=" rounded-md border border-neutral-200 bg-white text-neutral-800 dark:border-neutral-800  dark:bg-neutral-950 dark:text-neutral-50 laptop-sm:col-span-2 laptop-lg:col-span-3 laptop-lg:col-start-2 laptop-lg:row-start-2 laptop-sm:overflow-hidden">
			<div className="">
				<div className="flex grid-cols-4 justify-between gap-2 border-b p-4 font-semibold dark:border-neutral-800 laptop-sm:grid">
					<span className="truncate ">Top Users</span>
					<span className="hidden truncate laptop-sm:block">Email</span>
					<span className="hidden truncate laptop-sm:block">Phone Number</span>
					<div className="flex items-center justify-between">
						<span className="hidden laptop-sm:block">Status</span>
						<Link href="/customers">
							<button className="text-blue-700 hover:underline focus:outline-none">Show All</button>
						</Link>
					</div>
				</div>

				{people.map((user, index) => (
					<User
						key={index}
						index={index}
						max={people.length}
						name={user.fullName}
						email={user.emailAddress}
						mobile={user.mobileNumber}
						state={user.state}
						status={user.status}
						avatar={user.avatar}
					/>
				))}
			</div>
		</div>
	);
}
