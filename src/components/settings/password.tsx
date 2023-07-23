import { BiChevronLeft } from "react-icons/bi";
import { close } from "@/redux/settings";
import { useDispatch } from "react-redux";

export default function Password() {
	const dispatch = useDispatch();
	return (
		<div className="relative   flex   w-full  flex-col laptop-sm:mt-5 laptop-sm:gap-5 laptop-sm:p-5 ">
			<button className="m-5 flex w-40 items-center laptop-sm:hidden" onClick={() => dispatch(close())}>
				<BiChevronLeft size={26} />
				<span className="text-xl font-medium">Profile</span>
			</button>
			<div className="flex flex-col gap-5">
				<div className="flex items-center  border-neutral-100 px-5  laptop-sm:px-0">
					<label className="w-full max-w-[240px]  ">Current password</label>
					<input
						type="text"
						autoCorrect="false"
						placeholder={`Current password`}
						className=" w-full shrink gap-2 rounded border p-2 text-neutral-600 outline-none focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 laptop-sm:w-auto "
					/>
				</div>
				<div className="flex items-center  border-neutral-100 px-5  laptop-sm:px-0">
					<label className="w-full max-w-[240px] ">New password</label>
					<input
						className="flex w-full items-center gap-2 rounded border p-2 text-neutral-600 outline-none focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 laptop-sm:w-auto"
						type="text"
						placeholder="New password"
					/>
				</div>
				<div className="flex items-center  border-neutral-100 px-5  laptop-sm:px-0">
					<label className="w-full max-w-[240px] ">Confirm password</label>
					<input
						className="flex w-full items-center gap-2 rounded border p-2 text-neutral-600 outline-none focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 laptop-sm:w-auto"
						type="text"
						placeholder="Confirm password"
					/>
				</div>
			</div>
			<button className="mx-5 mb-10 mt-5 grow-0 rounded  bg-blue-700 px-5 py-2 text-white laptop-sm:m-0 laptop-sm:w-36 laptop-sm:px-2">Save Changes</button>
		</div>
	);
}
