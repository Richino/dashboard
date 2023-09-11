import { useEffect, useRef, useState } from "react";
import { Id } from "./interface";

interface Props {
	closeModal: () => void;
	deleteTask: (id: Id) => void;
	id: Id;
}

export default function TaskModal({ closeModal, deleteTask, id }: Props) {
	const modalContainerRef = useRef<HTMLDivElement>(null);
	const overlayRef = useRef<HTMLDivElement>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		const handleOutsideClick = (e: MouseEvent) => {
			if (modalContainerRef.current && !modalContainerRef.current.contains(e.target as Node)) {
				closeModal();
			}
			if (overlayRef.current && overlayRef.current === e.target) {
				setIsModalOpen(false);
			}
		};

		window.addEventListener("mousedown", handleOutsideClick);

		return () => {
			window.removeEventListener("mousedown", handleOutsideClick);
		};
	}, []);

	const handleDeleteTask = () => {
		closeModal();
		deleteTask(id);
	};

	return (
		<div className="absolute left-[-75px] top-[30px] flex flex-col overflow-hidden rounded-md border bg-white hover:cursor-default dark:border-neutral-800 dark:bg-neutral-900 laptop-sm:left-[-28px] laptop-sm:top-[35px]">
			{isModalOpen && (
				<div ref={overlayRef} className="fixed left-0 top-0 z-50 grid h-screen w-screen place-items-center bg-black/25">
					<div className="overflow-hidden rounded-md border bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
						<h1 className="border-b p-5 px-10 dark:border-neutral-800">Are you sure?</h1>
						<div className="flex flex-col">
							<button className="p-5 px-10 laptop-sm:hover:bg-neutral-200 dark:laptop-sm:hover:bg-neutral-700" onClick={handleDeleteTask}>
								Yes
							</button>
							<button className="p-5 px-10 laptop-sm:hover:bg-neutral-200 dark:laptop-sm:hover:bg-neutral-700" onClick={() => setIsModalOpen(false)}>
								No
							</button>
						</div>
					</div>
				</div>
			)}

			<div className="grid place-items-center p-5 dark:text-neutral-400  laptop-sm:p-2 laptop-sm:hover:cursor-pointer laptop-sm:hover:bg-neutral-200 dark:laptop-sm:hover:bg-neutral-700">
				View
			</div>
			<div
				className="grid place-items-center p-5 dark:text-neutral-400  laptop-sm:p-2 laptop-sm:hover:cursor-pointer laptop-sm:hover:bg-neutral-200 dark:laptop-sm:hover:bg-neutral-700"
				onClick={() => setIsModalOpen(true)}>
				Delete
			</div>
		</div>
	);
}
