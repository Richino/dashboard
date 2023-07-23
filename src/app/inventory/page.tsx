"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import nprogress from "nprogress";
import { useEffect, useRef, useState } from "react";
import { BsFilter, BsPlus, BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";
import { BiChevronLeft, BiFilter, BiFilterAlt } from "react-icons/bi";
import { IoCloseSharp, IoFilter } from "react-icons/io5";
import { FocusEvent } from "react";
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
	const [add, setAdd] = useState(false);
	const [modal, setModal] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const [specs, setSpecs] = useState<string[]>([]);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [gotImage, setGotImage] = useState(false);
	useEffect(() => {
		nprogress.done();
	}, [path]);
	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setModal(false);
				setImagePreview(null);
				setGotImage(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (event) => {
				if (event.target && event.target.result) {
					setImagePreview(event.target.result as string);
					setGotImage(true);
				}
			};
			reader.readAsDataURL(file);
		}
	};
	return (
		<main className=" flex h-[calc(100%-55px)] w-full flex-col  bg-white text-neutral-800 dark:bg-neutral-950    dark:text-neutral-50 laptop-sm:gap-0 laptop-sm:overflow-hidden laptop-sm:border-none  laptop-sm:p-0">
			{modal && (
				<div className="fixed top-0 z-20 h-full w-full overflow-y-auto bg-white dark:bg-neutral-950 laptop-sm:left-0 laptop-sm:top-0 laptop-sm:z-50 laptop-sm:grid laptop-sm:w-full laptop-sm:place-items-center laptop-sm:bg-black/60">
					<div
						ref={ref}
						className="overflow-hidden bg-white  dark:bg-neutral-950 laptop-sm:aspect-square laptop-sm:h-[80%] laptop-sm:rounded-md laptop-sm:border laptop-sm:dark:border-neutral-900">
						<div className="fixed top-0 flex w-full items-center justify-between border-b dark:border-neutral-800 dark:bg-neutral-950 p-5 text-2xl font-semibold dark:text-neutral-50 laptop-sm:sticky laptop-sm:top-0 laptop-sm:place-items-center laptop-sm:text-xl">
							<span>Add Item</span>
							<IoCloseSharp size={26} className="" onClick={() => setModal(false)} />
						</div>
						<div className=" mt-[73px]  h-[calc(100svh-(73px))] w-full space-y-5 overflow-y-auto pt-5 laptop-sm:mt-0  laptop-sm:h-[90%] laptop-sm:px-5">
							<div className="flex w-full  items-center border-neutral-100  px-5 laptop-sm:px-0">
								<label className="w-full max-w-[177.03px] laptop-sm:max-w-none">Name</label>
								<input
									className="flex w-full items-center gap-2 rounded border p-2 text-neutral-600 outline-none focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 "
									type="text"
								/>
							</div>
							<div className="flex w-full  items-center border-neutral-100  px-5 laptop-sm:px-0">
								<label className="w-full max-w-[177.03px] laptop-sm:max-w-none">Price</label>
								<input
									className="flex w-full items-center gap-2 rounded border p-2 text-neutral-600 outline-none focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 "
									type="number"
								/>
							</div>
							<div className="flex   w-full border-neutral-100  px-5 laptop-sm:px-0">
								<label className="w-full max-w-[177.03px] laptop-sm:max-w-none">Desctiption</label>
								<textarea className="flex w-full max-w-[279.15px] items-center gap-2 rounded border p-2 text-neutral-600 outline-none focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 laptop-sm:min-w-[352.75px]" />
							</div>
							<div className={`flex  w-full border-neutral-100 px-5  laptop-sm:px-0 ${specs.length < 1 ? "items-center" : ""}`}>
								<label className="w-full max-w-[177.03px] ">Scpecifications</label>
								<div className="ml-auto flex flex-col">
									{!add && (
										<button
											className={`ml-auto  border dark:bg-neutral-900 px-3 py-1 dark:border-neutral-800 ${specs.length > 0 && "mb-5"}`}
											onClick={() => setAdd(true)}>
											Add New
										</button>
									)}
									{add && (
										<div className={`ml-auto flex w-[176.63px] flex-col  items-end`}>
											<input
												onBlur={(e: FocusEvent<HTMLInputElement>) => {
													if (e.target.value.length === 0) return;
													setSpecs([e.target.value, ...specs]);
												}}
												className="flex w-full items-center gap-2 rounded border p-2 text-neutral-600 outline-none focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 laptop-sm:min-w-[352.75px]"
												type="text"
											/>
											<button className="my-5 ml-auto  border dark:bg-neutral-900 px-3 py-1 dark:border-neutral-800" onClick={() => setAdd(false)}>
												Done
											</button>
										</div>
									)}
									{specs.map((key: string, index: number) => (
										<div
											key={index}
											className={` ${
												index === 0 ? "border-t" : "border-t-0"
											} flex max-w-[176px] items-center   border border-neutral-200 p-2 dark:border-neutral-800 dark:bg-neutral-900 laptop-sm:max-w-none laptop-sm:min-w-[352.75px]`}>
											<span>{key}</span> <IoCloseSharp size={16} className="ml-auto shrink-0 hover:cursor-pointer" />
										</div>
									))}
								</div>
							</div>
							<div className="grid place-items-center p-5 py-0 ">
								<div
									className={`relative grid aspect-square w-1/2 place-items-center rounded-md   border-dashed dark:border-neutral-800 ${
										gotImage ? "border-0" : "border-2"
									}`}
									onClick={() => document.getElementById("file-input")?.click()}>
									{!gotImage && <span>Choose Image</span>}
									<input id="file-input" type="file" name="post" accept="image/png, image/jpeg" className="hidden" onChange={handleFileChange} />
									{gotImage && <Image alt="preview image" fill src={imagePreview as string} style={{ objectFit: "contain" }} />}
								</div>
							</div>
							<div className="flex w-full justify-end p-5 pt-0 laptop-sm:pr-0">
								<button className="ml-auto w-full grow-0 rounded  bg-blue-700 px-5 py-2 text-white laptop-sm:m-0 laptop-sm:w-36 laptop-sm:px-2">Add Item</button>
							</div>
						</div>
					</div>
				</div>
			)}
			<div className="flex  items-center justify-between border-dashed bg-white dark:border-neutral-800 dark:bg-neutral-950 border-b laptop-sm:p-5 ">
				<div className="p-5 text-2xl font-semibold dark:text-neutral-50 laptop-sm:p-0">Inventory</div>
				<div className="flex gap-4 pr-5 laptop-sm:pr-0">
					<button className="laptop-sm:flex items-center hidden rounded-md bg-blue-700 p-1 px-2 text-white dark:text-neutral-50" onClick={() => setModal(true)}>
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
			<div className="flex w-full flex-col h-[calc(100svh-(55px+79px))]  overflow-y-auto border-neutral-200  pb-[137px]  dark:bg-neutral-950 laptop-sm:h-[calc(100%-(55px+79px))] laptop-sm:gap-0 laptop-sm:overflow-y-auto laptop-sm:bg-white laptop-sm:pb-0">
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
					<div
						key={index}
						className={`flex w-full gap-1 border-b bg-white p-5  pl-2  pr-5 text-xs dark:border-neutral-800 dark:bg-neutral-950 laptop-sm:rounded-none laptop-sm:border-x-0 laptop-sm:${
							index === data.length - 1 && "border-b-0"
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
							<span className="hidden  text-neutral-600 before:content-['Updated_'] dark:text-neutral-50 laptop-sm:block laptop-sm:before:content-['']">
								{inventory.updated}
							</span>
							<div className="flex items-center justify-between">
								<span
									className={`${
										inventory.stock < 100 && inventory.stock > 1 ? "text-yellow-500" : inventory.stock < 1 ? "text-red-600" : "text-green-600"
									} hidden min-w-[75.72px]  place-items-center truncate laptop-sm:grid`}>{`${
									inventory.stock === 0 ? "Out of stock" : `${inventory.stock} `
								}`}</span>
								<BsThreeDots size={16} className="hidden laptop-sm:block" />
							</div>
						</div>
						<div className="flex w-24 flex-col items-end justify-between laptop-sm:block ">
							<BsThreeDots className="laptop-sm:hidden" size={16} />
							<span
								className={`laptop-sm:hidden ${
									inventory.stock < 100 && inventory.stock > 1 ? "text-yellow-600" : inventory.stock < 1 ? "text-red-600" : "text-green-600"
								} ml-auto`}>{`${inventory.stock === 0 ? "Out of stock" : `${inventory.stock} `}`}</span>
						</div>
					</div>
				))}
			</div>
		</main>
	);
}
