"use client";
import { AiFillMessage } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { usePathname } from "next/navigation";
import nprogress from "nprogress";
import { useEffect, useState } from "react";
import { Message } from "@/components/messages/interface";
import MessageList from "@/components/messages/messageList";
import DialogueHeader from "@/components/messages/dialogueHeader";
import Dialogue from "@/components/messages/dialogue";
import Input from "@/components/messages/Input";
import { messages, dialogue } from "@/components/messages/data";

export default function Message() {
	const isOpen = useSelector((state: RootState) => state.messages.value.open);
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
				<MessageList messages={messages} />
			</div>
			<div
				className={`fixed  top-0 z-10 h-[100svh]  w-full overflow-y-auto bg-neutral-50 dark:border-neutral-800  laptop-sm:static laptop-sm:h-full laptop-sm:border laptop-sm:border-l-0 laptop-sm:border-r  ${
					width != null && width < 1024 ? `${isOpen ? "ml-[0%]" : "-ml-[100%]"}` : " -ml-[100%] laptop-sm:ml-auto"
				} anim duration-300`}>
				<DialogueHeader user={messages[0]} />

				<div className="text relative flex h-[calc(100%-65px)] w-full flex-col  overflow-y-auto bg-white dark:bg-neutral-950">
					<Dialogue dialogue={dialogue} />
					<Input width={width} />
				</div>
			</div>
		</main>
	);
}
