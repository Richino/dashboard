import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Column, Id, Task } from "./interface";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import TaskCard from "./task";

interface Props {
	column: Column;
	updateTask: (id: Id, content: string) => void;
	deleteTask: (id: Id) => void;
	tasks: Task[];
}

function ColumnContainer({ column, tasks, deleteTask, updateTask }: Props) {
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

	return (
		<div ref={setNodeRef} {...attributes} {...listeners} style={style} className="column-tab dark:text-neutral-50">
			<div className="mb-5 flex justify-between border items-center bg-white dark:bg-neutral-950 p-5 rounded-md max-h-[66px] dark:border-neutral-800">
				<div className="flex items-center gap-2">
					<div className="text-base font-medium">{column.title}</div>
					<div className="grid min-w-[20px]  place-items-center rounded-md bg-blue-700 p-[2px] text-xs text-white">{tasks.length}</div>
				</div>
				{column.title === "Todo" && <button className="rounded-md bg-blue-700 p-1 px-3 text-white">Add Task</button>}
			</div>
			<div className="column-tab flex  flex-grow flex-col  gap-4 overflow-y-auto ">
				<SortableContext items={tasksIds}>
					{tasks.map((task) => (
						<TaskCard key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask} />
					))}
				</SortableContext>
			</div>
		</div>
	);
}

export default ColumnContainer;
