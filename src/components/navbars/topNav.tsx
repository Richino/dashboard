"use client";
import { BsSearch, BsBell, BsChevronDown } from "react-icons/bs";
import { usePathname } from "next/navigation";
import { RxHamburgerMenu } from "react-icons/rx";
import Image from "next/image";
import { open, close } from "@/redux/navbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useState, useEffect } from "react";
import { BiChevronDown } from "react-icons/bi";

export default function TopNav() {
	const dispatch = useDispatch();
	const pathname = usePathname();
	const [width, setWidth] = useState<number | null>(null);
	const [font, setFont] = useState(0);
	const isOpen = useSelector((state: RootState) => state.navbar.value.open);
	useEffect(() => {
		const handleResize = () => {
			typeof window !== "undefined" && setWidth(window.innerWidth);
			typeof window !== "undefined" && window.innerWidth > 768 && dispatch(close());
		};

		typeof window !== "undefined" && setWidth(window.innerWidth);

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);
	return (
		<div className="top-nav-container  laptop-sm:border-dashed">
			<div
				className={`fixed left-0 top-0  z-30 h-full w-full bg-black/60  
            ${isOpen && width !== null && width <= 1024 ? " pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} transition-opacity duration-300`}
				onClick={() => dispatch(close())}
			/>

			<div className="top-nav-left-container">
				<div className="top-nav-hamburger" onClick={() => dispatch(open())}>
					<RxHamburgerMenu size={20} />
				</div>
				<div className="top-nav-input-container max-h-[38px]">
					<BsSearch size={20} className="hover:cursor-pointer" />
					<input
						type="text"
						autoCorrect="false"
						placeholder={`${pathname === "/orders" ? "search orders" : "search"}`}
						className={`top-nav-input bg-transparent text-base`}
					/>
				</div>
			</div>
			<div className="top-nav-right-container">
				<div className="grid h-9 w-9  min-w-[36px] place-items-center rounded-full  border border-[#EDEDED] text-neutral-500 dark:border-neutral-800 dark:text-neutral-600">
					<BsBell size={20} className="hover:cursor-pointer" />
				</div>
				<div className="hidden h-9 border-r border-[#EDEDED] dark:border-neutral-800 laptop-sm:block"></div>
				<div className="shrink-1 flex items-center  gap-2 hover:cursor-pointer">
					<div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
						<Image src={"/assets/profile.jpg"} fill alt="profile image" style={{ objectFit: "cover" }} sizes="(max-width: 36px) 36px, 100vw" />
					</div>
					<div className=" hidden flex-col laptop-sm:flex">
						<span className="font-semibold dark:text-neutral-50">Richino Archer</span>
						<span className="text-xs text-neutral-600 dark:text-neutral-400">admin</span>
					</div>
					<div className=" hidden w-9 place-items-center laptop-sm:grid">
						<BiChevronDown size={20} />
					</div>
				</div>
			</div>
		</div>
	);
}
