import { useEffect, useRef, useState } from "react";
import { Task } from "./interface";
import { BsChevronDown } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";

interface ModalProps {
	addTask: (task: Task) => void;
	closeModal: () => void;
	taskLength?: number;
}

export default function Modal({ addTask, closeModal, taskLength }: ModalProps) {
	const modalRef = useRef<HTMLDivElement>(null);
	const roleDropdownRef = useRef<HTMLDivElement>(null);
	const userDropdownRef = useRef<HTMLDivElement>(null);

	const [selected, setSelected] = useState(false);
	const [roles, setRoles] = useState(["Frontend Developer", "Backend Developer", "Fullstack", "DevOps Engineer", "UX/UI Designer", "QA Engineer"]);
	const [dropdown, setDropdown] = useState(false);
	const [dropdown2, setDropdown2] = useState(false);
	const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
	const [users, setUsers] = useState([
		"John Smith",
		"Jane Doe",
		"Michael Johnson",
		"Emily Wilson",
		"Robert Brown",
		"Sarah Davis",
		"William Anderson",
		"Olivia Martinez",
		"David Miller",
		"Sophia Garcia",
		"James Taylor",
		"Emma Jackson",
		"Daniel Harris",
		"Ava White",
		"Matthew Robinson",
		"Chloe Lee",
		"Joseph Moore",
		"Mia Lewis",
		"Christopher Clark",
		"Ella Hall",
	]);
	const [filteredUsers, setFilteredUsers] = useState<string[]>([]);
	const [user, setUser] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [titleError, setTitleError] = useState(false);
	const [descriptionError, setDescriptionError] = useState(false);
	const [roleError, setRoleError] = useState(false);

	const handleOutsideClick = (e: MouseEvent) => {
		if (modalRef.current === e.target) {
			closeModal();
		}

		if (roleDropdownRef.current && !roleDropdownRef.current.contains(e.target as Node)) {
			setDropdown(false);
		}

		if (userDropdownRef.current && !userDropdownRef.current.contains(e.target as Node)) {
			setDropdown2(false);
		}
	};

	const handleRoleClick = (role: string) => {
		const roleIndex = roles.indexOf(role);
		if (roleIndex !== -1) {
			const updatedRoles = [...roles];
			[updatedRoles[0], updatedRoles[roleIndex]] = [updatedRoles[roleIndex], updatedRoles[0]];
			setRoles(updatedRoles);
			setSelected(true);
			setDropdown(false);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (value.length > 0) {
			setDropdown2(true);
		}
		setUser(value);
		const filteredUsers = users.filter((user) => user.toLowerCase().startsWith(value.toLowerCase()));
		setFilteredUsers(filteredUsers);
	};

	const updateSelectedUser = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const user = e.currentTarget.textContent;
		if (user) {
			setSelectedUsers((prev) => [...prev, user]);
			setUser("");
			setFilteredUsers([]);
			setUsers((prevUsers) => prevUsers.filter((u) => u !== user));
			setDropdown2(false);
		}
	};

	const handleAddTask = () => {
		// Validation
		const isTitleEmpty = title.length === 0;
		const isDescriptionEmpty = description.length === 0;
		const isRoleEmpty = !selected;

		setTitleError(isTitleEmpty);
		setDescriptionError(isDescriptionEmpty);
		setRoleError(isRoleEmpty);

		if (isTitleEmpty || isDescriptionEmpty || isRoleEmpty) {
			return;
		}

		const newTask = {
			id: (taskLength ? taskLength + 1 : 1).toString(),
			title,
			content: description,
			role: roles[0],
			columnId: "todo",
			bgColor: "#F87171",
			textColor: "#FEF2F2",
		};

		addTask(newTask);
		closeModal();
	};

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	const updateDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setDescription(e.target.value);
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleOutsideClick);
		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, []);

	return (
		<div ref={modalRef} className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/25 outline-none focus:outline-none">
			<div className="flex h-full w-full flex-col justify-between overflow-y-auto rounded-md bg-white dark:bg-neutral-950 laptop-sm:h-[700px] laptop-sm:w-[700px]">
				<div className="space-y-5">
					<div className="flex w-full items-center justify-between border-b dark:border-neutral-800">
						<div className="w-auto p-5 text-lg font-semibold dark:border-neutral-800">Add Task</div>
						<button className="p-5" onClick={() => closeModal()}>
							<IoIosClose size={30} />
						</button>
					</div>
					<div className="space-y-5 p-5 pt-0">
						<div className="flex flex-col">
							<input
								type="text"
								placeholder="Title"
								className="w-full rounded-md border p-5 outline-none dark:border-neutral-800 dark:bg-neutral-900"
								onChange={handleTitleChange}
							/>
							{titleError && <span className="text-xs text-red-500">Please add a title</span>}
						</div>
						<div className="relative">
							<div className="flex items-center justify-between rounded-md border p-5 hover:cursor-pointer dark:border-neutral-800" onClick={() => setDropdown(true)}>
								<div>{!selected ? "Select Your Role" : roles[0]}</div>
								<BsChevronDown />
							</div>
							{roleError && <span className="text-xs text-red-500">Please select a role</span>}
							{dropdown && (
								<div
									ref={roleDropdownRef}
									className="absolute left-0 top-[72px] z-10 w-full rounded-md border bg-white shadow-md dark:border-neutral-800 dark:bg-neutral-900 ">
									{roles.map((role, index) => (
										<div key={index} className="p-4 hover:cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800" onClick={() => handleRoleClick(role)}>
											{role}
										</div>
									))}
								</div>
							)}
						</div>
						<div className="flex flex-col">
							<textarea
								placeholder="Description"
								className="min-h-[120px] w-full rounded-md border p-5 outline-none dark:border-neutral-800 dark:bg-neutral-900"
								onChange={updateDescription}
								value={description}
							/>
							{descriptionError && <span className="text-xs text-red-500">Please add a description</span>}
						</div>
						<div className="relative w-full">
							<input
								type="text"
								placeholder="Assign users"
								className="w-full rounded-md border p-5 outline-none dark:border-neutral-800 dark:bg-neutral-900"
								value={user}
								onChange={handleChange}
							/>
							{dropdown2 && (
								<div ref={userDropdownRef} className="absolute left-0 top-[72px] max-h-[245px] w-full overflow-y-auto rounded-md border bg-white shadow-md">
									{filteredUsers.length === 0 ? (
										<div className="p-4">No users found</div>
									) : (
										filteredUsers.map((user, index) => (
											<div key={index} className="p-4 hover:cursor-pointer hover:bg-neutral-100" onClick={updateSelectedUser}>
												{user}
											</div>
										))
									)}
								</div>
							)}
						</div>
						<div className="flex flex-wrap gap-2">
							{selectedUsers.map((user, index) => (
								<span key={index} className="flex items-center justify-between gap-2 rounded-full bg-neutral-100 p-1 px-3">
									<div>{user}</div>
									<div
										className="rounded-full bg-neutral-200 hover:cursor-pointer"
										onClick={() => {
											setSelectedUsers((prev) => prev.filter((u) => u !== user));
											setUsers((prev) => [...prev, user]);
										}}>
										<IoIosClose size={17} />
									</div>
								</span>
							))}
						</div>
					</div>
				</div>
				<div className="p-5">
					<button className="rounded-md bg-blue-700 p-5 py-3 text-white transition-colors hover:bg-blue-800" onClick={handleAddTask}>
						Add Task
					</button>
				</div>
			</div>
		</div>
	);
}
