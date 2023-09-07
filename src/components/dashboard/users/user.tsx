import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";

export default function User(props: any) {
	return (
		<div
    key={props.index}
    className={`relative flex h-[120px] max-h-[120px] w-full gap-1 border-b bg-white laptop-sm:max-h-none laptop-sm:h-auto p-5 dark:border-neutral-800 dark:bg-neutral-950 laptop-sm:rounded-none laptop-sm:border-x-0 ${
        props.index >= props.max - 1 && "border-b-0 rounded-md"
    } border-neutral-100 laptop-sm:shadow-none`}>
    <div className="flex w-full items-center gap-3 laptop-sm:grid laptop-sm:grid-cols-4">
        <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full px-5">
                <Image src={props.avatar} fill alt="profile image" style={{ objectFit: "cover" }} sizes="(max-width: 40px) 40px, 100vw" />
            </div>
            <div className="hidden flex-col laptop-sm:flex">
                <span className="font-semibold line-clamp-1">{props.name}</span>
                <div className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400">
                    <div>{props.state}</div>
                </div>
            </div>
        </div>
        <div className="flex w-full flex-col justify-center gap-1 laptop-sm:hidden">
            <span className="font-semibold">{props.name}</span>
            <span className="text-xs text-neutral-600 dark:text-neutral-400 ">{props.state}</span>
            <span className="text-xs text-neutral-600 dark:text-neutral-400 ">{props.email}</span>
            <span className="text-xs text-neutral-600 dark:text-neutral-400 ">{props.mobile}</span>
        </div>
        <span className="text hidden text-neutral-600 dark:text-neutral-50 laptop-sm:block">{props.email}</span>
        <span className="hidden text-neutral-600 before:content-['Updated_'] dark:text-neutral-50 laptop-sm:block laptop-sm:before:content-['']">{props.mobile}</span>
        <div className="hidden items-center justify-between laptop-sm:flex">
            <span className="flex items-center justify-between">
                <span
                    className={`${
                        props.status === "Active"
                            ? " text-emerald-500"
                            : props.status === "Inactive"
                            ? " text-neutral-500"
                            : props.status === "Suspended"
                            ? " text-yellow-500"
                            : " text-red-500"
                    } rounded px-3 py-1 font-medium`}>
                    {props.status}
                </span>
            </span>
            <BsThreeDots size={16} className="hidden laptop-sm:block" />
        </div>
    </div>
    <BsThreeDots className="absolute right-5 laptop-sm:hidden" size={16} />
    <span className="absolute bottom-5 right-5 flex items-center justify-between laptop-sm:hidden">
        <span
            className={`${
                props.status === "Active"
                    ? " text-emerald-500"
                    : props.status === "Inactive"
                    ? " text-neutral-500"
                    : props.status === "Suspended"
                    ? " text-yellow-500"
                    : " text-red-500"
            } rounded text-xs font-medium laptop-sm:px-3 laptop-sm:py-1`}>
            {props.status}
        </span>
    </span>
</div>

	);
}
