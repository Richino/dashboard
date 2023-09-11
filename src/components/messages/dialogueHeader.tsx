import { BiChevronLeft } from "react-icons/bi";
import { UserHeader } from "./interface";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { close } from "@/redux/messages";


export default function DialogueHeader({ user }: UserHeader) {
	const dispatch = useDispatch();
	return (
		<div className="relative flex items-center gap-5 border-b border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-950 laptop-sm:justify-center">
			<div className="grid h-9 w-9  min-w-[36px] place-items-center dark:text-neutral-50 laptop-sm:hidden">
				<BiChevronLeft onClick={() => dispatch(close())} size={26} />
			</div>
			<div className="flex items-center gap-2 ">
				<div className="relative h-10  w-10 shrink-0 ">
					<Image
						src={user.avatar}
						fill
						alt="profile image"
						style={{ objectFit: "cover", overflow: "hidden", borderRadius: "50%" }}
						sizes="(max-width: 40px) 40px, 100vw"
					/>
					<div
						className={`absolute bottom-0 right-0 h-[10px] w-[10px]  rounded-full border border-white dark:border-neutral-950  ${
							user.status === "Active"
								? "bg-green-500"
								: user.status === "Away"
								? "bg-yellow-500"
								: user.status === "Do Not Disturb"
								? "bg-red-500"
								: "bg-neutral-300"
						}`}
					/>
				</div>
				<div className="flex flex-col">
					<span className="dark:text-neutral-50">{user.fullName}</span>
					<span className="text-xs text-green-500">Online now</span>
				</div>
			</div>
		</div>
	);
}
