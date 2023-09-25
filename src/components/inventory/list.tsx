import { BsThreeDots } from "react-icons/bs";
import Image from "next/image";

interface Inventory {
	image: string;
	name: string;
	upc: string;
	price: number;
	updated: string;
	stock: number;
}

interface Props {
	inventory: Inventory;
	index: number;
	length: number;
}

export default function List({ inventory, index, length }: Props) {
	return (
		<div
			className={`flex w-full gap-1 border-b bg-white p-5  pl-2  pr-5 text-xs dark:border-neutral-800 dark:bg-neutral-950 laptop-sm:rounded-none laptop-sm:border-x-0 laptop-sm:${
				index === length && "border-b-0"
			} border-neutral-100 laptop-sm:p-2 laptop-sm:px-5 laptop-sm:shadow-none`}>
			<div className="cool flex w-full items-center  gap-3 laptop-sm:grid laptop-sm:grid-cols-6">
				<div className="p-5 laptop-sm:p-2">
					<div className="relative h-10 w-10">
						<Image src={inventory.image} fill alt="profile image" style={{ objectFit: "cover" }} sizes="(max-width: 40px) 40px, 100vw" />
					</div>
				</div>
				<div className="flex w-full flex-col justify-center gap-2  laptop-sm:hidden">
					<span className=" text-sm font-semibold">{inventory.name}</span>
					<span className="text-neutral-600">#{inventory.upc}</span>
					<span className="font-semibold">${inventory.price}</span>
					<span className="text-neutral-600">Updated {inventory.updated}</span>
				</div>
				<span className="hidden text-neutral-600 dark:text-neutral-50 laptop-sm:block">#{inventory.upc}</span>
				<span className="hidden  laptop-sm:block">{inventory.name}</span>
				<span className="hidden text-neutral-600 dark:text-neutral-50 laptop-sm:block">${inventory.price}</span>
				<span className="hidden  text-neutral-600 before:content-['Updated_'] dark:text-neutral-50 laptop-sm:block laptop-sm:before:content-['']">{inventory.updated}</span>
				<div className="flex items-center justify-between">
					<span
						className={`${
							inventory.stock < 100 && inventory.stock > 1 ? "text-yellow-500" : inventory.stock < 1 ? "text-red-600" : "text-green-600"
						} hidden min-w-[75.72px]  place-items-center truncate laptop-sm:grid`}>{`${inventory.stock === 0 ? "Out of stock" : `${inventory.stock} `}`}</span>
					<button className="w-10  place-items-center hidden laptop-sm:grid">
						<BsThreeDots size={16} className="" />
					</button>
				</div>
			</div>
			<div className="flex w-24 flex-col items-end justify-between laptop-sm:hidden ">
				<BsThreeDots className="laptop-sm:hidden" size={16} />
				<span
					className={`laptop-sm:hidden ${
						inventory.stock < 100 && inventory.stock > 1 ? "text-yellow-600" : inventory.stock < 1 ? "text-red-600" : "text-green-600"
					} ml-auto`}>{`${inventory.stock === 0 ? "Out of stock" : `${inventory.stock} `}`}</span>
			</div>
		</div>
	);
}
