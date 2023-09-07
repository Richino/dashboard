import { useMemo, useState } from "react";
import { Column, Id, Task } from "./interface";
import ColumnContainer from "./column";
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./task";
import { text } from "stream/consumers";

const defaultCols: Column[] = [
	{
		id: "todo",
		title: "Todo",
	},
	{
		id: "doing",
		title: "Work in progress",
	},
	{
		id: "review",
		title: "Review",
	},
	{
		id: "done",
		title: "Done",
	},
];

const defaultTasks: Task[] = [
	{
		id: "1",
		columnId: "todo",
		content: "Design and implement the login page",
		title: "Create Login Page",
		role: "UI/UX Designer",
		bgColor: "#FEF2F2",
		textColor: "#F87171",
	},
	{
		id: "2",
		columnId: "todo",
		content: "Create user registration functionality",
		title: "Add User Registration", // Copied from the first task
		role: "Frontend Developer", // Copied from the first task
		bgColor: "#FFF7ED",
		textColor: "#FB923C",
	},
	{
		id: "7",
		columnId: "todo",
		content: "Initialize project with necessary files and folders",
		title: "Setup Project Skeleton", // Copied from the first task
		role: "Backend Developer", // Copied from the first task

		bgColor: "#ECFEFF",
		textColor: "#22D3EE",
	},
	{
		id: "3",
		columnId: "doing",
		content: "Set up API calls for fetching and updating data",
		title: "Implement API Calls", // Copied from the first task
		role: "Backend Developer", // Copied from the first task
		bgColor: "#ECFEFF",
		textColor: "#22D3EE",
	},
	{
		id: "4",
		columnId: "doing",
		content: "Apply CSS styles to dashboard components",
		title: "Style Dashboard Components", // Copied from the first task
		role: "UI/UX Designer", // Copied from the first task
		bgColor: "#FEF2F2",
		textColor: "#F87171",
	},
	{
		id: "8",
		columnId: "doing",
		content: "Identify and fix performance bottlenecks",
		title: "Optimize Performance", // Copied from the first task
		role: "UI/UX Designer", // Copied from the first task
		bgColor: "#ECFEFF",
		textColor: "#22D3EE",
	},
	{
		id: "9",
		columnId: "review",
		content: "Review and refactor existing codebase",
		title: "Code Review", // Copied from the first task
		role: "Backend Developer", // Copied from the first task
		bgColor: "#ECFEFF",
		textColor: "#22D3EE",
	},
	{
		id: "10",
		columnId: "review",
		content: "Test user interface for usability and design consistency",
		title: "UI/UX Testing", // Copied from the first task
		role: "UI/UX Designer", // Copied from the first task
		bgColor: "#FEF2F2",
		textColor: "#F87171",
	},
	{
		id: "5",
		columnId: "done",
		content: "Write unit tests for critical components",
		title: "Unit Testing", // Copied from the first task
		role: "QA Engineer", // Copied from the first task
		bgColor: "#fff7ed",
		textColor: "#f59e0b",
	},
	{
		id: "6",
		columnId: "done",
		content: "Perform integration tests with backend services",
		title: "Integration Testing", // Copied from the first task
		role: "QA Engineer", // Copied from the first task
		bgColor: "#ecfdf5",
		textColor: "#22c55e",
	},
	{
		id: "11",
		columnId: "done",
		content: "Deploy the project to production server",
		title: "Deployment", // Copied from the first task
		role: "DevOps Engineer", // Copied from the first task
		bgColor: "#f0f9ff",
		textColor: "#0ea5e9",
	},
];

function KanbanBoard() {
	const [columns, setColumns] = useState<Column[]>(defaultCols);
	const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

	const [tasks, setTasks] = useState<Task[]>(defaultTasks);

	const [activeColumn, setActiveColumn] = useState<Column | null>(null);

	const [activeTask, setActiveTask] = useState<Task | null>(null);
	const [drag, setDrag] = useState(false);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 10,
			},
		})
	);

	return (
		<div className="h-[calc(100%-55px)]  overflow-y-auto p-5 px-44">
			<h1 className="mb-5 text-lg dark:text-neutral-50">Task</h1>
			<DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
				<div className="m-auto flex  gap-4">
					<div className="grid grid-cols-4 gap-5">
						<SortableContext items={columnsId}>
							{columns.map((col) => (
								<ColumnContainer
									key={col.id}
									column={col}
									deleteTask={deleteTask}
									updateTask={updateTask}
									tasks={tasks.filter((task) => task.columnId === col.id)}
								/>
							))}
						</SortableContext>
					</div>
				</div>

				<DragOverlay>{activeTask && <TaskCard task={activeTask} deleteTask={deleteTask} updateTask={updateTask} drag={drag} />}</DragOverlay>
			</DndContext>
		</div>
	);

	function deleteTask(id: Id) {
		const newTasks = tasks.filter((task) => task.id !== id);
		setTasks(newTasks);
	}

	function updateTask(id: Id, content: string) {
		const newTasks = tasks.map((task) => {
			if (task.id !== id) return task;
			return { ...task, content };
		});

		setTasks(newTasks);
	}

	function onDragStart(event: DragStartEvent) {
		setDrag(true);

		if (event.active.data.current?.type === "Task") {
			setActiveTask(event.active.data.current.task);
			return;
		}
	}

	function onDragEnd(event: DragEndEvent) {
		setDrag(false);
		setActiveColumn(null);
		setActiveTask(null);

		const { active, over } = event;
		if (!over) return;

		const activeId = active.id;
		const overId = over.id;

		if (activeId === overId) return;

		const isActiveAColumn = active.data.current?.type === "Column";
		if (!isActiveAColumn) return;

		console.log("DRAG END");

		setColumns((columns) => {
			const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

			const overColumnIndex = columns.findIndex((col) => col.id === overId);

			return arrayMove(columns, activeColumnIndex, overColumnIndex);
		});
	}

	function onDragOver(event: DragOverEvent) {
		const { active, over } = event;
		if (!over) return;

		const activeId = active.id;
		const overId = over.id;

		if (activeId === overId) return;

		const isActiveATask = active.data.current?.type === "Task";
		const isOverATask = over.data.current?.type === "Task";

		if (!isActiveATask) return;

		// Im dropping a Task over another Task
		if (isActiveATask && isOverATask) {
			setTasks((tasks) => {
				const activeIndex = tasks.findIndex((t) => t.id === activeId);
				const overIndex = tasks.findIndex((t) => t.id === overId);
				if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
					tasks[activeIndex].columnId = tasks[overIndex].columnId;
					return arrayMove(tasks, activeIndex, overIndex);
				}
				return arrayMove(tasks, activeIndex, overIndex);
			});
		}

		const isOverAColumn = over.data.current?.type === "Column";

		// Im dropping a Task over a column
		if (isActiveATask && isOverAColumn) {
			setTasks((tasks) => {
				const activeIndex = tasks.findIndex((t) => t.id === activeId);

				tasks[activeIndex].columnId = overId;
				console.log("DROPPING TASK OVER COLUMN", { activeIndex });
				return arrayMove(tasks, activeIndex, activeIndex);
			});
		}
	}
}

export default KanbanBoard;
