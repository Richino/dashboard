"use client";
import { usePathname } from "next/navigation";
import { BsCpu } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { close } from "@/redux/navbar";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import LinkButton from "./link";

type PathToIndex = {
	[key: string]: number;
};

type Links = {
	href: string;
	text: string;
};

const links: Links[] = [
	{ href: "/", text: "Dashboard" },
	{ href: "/orders", text: "Orders" },
	{ href: "/inventory", text: "Inventory" },
	{ href: "/messages", text: "Messages" },
	{ href: "/team", text: "Team" },
	{ href: "/customers", text: "Customers" },
	{ href: "/reminders", text: "Reminders" },
	{ href: "/board", text: "Board" },
	{ href: "/settings", text: "Settings" },
];

const pathToIndex: PathToIndex = {
	"/": 1,
	"/orders": 2,
	"/inventory": 3,
	"/messages": 4,
	"/team": 5,
	"/customers": 6,
	"/reminders": 7,
	"/board": 8,
};

export default function SideNav() {
	const pathname = usePathname();

	const [width, setWidth] = useState<number | null>(null);
	const [index, setIndex] = useState(-1);
	const open = useSelector((state: RootState) => state.navbar.value.open);
	const dispatch = useDispatch();
	nprogress.configure({ showSpinner: false });
	useEffect(() => {
		setIndex(pathToIndex[pathname] || 9);
		const handleResize = () => typeof window !== "undefined" && setWidth(window.innerWidth);
		typeof window !== "undefined" && setWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [width]);

	function changeTabs(number: number) {
		if (number !== index) nprogress.start();
		dispatch(close());
		setIndex(number);
	}
	return (
		<div
			className={`anim absolute z-40 flex h-[100svh] w-64 flex-col justify-between border-r border-neutral-200 bg-white p-5 duration-300 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 laptop-sm:static laptop-sm:ml-0  
         ${width !== null && width <= 1024 ? `${open ? "ml-0 shadow-2xl" : "-ml-64"}` : "-ml-64"}`}>
			<div className="side-nav-button-container overflow-y-auto">
				<div className="nav-logo-container flex items-center gap-2">
					<BsCpu color="#007BFF" size={20} />
					<span className="side-nav-logo text-xl font-semibold">XTECH</span>
				</div>
				<span className="side-nav-user-title mb-2 mt-3">ADMINISTRATOR</span>
				{links.map((link, index) => (
					<LinkButton key={index} href={link.href} isActive={pathname === link.href} text={link.text} tabs={changeTabs} />
				))}
			</div>
			<button className="logout mt-5">
				<AiOutlineLogout size={20} />
				<span className="ml-2">Logout</span>
			</button>
		</div>
	);
}
