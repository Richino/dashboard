"use client";
import { usePathname } from "next/navigation";
import { BsBoxSeam, BsCpu, BsBarChart, BsPeople, BsCalendar2Check } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import { RiFileList3Line } from "react-icons/ri";
import { IoClipboardOutline, IoMailOutline, IoSettingsOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { close } from "@/redux/navbar";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

export default function SideNav() {
	const pathname = usePathname();
	const [width, setWidth] = useState<number | null>(null);
	const [index, setIndex] = useState(-1);
	const open = useSelector((state: RootState) => state.navbar.value.open);
	const dispatch = useDispatch();
	nprogress.configure({ showSpinner: false });
	useEffect(() => {
		switch (pathname) {
			case "/":
				setIndex(1);
				break;
			case "/orders":
				setIndex(2);
				break;
			case "/inventory":
				setIndex(3);
				break;
			case "/messages":
				setIndex(4);
				break;
			case "/team":
				setIndex(5);
				break;
			case "/customers":
				setIndex(6);
				break;
			case "/reminders":
				setIndex(7);
				break;
			case "/board":
				setIndex(8);
				break;
			default:
				setIndex(9);
		}
		const handleResize = () => typeof window !== "undefined" && setWidth(window.innerWidth);
		typeof window !== "undefined" && setWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [width]);

	function changeTabs(i: number) {
		if (i !== index) nprogress.start();
		dispatch(close());
		setIndex(i);
	}
	return (
		<div
			className={`anim absolute z-40 flex h-[100svh] w-64 flex-col justify-between border-r border-neutral-200 bg-white p-5 duration-300 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 laptop-sm:static laptop-sm:ml-0  
         ${width !== null && width <= 1024 ? `${open ? "ml-0 shadow-2xl" : "-ml-64"}` : "-ml-64"}`}>
			<div className="side-nav-button-container overflow-y-auto">
				<div className="nav-logo-container">
					<BsCpu color="#007BFF" size={20} />
					<span className="side-nav-logo">XTECH</span>
				</div>
				<span className="side-nav-user-title ">ADMINISTRATOR</span>
				<Link onClick={() => changeTabs(1)} href="/" className={`${pathname === "/" ? "side-nav-button-active" : "side-nav-button"}`}>
					<BsBarChart size={20} />
					<span>Dashboard</span>
				</Link>
				<Link onClick={() => changeTabs(2)} href="/orders" className={`${pathname === "/orders" ? "side-nav-button-active" : "side-nav-button"}`}>
					<RiFileList3Line size={20} />
					<span>Orders</span>
				</Link>
				<Link onClick={() => changeTabs(3)} href="/inventory" className={`${pathname === "/inventory" ? "side-nav-button-active" : "side-nav-button"}`}>
					<BsBoxSeam size={20} />
					<span>Inventory</span>
				</Link>
				<Link onClick={() => changeTabs(4)} href="/messages" className={`${pathname === "/messages" ? "side-nav-button-active" : "side-nav-button"}`}>
					<IoMailOutline size={20} />
					<span>Messages</span>
				</Link>
				<Link onClick={() => changeTabs(5)} href="/team" className={`${pathname === "/team" ? "side-nav-button-active" : "side-nav-button"}`}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
						/>
					</svg>

					<span>Team</span>
				</Link>
				<Link onClick={() => changeTabs(6)} href="/customers" className={`${pathname === "/customers" ? "side-nav-button-active" : "side-nav-button"}`}>
					<BsPeople size={20} />
					<span>Customers</span>
				</Link>
				<Link onClick={() => changeTabs(7)} href="/reminders" className={`${pathname === "/reminders" ? "side-nav-button-active" : "side-nav-button"}`}>
					<BsCalendar2Check size={20} />
					<span>Reminders</span>
				</Link>
				<Link onClick={() => changeTabs(8)} href="/board" className={`${pathname === "/bord" ? "side-nav-button-active" : "side-nav-button"}`}>
					<IoClipboardOutline size={20} />
					<span>Board</span>
				</Link>
				<Link onClick={() => changeTabs(9)} href="/settings" className={`${pathname === "/settings" ? "side-nav-button-active" : "side-nav-button"}`}>
					<IoSettingsOutline size={20} />
					<span>Settings</span>
				</Link>
			</div>
			<button className="logout">
				<AiOutlineLogout size={20} />
				<span>Logout</span>
			</button>
		</div>
	);
}
