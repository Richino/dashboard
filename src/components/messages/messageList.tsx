import React from "react";
import { Message } from "./interface";
import { BiEdit } from "react-icons/bi";
import Messages from "./message";

function MessageList({ messages }: Message) {
	return (
		<div className="h-[100svh] w-full overflow-y-auto bg-white dark:border-neutral-800 dark:bg-neutral-950 laptop-sm:h-full laptop-sm:w-auto laptop-sm:border laptop-sm:border-r">
			<div className="absolute top-0  z-10  flex w-full justify-between border-b border-neutral-100 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 laptop-sm:sticky">
				<span>Messages</span>
				<BiEdit className="hover:cursor-pointer" size={20} />
			</div>
			{messages.map((user, index) => (
				<Messages fullName={user.fullName} message={user.message} timeSent={user.timeSent} unread={user.unread} avatar={user.avatar} key={index} status={user.status} />
			))}
			<div className="h-[200px] w-full laptop-sm:hidden"></div>
		</div>
	);
}

export default MessageList;
