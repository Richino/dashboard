import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Column, Id, Task } from "./interface";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import TaskCard from "./task";
import Modal from "./modal";

interface Props {
	column: Column;
	updateTask: (id: Id, content: string) => void;
	deleteTask: (id: Id) => void;
	addTask: (task: Task) => void;
	tasks: Task[];
   taskLength?: number;
}

function ColumnContainer({ column, tasks, deleteTask, updateTask, addTask,taskLength }: Props) {
	const [modal, setModal] = useState(false);
	const tasksIds = useMemo(() => {
		return tasks.map((task) => task.id);
	}, [tasks]);

	const { setNodeRef, attributes, listeners, transform, transition } = useSortable({
		id: column.id,
		data: {
			type: "Column",
			column,
		},
		disabled: true,
	});

	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
		cursor: "auto",
	};

	const closeModal = () => {
		setModal(false);
	};

	return (
		<div ref={setNodeRef} {...attributes} {...listeners} style={style} className="column-tab w-full overflow-hidden dark:text-neutral-50">
			{modal && <Modal addTask={addTask} closeModal={closeModal} taskLength={taskLength}/>}
			<div className="mb-5 flex max-h-[66px] items-center justify-between rounded-md px-5 dark:border-neutral-800 laptop-sm:border laptop-sm:bg-white laptop-sm:p-2 laptop-sm:dark:bg-neutral-950 laptop-lg:p-5">
				<div className="flex items-center gap-2 ">
					<div className="text-base font-medium">{column.title}</div>
					<div className="grid min-w-[20px]  place-items-center rounded-md bg-blue-100 p-[2px] text-xs text-blue-700 dark:bg-blue-700 dark:text-white">
						{tasks.length}
					</div>
				</div>
				{column.title === "Todo" && (
					<button
						className="rounded-md bg-blue-700 p-1 px-3 text-white transition-colors hover:bg-blue-800"
						onClick={() => {
							setModal(true);
						}}>
						Add
					</button>
				)}
			</div>
			<div className="column-tab flex  w-full   gap-4 overflow-x-auto laptop-sm:overflow-x-hidden laptop-sm:flex-col  ">
				<SortableContext items={tasksIds}>
					{tasks.map((task, index) => (
						<TaskCard key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask} index={index} taskLength={tasks.length - 1} />
					))}
				</SortableContext>
			</div>
		</div>
	);
}

export default ColumnContainer;
