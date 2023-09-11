import { useEffect, useRef, useState } from "react";
import { Id, Task } from "./interface";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BsThreeDotsVertical } from "react-icons/bs";
import TaskModal from "./taskModal";

interface Props {
	drag?: boolean;
	task: Task;
	deleteTask: (id: Id) => void;
	updateTask: (id: Id, content: string) => void;

	index?: number;
	taskLength?: number;
}

function TaskCard({ task, deleteTask, updateTask, drag, index, taskLength }: Props) {
	const [minWidth, setMinWidth] = useState("auto");
	const [showModal, setShowModal] = useState(false);
	const divRef = useRef<HTMLElement>(null);

	const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
		id: task.id,
		data: {
			type: "Task",
			task,
		},
	});

	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
		cursor: drag ? "grabbing" : "grab",
	};

	const handleTaskModalClose = () => {
		setShowModal(false);
	};

	useEffect(() => {
		const updateMinWidth = () => {
			if (divRef.current) {
				const initialWidth = divRef.current.offsetWidth;
				setMinWidth(`${initialWidth}px`);
			}
		};
		updateMinWidth();
		window.addEventListener("resize", updateMinWidth);

		return () => {
			window.removeEventListener("resize", updateMinWidth);
		};
	}, []);

	if (isDragging) {
		return (
			<div
				ref={setNodeRef}
				style={{ ...style, minWidth: minWidth }}
				{...attributes}
				{...listeners}
				className="flex h-[200px] w-[200px] min-w-[200px] flex-col gap-2 rounded-md border bg-neutral-100 p-4 text-transparent dark:border-neutral-900 dark:bg-neutral-700  laptop-sm:h-auto laptop-sm:min-h-0 laptop-sm:w-auto laptop-sm:min-w-0">
				<div className="">
					<span className="inline-block rounded-full p-1 px-2 text-xs">{task.role}</span>
				</div>
				<p className="text-lg">{task.title}</p>
				<p className="">{task.content}</p>
			</div>
		);
	}

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className={`${index === 0 && "ml-5 laptop-sm:ml-0"} ${
				index === taskLength && "mr-5 laptop-sm:mr-0"
			} flex h-[200px] w-[200px] min-w-[200px] flex-col gap-2 rounded-md border bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 laptop-sm:h-auto laptop-sm:min-h-0 laptop-sm:w-auto laptop-sm:min-w-0`}>
			<div className="flex items-center justify-between">
				<span className="line-clamp-1 inline-block  truncate rounded-full border p-2 laptop-sm:px-3 text-xs font-medium dark:border-neutral-800 ">{task.role}</span>
				<div className="relative">
					<button className="  laptop-sm:p-2 hover:cursor-pointer " onClick={() => setShowModal(!showModal)}>
						<BsThreeDotsVertical size={16} />
					</button>
					{showModal && <TaskModal key={index} closeModal={handleTaskModalClose} deleteTask={deleteTask} id={task.id} />}
				</div>
			</div>
			<p className=" text-lg font-medium">{task.title}</p>
			<p className=" text-neutral-500 dark:text-neutral-300">{task.content}</p>
		</div>
	);
}

export default TaskCard;
