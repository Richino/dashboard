import { useMemo, useState } from "react";
import { Column, Id, Task } from "./interface";
import ColumnContainer from "./column";
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, MouseSensor, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import TaskCard from "./task";

const defaultCols: Column[] = [
	{
		id: "todo",
		title: "Todo",
	},
	{
		id: "doing",
		title: "In progress",
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
		title: "Add User Registration",
		role: "Frontend Developer",
		bgColor: "#FFF7ED",
		textColor: "#FB923C",
	},
	{
		id: "7",
		columnId: "todo",
		content: "Initialize project with necessary files and folders",
		title: "Setup Project Skeleton",
		role: "Backend Developer",

		bgColor: "#ECFEFF",
		textColor: "#22D3EE",
	},
	{
		id: "3",
		columnId: "doing",
		content: "Set up API calls for fetching and updating data",
		title: "Implement API Calls",
		role: "Backend Developer",
		bgColor: "#ECFEFF",
		textColor: "#22D3EE",
	},
	{
		id: "4",
		columnId: "doing",
		content: "Apply CSS styles to dashboard components",
		title: "Style Dashboard Components",
		role: "UI/UX Designer",
		bgColor: "#FEF2F2",
		textColor: "#F87171",
	},
	{
		id: "8",
		columnId: "doing",
		content: "Identify and fix performance bottlenecks",
		title: "Optimize Performance",
		role: "UI/UX Designer",
		bgColor: "#ECFEFF",
		textColor: "#22D3EE",
	},
	{
		id: "9",
		columnId: "review",
		content: "Review and refactor existing codebase",
		title: "Code Review",
		role: "Backend Developer",
		bgColor: "#ECFEFF",
		textColor: "#22D3EE",
	},
	{
		id: "10",
		columnId: "review",
		content: "Test user interface for usability and design consistency",
		title: "UI/UX Testing",
		role: "UI/UX Designer",
		bgColor: "#FEF2F2",
		textColor: "#F87171",
	},
	{
		id: "5",
		columnId: "done",
		content: "Write unit tests for critical components",
		title: "Unit Testing",
		role: "QA Engineer",
		bgColor: "#fff7ed",
		textColor: "#f59e0b",
	},
	{
		id: "6",
		columnId: "done",
		content: "Perform integration tests with backend services",
		title: "Integration Testing",
		role: "QA Engineer",
		bgColor: "#ecfdf5",
		textColor: "#22c55e",
	},
	{
		id: "11",
		columnId: "done",
		content: "Deploy the project to production server",
		title: "Deployment",
		role: "DevOps Engineer",
		bgColor: "#f0f9ff",
		textColor: "#0ea5e9",
	},
];

function KanbanBoard() {
	const [columns, setColumns] = useState<Column[]>(defaultCols);
	const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
	const [tasks, setTasks] = useState<Task[]>(defaultTasks);
	const [activeTask, setActiveTask] = useState<Task | null>(null);
	const [drag, setDrag] = useState(false);

	const mouseSensor = useSensor(MouseSensor, {
		activationConstraint: {
			distance: 10,
		},
	});
	const touchSensor = useSensor(TouchSensor, {
		activationConstraint: {
			delay: 250,
			tolerance: 5,
		},
	});

	const sensors = useSensors(mouseSensor, touchSensor);

	return (
		<div className="h-[calc(100%-55px)]  w-full overflow-y-auto pb-5 laptop-sm:p-5">
			<h1 className="mb-5  px-5 pt-5 text-lg dark:text-neutral-50 laptop-sm:p-0">Task</h1>
			<DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
				<div className="flex w-full  gap-4">
					<div className="grid w-full gap-5 laptop-sm:grid-cols-4">
						<SortableContext items={columnsId}>
							{columns.map((col) => (
								<ColumnContainer
									key={col.id}
									column={col}
									deleteTask={deleteTask}
									updateTask={updateTask}
									addTask={addTask}
									tasks={tasks.filter((task) => task.columnId === col.id)}
                           taskLength={tasks.length - 1}
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

	function addTask(task: Task) {
		setTasks([task, ...tasks]);
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
		setActiveTask(null);
		const { active, over } = event;
		if (!over) return;
		const activeId = active.id;
		const overId = over.id;
		if (activeId === overId) return;
		const isActiveAColumn = active.data.current?.type === "Column";
		if (!isActiveAColumn) return;
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

		if (isActiveATask && isOverAColumn) {
			setTasks((tasks) => {
				const activeIndex = tasks.findIndex((t) => t.id === activeId);
				tasks[activeIndex].columnId = overId;
				return arrayMove(tasks, activeIndex, activeIndex);
			});
		}
	}
}

export default KanbanBoard;
