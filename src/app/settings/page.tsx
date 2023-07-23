"use client";
import { usePathname } from "next/navigation";
import { BiChevronRight } from "react-icons/bi";
import nprogress from "nprogress";
import { useEffect, useState } from "react";
import Info from "@/components/settings/profile";
import Language from "@/components/settings/language";
import Notification from "@/components/settings/notifications";
import Password from "@/components/settings/password";
import Help from "@/components/settings/help";
import { open, close } from "@/redux/settings";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Preference from "@/components/settings/preferences";

export default function Page() {
	const path = usePathname();
	const [index, setIndex] = useState(0);
	const [width, setWidth] = useState<number | null>(null);
	const isOpen = useSelector((state: RootState) => state.settings.value.open);
	const dispatch = useDispatch();

	useEffect(() => {
		nprogress.done();
	}, [path]);

	useEffect(() => {
		const handleResize = () => typeof window !== "undefined" && setWidth(window.innerWidth);
		typeof window !== "undefined" && setWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [width]);

	const changeTab = (index: number) => {
		setIndex(index);
		dispatch(open());
	};
	return (
		<main className="flex h-[calc(100%-55px)] flex-col gap-2  bg-white dark:bg-neutral-950 dark:text-neutral-50 ">
			<div className="relative h-full laptop-sm:flex  laptop-sm:flex-col">
				<div className="p-5 text-2xl font-medium">Settings</div>
				<div className=" flex  flex-col gap-5 dark:border-neutral-800 laptop-sm:flex-row laptop-sm:border-y laptop-sm:px-5 laptop-sm:py-5">
					<div
						className={`${
							index === 0 && "laptop-sm:bg-blue-700 laptop-sm:text-white"
						}  flex justify-between   p-2 px-5 hover:cursor-pointer laptop-sm:block laptop-sm:rounded laptop-sm:p-1`}
						onClick={() => changeTab(0)}>
						<span>Profile</span>
						<div className="grid place-items-center rounded px-5 laptop-sm:hidden">
							<BiChevronRight size={26} />
						</div>
					</div>
					<div
						className={`${
							index === 1 && "laptop-sm:bg-blue-700 laptop-sm:text-white"
						}  flex justify-between p-2 px-5 hover:cursor-pointer laptop-sm:block laptop-sm:rounded laptop-sm:p-1 `}
						onClick={() => changeTab(1)}>
						<div>Language</div>
						<div className="grid place-items-center rounded px-5 laptop-sm:hidden">
							<BiChevronRight size={26} />
						</div>
					</div>
					<div
						className={`${
							index === 2 && "laptop-sm:bg-blue-700 laptop-sm:text-white"
						}  flex justify-between p-2 px-5 hover:cursor-pointer laptop-sm:block laptop-sm:rounded laptop-sm:p-1`}
						onClick={() => changeTab(2)}>
						<div>Notifications</div>
						<div className="grid place-items-center rounded px-5 laptop-sm:hidden">
							<BiChevronRight size={26} />
						</div>
					</div>
					<div
						className={`${
							index === 3 && "laptop-sm:bg-blue-700 laptop-sm:text-white"
						}  flex justify-between p-2 px-5 hover:cursor-pointer laptop-sm:block laptop-sm:rounded laptop-sm:p-1`}
						onClick={() => changeTab(3)}>
						<div>Change Password</div>
						<div className="grid place-items-center rounded px-5 laptop-sm:hidden">
							<BiChevronRight size={26} />
						</div>
					</div>
					<div
						className={`${
							index === 4 && "laptop-sm:bg-blue-700 laptop-sm:text-white"
						}  flex justify-between p-2 px-5 hover:cursor-pointer laptop-sm:block laptop-sm:rounded laptop-sm:p-1`}
						onClick={() => changeTab(4)}>
						<div>Preference</div>
						<div className="grid place-items-center rounded px-5 laptop-sm:hidden">
							<BiChevronRight size={26} />
						</div>
					</div>
					<div
						className={`${
							index === 5 && "laptop-sm:bg-blue-700 laptop-sm:text-white"
						}  flex justify-between p-2 px-5 hover:cursor-pointer laptop-sm:block laptop-sm:rounded laptop-sm:p-1`}
						onClick={() => changeTab(5)}>
						<div>Help</div>
						<div className="grid place-items-center rounded px-5 laptop-sm:hidden">
							<BiChevronRight size={26} />
						</div>
					</div>
				</div>
				<div
					className={`laptop-sm:${() => {
						dispatch(close());
					}} anim  absolute  top-0 h-full w-full overflow-y-auto border-neutral-200  bg-white duration-300 dark:border-neutral-800 dark:bg-neutral-950 laptop-sm:static laptop-sm:block laptop-sm:overflow-visible laptop-sm:border-none ${
						width !== null && width <= 1024 ? `${isOpen ? "ml-[0%]" : "-ml-[110%]"}` : "-ml-[110%] laptop-sm:ml-auto"
					}`}>
					{index === 0 ? <Info /> : index === 1 ? <Language /> : index === 2 ? <Notification /> : index === 3 ? <Password /> : index === 4 ? <Preference /> : <Help />}
				</div>
			</div>
		</main>
	);
}
