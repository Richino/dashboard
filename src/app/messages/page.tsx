"use client";
import Messages from "@/components/dashboard/messages/messages";
import { AiFillMessage, AiOutlinePaperClip } from "react-icons/ai";
import { BiChevronLeft, BiEdit } from "react-icons/bi";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { BsChevronLeft, BsPaperclip } from "react-icons/bs";
import { open, close } from "@/redux/messages";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { usePathname } from "next/navigation";
import nprogress from "nprogress";
import { useEffect, useState } from "react";

const messages = [
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

const dialogue = [
	{
		content: "Hey Alice, how are you doing?",
		timeSent: "10:30 am",
		unread: 1,
		sender: "John Doe",
		id: 1,
	},
	{
		content: "Hi John, I'm good. Thanks for asking. How about you?",
		timeSent: "10:32 am",
		unread: 0,
		sender: "Alice Smith",
		id: 2,
	},
	{
		content: "I'm doing great too. Just wanted to catch up with you.",
		timeSent: "10:35 am",
		unread: 0,
		sender: "John Doe",
	},
	{
		content: "That's nice. We should plan a meetup soon.",
		timeSent: "10:38 am",
		unread: 0,
		sender: "Alice Smith",
		id: 2,
	},
	{
		content: "Absolutely! How about next Friday?",
		timeSent: "10:40 am",
		unread: 0,
		sender: "John Doe",
		id: 1,
	},
	{
		content: "Sounds good. Let's meet at our favorite coffee shop.",
		timeSent: "10:42 am",
		unread: 0,
		sender: "Alice Smith",
		id: 2,
	},
	{
		content: "Perfect. See you there at 3 PM.",
		timeSent: "10:45 am",
		unread: 0,
		sender: "John Doe",
		id: 1,
	},
	{
		content: "Can't wait! It's been a while since we last met.",
		timeSent: "10:47 am",
		unread: 0,
		sender: "Alice Smith",
		id: 2,
	},
	{
		content: "Agreed. Time flies! See you on Friday.",
		timeSent: "10:50 am",
		unread: 0,
		sender: "John Doe",
		id: 1,
	},
	{
		content: "Looking forward to it. Take care until then.",
		timeSent: "10:52 am",
		unread: 0,
		sender: "Alice Smith",
		id: 2,
	},
	{
		content: "Perfect. See you there at 3 PM.",
		timeSent: "10:45 am",
		unread: 0,
		sender: "John Doe",
		id: 1,
	},
	{
		content: "Can't wait! It's been a while since we last met.",
		timeSent: "10:47 am",
		unread: 0,
		sender: "Alice Smith",
		id: 2,
	},
	{
		content: "Agreed. Time flies! See you on Friday.",
		timeSent: "10:50 am",
		unread: 0,
		sender: "John Doe",
		id: 1,
	},
	{
		content: "Looking forward to it. Take care until then.",
		timeSent: "10:52 am",
		unread: 0,
		sender: "Alice Smith",
		id: 2,
	},
];
export default function Message() {
	const isOpen = useSelector((state: RootState) => state.messages.value.open);
	const dispatch = useDispatch();
	const path = usePathname();
	const [width, setWidth] = useState<number | null>(null);

	useEffect(() => {
		nprogress.done();
	}, [path]);

	useEffect(() => {
		const handleResize = () => typeof window !== "undefined" && setWidth(window.innerWidth);
		typeof window !== "undefined" && setWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [width]);
	return (
		<main className="relative flex h-screen w-full gap-5  text-neutral-800 laptop-sm:h-[calc(100%-55px)] laptop-sm:gap-0 laptop-sm:px-[200px] laptop-sm:py-5 ">
			<div className="msg fixed bottom-5  right-5 rounded-full bg-blue-700 p-4  text-white laptop-sm:hidden">
				<AiFillMessage size={25} />
			</div>
			<div className="  h-[calc(100%-55px)]  w-full overflow-y-auto bg-white dark:border-neutral-800 dark:bg-neutral-950 laptop-sm:h-full laptop-sm:w-auto laptop-sm:border laptop-sm:border-r">
				<div className="absolute top-0  z-10  flex w-full justify-between border-b border-neutral-100 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 laptop-sm:sticky">
					<span>Messages</span>
					<BiEdit className="hover:cursor-pointer" size={20} />
				</div>
				<div className="mb-[61px] laptop-sm:hidden"></div>
				{messages.map((user, index) => (
					<Messages fullName={user.fullName} message={user.message} timeSent={user.timeSent} unread={user.unread} avatar={user.avatar} key={index} status={user.status} />
				))}
				<div className="h-[200px] w-full laptop-sm:hidden"></div>
			</div>
			<div
				className={`fixed  top-0 z-10 h-[100svh]  w-full overflow-y-auto bg-neutral-50 dark:border-neutral-800  laptop-sm:static laptop-sm:h-full laptop-sm:border laptop-sm:border-l-0 laptop-sm:border-r  ${
					width != null && width < 1024 ? `${isOpen ? "ml-[0%]" : "-ml-[100%]"}` : " -ml-[100%] laptop-sm:ml-auto"
				} anim duration-300`}>
				<div className="relative flex items-center gap-5 border-b border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-950 laptop-sm:justify-center">
					<div className="grid h-9 w-9  min-w-[36px] place-items-center dark:text-neutral-50 laptop-sm:hidden">
						<BiChevronLeft onClick={() => dispatch(close())} size={26} />
					</div>
					<div className="flex items-center gap-2 ">
						<div className="relative h-10  w-10 shrink-0 ">
							<Image
								src={messages[0].avatar}
								fill
								alt="profile image"
								style={{ objectFit: "cover", overflow: "hidden", borderRadius: "50%" }}
								sizes="(max-width: 40px) 40px, 100vw"
							/>
							<div
								className={`absolute bottom-0 right-0 h-[10px] w-[10px]  rounded-full border border-white dark:border-neutral-950  ${
									messages[0].status === "Active"
										? "bg-green-500"
										: messages[0].status === "Away"
										? "bg-yellow-500"
										: messages[0].status === "Do Not Disturb"
										? "bg-red-500"
										: "bg-neutral-300"
								}`}
							/>
						</div>
						<div className="flex flex-col">
							<span className="dark:text-neutral-50">{messages[0].fullName}</span>
							<span className="text-xs text-green-500">Online now</span>
						</div>
					</div>
				</div>
				<div className="text relative flex h-[calc(100%-65px)] w-full flex-col  overflow-y-auto bg-white dark:bg-neutral-950">
					<div className="text relative flex  w-full flex-col gap-5 overflow-y-auto p-5">
						{dialogue.map((message, index) => (
							<div key={index} className={`w-full`}>
								<p
									className={`${
										message.id === 2
											? "float-right bg-blue-700 text-white"
											: "float-left border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50"
									} w-auto max-w-[80%]  rounded-3xl p-5 laptop-sm:max-w-[45%]`}>
									{message.content}
								</p>
							</div>
						))}
					</div>
					<div
						className={`fixed  bottom-0 left-0 z-50 flex w-full items-center justify-between  gap-1 border-t bg-white  p-5 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 laptop-sm:sticky laptop-sm:bottom-0 ${
							width != null && width < 1024 ? `${isOpen ? "ml-[0%]" : "-ml-[100%]"}` : "-ml-[100%]"
						} anim duration-300`}>
						<AiOutlinePaperClip size={25} />
						<input type="text" placeholder="Type here" className="w-full  bg-transparent outline-none" />
						<IoPaperPlaneOutline size={25} />
					</div>
					<div className=" w-full p-5  text-neutral-50 laptop-sm:hidden">...</div>
				</div>
			</div>
		</main>
	);
}
