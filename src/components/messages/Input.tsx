import { RootState } from "@/redux/store";
import { AiOutlinePaperClip } from "react-icons/ai";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Input } from "./interface";

export default function Input({ width }: Input) {
	const isOpen = useSelector((state: RootState) => state.messages.value.open);
	return (
		<>
			<div
				className={`fixed  bottom-0 left-0 z-50 flex w-full items-center justify-between  gap-1 border-t bg-white  p-5 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 laptop-sm:sticky laptop-sm:bottom-0 ${
					width != null && width < 1024 ? `${isOpen ? "ml-[0%]" : "-ml-[100%]"}` : "-ml-[100%]"
				} anim duration-300`}>
				<AiOutlinePaperClip size={25} />
				<input type="text" placeholder="Type here" className="w-full  bg-transparent outline-none" />
				<IoPaperPlaneOutline size={25} />
			</div>
			<div className=" w-full p-5  text-neutral-50 laptop-sm:hidden">...</div>
		</>
	);
}
