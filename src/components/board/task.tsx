import { use, useEffect, useState } from "react";
import { Id, Task } from "./interface";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { el } from "date-fns/locale";
import { BsThreeDotsVertical } from "react-icons/bs";

interface Props {
	drag?: boolean;
	task: Task;
	deleteTask: (id: Id) => void;
	updateTask: (id: Id, content: string) => void;
}

function TaskCard({ task, deleteTask, updateTask, drag }: Props) {
	const [cursor, setCursor] = useState("grab");

	const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
		id: task.id,
		data: {
			type: "Task",
			task,
		},
	});
	console.log(drag);

	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
		cursor: drag ? "grabbing" : "grab",
	};

	if (isDragging) {
		return (
			<div ref={setNodeRef} style={style} {...attributes} {...listeners} className="flex flex-col gap-2 rounded-md border  border-blue-300 p-4 text-transparent">
				<div className="">
					<span className="inline-block rounded-full p-1 px-2 text-xs">{task.role}</span>
				</div>
				<p className="text-lg">{task.title}</p>
				<p className="">{task.content}</p>
			</div>
		);
	}

	function handleMouseDown(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {}

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className="flex flex-col gap-2 rounded-md border bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50"
			onMouseDown={handleMouseDown}>
			<div className="flex items-center justify-between">
				<span className="inline-block rounded-full  border p-2 px-3 text-xs font-medium dark:border-neutral-800">{task.role}</span>
				<div className="p-2  hover:cursor-pointer">
					<BsThreeDotsVertical  size={16} />
				</div>
			</div>
			<p className=" text-lg font-medium">{task.title}</p>
			<p className=" dark:text-neutral-304 text-neutral-500">{task.content}</p>
		</div>
	);
}

export default TaskCard;
