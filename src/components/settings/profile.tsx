"use client";
import Image from "next/image";
import { BiChevronLeft } from "react-icons/bi";
import { close } from "@/redux/settings";
import { useDispatch } from "react-redux";

export default function Profile() {
	const dispatch = useDispatch();
	return (
		<div className="relative   flex   w-full  flex-col laptop-sm:mt-5 laptop-sm:gap-5 laptop-sm:p-5 dark:bg-neutral-950">
			<button className="m-5 flex w-40 laptop-sm:hidden items-center" onClick={() => dispatch(close())}>
				<BiChevronLeft size={26} />
				<span className="text-xl font-medium">Profile</span>
			</button>
			<div className="flex flex-col gap-5">
				<div className="flex items-center  border-neutral-100 px-5  laptop-sm:px-0">
					<label className="w-full max-w-[240px] ">First Name</label>
					<input
						type="text"
						autoCorrect="false"
						placeholder={``}
						className=" w-full shrink gap-2 rounded border p-2 text-neutral-600 outline-none focus:outline-none laptop-sm:w-auto dark:border-neutral-800 dark:bg-neutral-950 "
					/>
				</div>
				<div className="flex items-center  border-neutral-100 px-5  laptop-sm:px-0">
					<label className="w-full max-w-[240px]">Last Name</label>
					<input className="flex w-full items-center gap-2 rounded border p-2 text-neutral-600 outline-none focus:outline-none laptop-sm:w-auto dark:border-neutral-800 dark:bg-neutral-950" type="text" />
				</div>
				<div className="flex items-center  border-neutral-100 px-5  laptop-sm:px-0">
					<label className="w-full max-w-[240px]">Email</label>
					<input className="flex w-full items-center gap-2 rounded border p-2 text-neutral-600 outline-none focus:outline-none laptop-sm:w-auto dark:border-neutral-800 dark:bg-neutral-950" type="text" />
				</div>
				<div className="flex items-center  border-neutral-100 px-5  laptop-sm:px-0">
					<label className="w-full max-w-[240px]">Phone Number</label>
					<input className="flex w-full items-center gap-2 rounded border p-2 text-neutral-600 outline-none focus:outline-none laptop-sm:w-auto dark:border-neutral-800 dark:bg-neutral-950" type="text" />
				</div>
				<div className="flex items-center  border-neutral-100 px-5 laptop-sm:px-0">
					<label className="w-full laptop-sm:max-w-[240px]">Gender</label>
					<div className="flex  w-auto  overflow-hidden rounded  border dark:border-neutral-800">
						<div className="grid w-10 place-items-center bg-blue-700 px-2 py-1 text-white">M</div>
						<div className="grid w-10 place-items-center px-2">F</div>
					</div>
				</div>
				<div className="flex items-center  border-neutral-100 px-5  laptop-sm:px-0">
					<label className="w-full max-w-[240px] ">Avatar</label>
					<div className="flex w-full max-w-[242px] items-center justify-between">
						<div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ml-auto laptop-sm:ml-0">
							<Image src={"/assets/profile.jpg"} fill alt="profile image" style={{ objectFit: "cover" }} sizes="(max-width: 36px) 36px, 100vw" />
						</div>
					</div>
				</div>
			</div>
			<button className="mx-5 mb-10 mt-5 grow-0 rounded  bg-blue-700 px-5 py-2 text-white laptop-sm:m-0 laptop-sm:w-36 laptop-sm:px-2">Save Changes</button>
		</div>
	);
}
