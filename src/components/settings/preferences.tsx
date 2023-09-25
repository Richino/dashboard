"use client";
import { useTheme } from "next-themes";
import { BiChevronLeft } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { close } from "@/redux/settings";
export default function Preference() {
	const { theme, setTheme } = useTheme();
	const dispatch = useDispatch();
	return (
		<div className="p-5">
			<button className="m-5 ml-0 mt-0 flex w-36 items-center laptop-sm:hidden" onClick={() => dispatch(close())}>
				<BiChevronLeft size={26} />
				<span className="text-xl font-medium">Preferences</span>
			</button>
			<div className="flex flex-col gap-5">
				<div className="flex items-center py-2">
					<span className="w-full laptop-sm:max-w-[240px]">Dark theme</span>
					<div
						className={`flex h-7  min-w-[56px] items-center rounded-full  hover:cursor-pointer ${
							theme === "dark" ? "bg-blue-700" : "bg-neutral-200 dark:bg-neutral-800"
						} transition-all duration-300`}
						onClick={() => {
							if (theme === "light") {
								setTheme("dark");
								return;
							}
							setTheme("light");
						}}>
						<div className={`m-[1px] h-[26px] w-[26px] rounded-full bg-white shadow transition-all duration-300 ${theme === "dark" ? "ml-[30px]" : "ml-[1px]"}`} />
					</div>
				</div>
			</div>
		</div>
	);
}
