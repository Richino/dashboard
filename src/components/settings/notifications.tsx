"use client";
import { BiChevronLeft } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { close, changeSettings } from "@/redux/settings";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

//chat notification reminder alert
export default function Notification() {
	const { sounds, alerts, messages, reminders } = useSelector((state: RootState) => state.settings.value.notifications);
	const dispatch = useDispatch();
	return (
		<div className="p-5">
			<button className="m-5 ml-0 mt-0 flex w-36 items-center laptop-sm:hidden" onClick={() => dispatch(close())}>
				<BiChevronLeft size={26} />
				<span className="text-xl font-medium">Notifications</span>
			</button>
			<div className="flex flex-col gap-5">
				<div className="flex items-center py-2 ">
					<span className="w-full laptop-sm:max-w-[240px]">Chat Messages</span>
					<div
						className={`flex h-7  min-w-[56px] items-center rounded-full  hover:cursor-pointer ${
							messages ? "bg-blue-700" : "bg-neutral-200 dark:bg-neutral-800"
						} transition-all duration-300 `}
						onClick={() => dispatch(changeSettings("messages"))}>
						<div className={`m-[1px] h-[26px] w-[26px] rounded-full bg-white shadow transition-all duration-300  ${messages ? "ml-[30px]" : "ml-[1px]"}`} />
					</div>
				</div>
				<div className="flex items-center py-2">
					<span className="w-full laptop-sm:max-w-[240px]">Reminders</span>
					<div
						className={`flex h-7  min-w-[56px] items-center rounded-full  hover:cursor-pointer ${
							reminders ? "bg-blue-700" : "bg-neutral-200 dark:bg-neutral-800"
						} transition-all duration-300 `}
						onClick={() => dispatch(changeSettings("reminders"))}>
						<div className={`m-[1px] h-[26px] w-[26px] rounded-full bg-white shadow transition-all duration-300  ${reminders ? "ml-[30px]" : "ml-[1px]"}`} />
					</div>
				</div>
				<div className="flex items-center py-2">
					<span className="w-full laptop-sm:max-w-[240px]">Alert</span>
					<div
						className={`flex h-7  min-w-[56px] items-center rounded-full  hover:cursor-pointer ${
							alerts ? "bg-blue-700" : "bg-neutral-200 dark:bg-neutral-800"
						} transition-all duration-300 `}
						onClick={() => dispatch(changeSettings("alerts"))}>
						<div className={`m-[1px] h-[26px] w-[26px] rounded-full bg-white shadow transition-all duration-300  ${alerts ? "ml-[30px]" : "ml-[1px]"}`} />
					</div>
				</div>
				<div className="flex items-center py-2">
					<span className="w-full laptop-sm:max-w-[240px]">Sounds</span>
					<div
						className={`flex h-7 w-14 min-w-[56px] items-center rounded-full  hover:cursor-pointer ${
							sounds ? "bg-blue-700" : "bg-neutral-200 dark:bg-neutral-800"
						} transition-all duration-300 `}
						onClick={() => dispatch(changeSettings("sounds"))}>
						<div className={`m-[1px] h-[26px] w-[26px] rounded-full bg-white shadow transition-all duration-300  ${sounds ? "ml-[30px]" : "ml-[1px]"}`} />
					</div>
				</div>
			</div>
		</div>
	);
}
