"use client";
import { usePathname } from "next/navigation";
import nprogress from "nprogress";
import { useEffect,  useState } from "react";
import {  BsPlus,  } from "react-icons/bs";
import { BiFilterAlt } from "react-icons/bi";
import { IoFilter } from "react-icons/io5";

import Add from "@/components/inventory/add";
import List from "@/components/inventory/list";
const data = [
	{
		image: "/assets/inventory/asus_rtx_3050.png",
		name: "Asus RTX 3050",
		stock: 372,
		price: 599.99,
		updated: "05/12/2023",
		upc: "687654321098",
	},
	{
		image: "/assets/inventory/asus_rtx_3060.png",
		name: "Asus RTX 3060",
		stock: 208,
		price: 599.99,
		updated: "04/28/2023",
		upc: "923487650983",
	},
	{
		image: "/assets/inventory/asus_rtx_3070.png",
		name: "Asus RTX 3070",
		stock: 417,
		price: 599.99,
		updated: "05/06/2023",
		upc: "568974203186",
	},
	{
		image: "/assets/inventory/asus_rtx_3090.png",
		name: "Asus RTX 3090",
		stock: 120,
		price: 599.99,
		updated: "03/19/2023",
		upc: "203981475629",
	},
	{
		image: "/assets/inventory/asus_rtx_3050.png",
		name: "Asus RTX 3050",
		stock: 305,
		price: 599.99,
		updated: "05/02/2023",
		upc: "769032581436",
	},
	{
		image: "/assets/inventory/asus_rtx_3050.png",
		name: "Asus RTX 3050",
		stock: 26,
		price: 599.99,
		updated: "03/07/2023",
		upc: "177.03981739874",
	},
	{
		image: "/assets/inventory/asus_rtx_3050.png",
		name: "Asus RTX 3050",
		stock: 0,
		price: 599.99,
		upc: "894756312045",
		updated: "04/22/2023",
	},
	{
		image: "/assets/inventory/asus_rtx_3050.png",
		name: "Asus RTX 3050",
		stock: 194,
		price: 599.99,
		updated: "04/22/2023",
		upc: "326985710493",
	},
	{
		image: "/assets/inventory/asus_rtx_3050.png",
		name: "Asus RTX 3050",
		stock: 76,
		price: 599.99,
		updated: "03/15/2023",
		upc: "750986413257",
	},
];

export default function Page() {
	const path = usePathname();
	const [modal, setModal] = useState(false);

	useEffect(() => {
		nprogress.done();
	}, [path]);


	const closeModal = () => {
		setModal(false);
	};
	return (
		<main className=" flex h-[calc(100%-55px)] w-full flex-col  bg-white text-neutral-800 dark:bg-neutral-950    dark:text-neutral-50 laptop-sm:gap-0 laptop-sm:overflow-hidden laptop-sm:border-none  laptop-sm:p-0">
			{modal && <Add close={closeModal} />}
			<div className="flex  items-center justify-between border-b border-dashed bg-white dark:border-neutral-800 dark:bg-neutral-950 laptop-sm:p-5 ">
				<div className="p-5 text-2xl font-semibold dark:text-neutral-50 laptop-sm:p-0">Inventory</div>
				<div className="flex gap-4 pr-5 laptop-sm:pr-0">
					<button className="hidden items-center rounded-md bg-blue-700 p-1 px-2 text-white dark:text-neutral-50 laptop-sm:flex" onClick={() => setModal(true)}>
						Add New
					</button>
					<button className="flex items-center gap-1">
						<BiFilterAlt size={16} />
						<span>Filter</span>
					</button>
					<button className="flex items-center gap-1">
						<IoFilter size={16} />
						<span>Sort</span>
					</button>
				</div>
			</div>
			<div className="flex h-[calc(100svh-(55px+79px))] w-full flex-col  overflow-y-auto border-neutral-200  pb-[137px]  dark:bg-neutral-950 laptop-sm:h-[calc(100%-(55px+79px))] laptop-sm:gap-0 laptop-sm:overflow-y-auto laptop-sm:bg-white laptop-sm:pb-0">
				<div className="top-0 z-10 hidden grid-cols-6 items-center gap-3 border-neutral-100 bg-white p-5 font-medium dark:border-neutral-800 dark:bg-neutral-950 laptop-sm:sticky laptop-sm:grid laptop-sm:border-b">
					<div>Image</div>
					<div>Upc</div>
					<div>Name</div>
					<div>Price</div>
					<div>Updated</div>
					<div className="flex justify-between">
						<div className="grid min-w-[75.72px] place-items-center truncate ">Quantity</div>
						<div>Action</div>
					</div>
				</div>
				<button onClick={() => setModal(true)} className="msg fixed bottom-5 right-5  rounded-full bg-blue-700 p-4  text-white laptop-sm:hidden">
					<BsPlus size={25} />
				</button>

				{data.map((inventory, index) => (
					<List key={index} inventory={inventory} index={index} length={data.length} />
				))}
			</div>
		</main>
	);
}
