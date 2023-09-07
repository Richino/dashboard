import Image from "next/image";
import { open, close } from "@/redux/messages";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Messages(props: any) {
	const dispatch = useDispatch();
	
	return (
		<div  onClick={() => dispatch(open())} className="flex-start  flex flex-row items-center gap-2 p-5 py-2 hover:cursor-pointer laptop-sm:hover:bg-neutral-200 dark:laptop-sm:hover:bg-neutral-800">
			<div className="relative h-10  w-10 shrink-0 text">
				<Image src={props.avatar} fill alt="profile image" style={{ objectFit: "cover", overflow: "hidden", borderRadius: "50%" }} sizes="(max-width: 40px) 40px, 100vw" />
				<div
					className={`absolute bottom-0 right-0 h-[10px] w-[10px]  rounded-full border border-white dark:border-neutral-950 ${
						props.status === "Active" ? "bg-green-500" : props.status === "Away" ? "bg-yellow-500" : props.status === "Do Not Disturb" ? "bg-red-500" : "bg-neutral-300"
					}`}
				/>
			</div>
			<div className="flex  max-h-[60px] h-[60px] flex-1 justify-between items-center gap-2">
				<div className="flex flex-1 flex-col min-h-full justify-center">
					<span className="font-semibold line-clamp-1 dark:text-neutral-50">{props.fullName}</span>
					<span className="turncate overflow-hidden text-xs text-neutral-500 line-clamp-2 dark:text-neutral-400">{props.message}</span>
				</div>
				<div>
					<div className="w-18 flex flex-col truncate text-xs justify-between ">
						<span className="text-neutral-500 min-h-[24px] grid place-items-center">{props.timeSent}</span>
						<div className="flex ml-auto shrink-0  items-center  max-h-[20px]  justify-center rounded bg-blue-700   px-2 py-[2px] text-xs text-white text">
								{props.unread > 99 ? "99+" : props.unread}
							</div>
					</div>
				</div>
			</div>
		</div>
	);
}
