import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { IoIosImages } from "react-icons/io";
import Image from "next/image";
import { IoClose, IoCloseSharp } from "react-icons/io5";
import { BsChevronDown } from "react-icons/bs";
import { set } from "nprogress";

interface Props {
	close: () => void;
}

export default function Add({ close }: Props) {
	const [dropdown, setDropdown] = useState(false);
	const [dropdown2, setDropdown2] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const [title, setTitle] = useState("");
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [gotImage, setGotImage] = useState(false);
	const userDropdownRef = useRef<HTMLDivElement>(null);
	const [results, setResults] = useState([]);
	const [description, setDescription] = useState("");
	const [platforms, setPlatforms] = useState(["PC", "PS4", "PS5", "Xbox One", "Xbox Series X/S", "Nintendo Switch", "Android", "iOS"]);
	const [selected, setSelected] = useState(false);
	const [platformError, setPlatformError] = useState(false);
	const [list, setList] = useState<string[]>([]);
	const platformRef = useRef<HTMLDivElement>(null);
	const [listText, setListText] = useState<string>("");
	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				close();
				setImagePreview(null);
				setGotImage(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);
	const handleDeleteItem = (index: number) => {
		const newList = [...list];
		newList.splice(index, 1);
		setList(newList);
	};
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
	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
		if (e.target.value.length === 0) {
			setDropdown(false);
			setResults([]);
			setTitle("");
		} else {
			axios
				.post("http://localhost:3002/api/giantbomb", {
					name: e.target.value,
				})
				.then((response) => {
					if (response.status !== 200) {
						throw new Error("Network response was not ok");
					}
					return response.data;
				})
				.then((data) => {
					console.log(data);
					if (data.length === 0) {
						setDropdown(false);
						return;
					}
					setResults(data);
					setDropdown(true);
				})
				.catch((error) => {
					console.error(error.message);
				});
		}
	};

	const generateGameInfo = (index: number) => {
		const game: any = results[index];
		console.log(game);
		const imageUrl = game.cover ? "https:" + game.cover.url.replace("t_thumb", "t_720p") : "";
		const symmary = game.summary ? game.summary : "";
		const name = game.name ? game.name : "";
		const id = game.id ? game.id : "";
		setDropdown(false);
		setTitle(name);
		setDescription(symmary);
		setResults([]);
		setImagePreview(imageUrl);
		if (imageUrl.length > 0) {
			setGotImage(true);
		} else {
			setGotImage(false);
		}
	};

	const handleTextareaChange = (e: any) => {
		const textarea = e.target;
		const lineCount = textarea.value.split("\n").length;
		console.log(lineCount);

		textarea.rows = lineCount; // Adjust the rows based on the line count
		setDescription(textarea.value); // Update the description state
	};

	const handlePlatformClick = (platform: string) => {
		const index = platforms.indexOf(platform);
		if (index !== -1) {
			const updatedPlatforms = [...platforms];
			[updatedPlatforms[0], updatedPlatforms[index]] = [updatedPlatforms[index], updatedPlatforms[0]];
			setPlatforms(updatedPlatforms);
			setSelected(true);
			setDropdown2(false);
		}
	};

	const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setListText(e.target.value);
	};

	const handleAddItem = () => {
		if (listText.length > 0) {
			setList((prev) => [...prev, listText]);
			setListText("");
		}
	};

	return (
		<div className="fixed top-0 z-20 h-full w-full overflow-y-auto bg-black/60 laptop-sm:left-0 laptop-sm:top-0 laptop-sm:z-50 laptop-sm:grid laptop-sm:w-full laptop-sm:place-items-center laptop-sm:bg-black/60">
			<div
				ref={ref}
				className="overflow-hidden bg-white  dark:bg-neutral-950 laptop-sm:h-[700px] laptop-sm:w-[700px]  laptop-sm:rounded-md laptop-sm:border laptop-sm:dark:border-neutral-900">
				<div className="fixed top-0 flex w-full items-center justify-between border-b p-5 text-2xl font-semibold dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 laptop-sm:sticky laptop-sm:top-0 laptop-sm:place-items-center laptop-sm:text-xl">
					<span>Add Item</span>
					<IoCloseSharp size={26} className="" onClick={() => close()} />
				</div>
				<div className=" mt-[73px]  h-[calc(100svh-(73px))] w-full space-y-5 overflow-y-auto py-5 laptop-sm:mt-0  laptop-sm:h-[calc(100%-78px)] laptop-sm:px-5">
					<div className="relative flex  w-full items-center  border-neutral-100 px-5 laptop-sm:px-0">
						<input
							type="text"
							placeholder="Title"
							className="w-full rounded-md border p-5 outline-none dark:border-neutral-800 dark:bg-neutral-900"
							value={title}
							onChange={handleTitleChange}
						/>
						{dropdown && (
							<div
								ref={userDropdownRef}
								className="absolute left-0 top-[72px] z-10 w-full rounded-md border bg-white shadow-md dark:border-neutral-800 dark:bg-neutral-900 ">
								{results.map((game: any, index) => {
									const imageUrl = game.cover ? "https:" + game.cover.url.replace("t_thumb", "t_cover_med") : "";
									return (
										<div
											key={index}
											className="flex gap-3 p-4 hover:cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800"
											onClick={() => generateGameInfo(index)}>
											{imageUrl.length > 0 ? (
												<div className="relative h-[80px] w-[60px]">
													<Image src={imageUrl} fill alt="profile image" style={{ objectFit: "cover" }} sizes="(max-width: 40px) 40px, 100vw" />
												</div>
											) : (
												<div className="relative grid h-[80px] w-[60px] place-items-center border">
													<IoIosImages size={40} />
													<p className="align-middle text-xs">No image available</p>
												</div>
											)}
											<span>{game.name}</span>
										</div>
									);
								})}
							</div>
						)}
					</div>
					<div className="relative">
						<div className="flex items-center justify-between rounded-md border p-5 hover:cursor-pointer dark:border-neutral-800" onClick={() => setDropdown2(true)}>
							<div>{!selected ? "Select Platform" : platforms[0]}</div>
							<BsChevronDown />
						</div>
						{platformError && <span className="text-xs text-red-500">Please select a role</span>}
						{dropdown2 && (
							<div
								ref={platformRef}
								className="absolute left-0 top-[72px] z-10 w-full rounded-md border bg-white shadow-md dark:border-neutral-800 dark:bg-neutral-900 ">
								{platforms.map((platform: any, index) => (
									<div
										onClick={() => handlePlatformClick(platform)}
										key={index}
										className="p-4 hover:cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800">
										{platform}
									</div>
								))}
							</div>
						)}
					</div>
					<div className="flex w-full  items-center border-neutral-100  px-5 laptop-sm:px-0">
						<input type="text" placeholder="Price" className="w-full rounded-md border p-5 outline-none dark:border-neutral-800 dark:bg-neutral-900" />
					</div>
					<div className="flex w-full  items-center border-neutral-100  px-5 laptop-sm:px-0">
						<input type="text" placeholder="Discount" className="w-full rounded-md border p-5 outline-none dark:border-neutral-800 dark:bg-neutral-900" />
					</div>
					<div className="flex   w-full border-neutral-100  px-5 laptop-sm:px-0">
						<textarea
							value={description}
							placeholder="Description"
							className="min-h-[240px] w-full rounded-md border p-5 outline-none dark:border-neutral-800 dark:bg-neutral-900"
							onChange={handleTextareaChange}
						/>
					</div>
					<div className="flex w-full items-center gap-5 border-neutral-100  px-5 laptop-sm:px-0">
						<input
							value={listText}
							onChange={handleItemChange}
							type="text"
							placeholder="Add key"
							className="w-full rounded-md border p-5 outline-none dark:border-neutral-800 dark:bg-neutral-900"
						/>
						<button
							onClick={handleAddItem}
							className=" h-[62px] w-full grow-0  rounded-md  bg-blue-700 p-5 px-5  py-3 text-white transition-colors hover:bg-blue-800 laptop-sm:m-0 laptop-sm:w-36 laptop-sm:px-2">
							Add Item
						</button>
					</div>
					{list.length > 0 && (
						<div className="flex w-full flex-col items-center  overflow-hidden  rounded-md border border-neutral-100 px-5 dark:border-neutral-800 dark:bg-neutral-900 laptop-sm:px-0">
							{list.map((item, index) => {
								return (
									<div
										className={`flex w-full items-center justify-between  p-2 dark:border-neutral-800 dark:bg-neutral-900 ${
											index !== list.length - 1 && "border-b"
										}`}>
										<span>{item}</span>
										<IoClose className="hover:cursor-pointer" onClick={() => handleDeleteItem(index)} />
									</div>
								);
							})}
						</div>
					)}
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
					<button className=" w-full grow-0   rounded-md  bg-blue-700 p-5 px-5  py-3 text-white transition-colors hover:bg-blue-800 laptop-sm:m-0 laptop-sm:w-36 laptop-sm:px-2">
						Add Item
					</button>
				</div>
			</div>
		</div>
	);
}
