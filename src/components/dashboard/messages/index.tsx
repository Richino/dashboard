import Link from "next/link";
import Messages from "./messages";

let messages = [
	{
		fullName: "John Doe",
		message: "Hello, how are you?",
		timeSent: "05:15 pm",
		unread: 2,
		avatar: "/assets/messages/john.jpg",
		status: "Active",
	},
	{
		fullName: "Alice Smith",
		message: "Just checking in. Have a great day!",
		timeSent: "06:22 am",
		unread: 1,
		avatar: "/assets/messages/smith.jpg",
		status: "Offline",
	},
	{
		fullName: "Robert Johnson",
		message: "Can we meet tomorrow for lunch?Can we meet tomorrow for lunch?Can we meet tomorrow for lunch?",
		timeSent: "12:45 pm",
		unread: 3,
		avatar: "/assets/messages/robert.jpg",
		status: "Active",
	},
	{
		fullName: "Emma Thompson",
		message: "I need your help with a project.",
		timeSent: "09:30 am",
		unread: 100,
		avatar: "/assets/messages/emma.jpg",
		status: "Away",
	},
	{
		fullName: "Michael Brown",
		message: "Did you receive my email?",
		timeSent: "03:50 pm",
		unread: 4,
		avatar: "/assets/messages/mike.jpg",
		status: "Do Not Disturb",
	},
];

export default function Message() {
	return (
		<div className="rounded-lg border border-neutral-200 bg-white text-neutral-800 dark:border-neutral-800  dark:bg-neutral-950 laptop-sm:col-span-1 laptop-sm:col-start-2 laptop-sm:row-start-2 laptop-sm:max-h-none laptop-lg:col-start-4  laptop-lg:row-start-1">
			<div className="flex justify-between border-b p-5 py-2 font-semibold dark:border-neutral-800">
				<div className="dark:text-neutral-50">Messages</div>
				<Link href={"/messages"}>
					<button className="text-blue-700">Show All</button>
				</Link>
			</div>

			{messages.map((user, index) => (
				<Messages fullName={user.fullName} message={user.message} timeSent={user.timeSent} unread={user.unread} avatar={user.avatar} key={index} index={index} status={user.status} />
			))}
		</div>
	);
}
