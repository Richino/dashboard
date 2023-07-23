import Reminder from "./reminder";

const schedule = [
	{
		from: "08:00am",
		to: "09:00am",
		description: "Weekly Catch up",
		type: "1-On-1 meeting",
	},
	{
		from: "10:30am",
		to: "11:30am",
		description: "Project Planning",
		type: "Team meeting",
	},
	{
		from: "02:00pm",
		to: "03:00pm",
		description: "Client Presentation",
		type: "External meeting",
	},
	{
		from: "04:30pm",
		to: "05:30pm",
		description: "Training Session",
		type: "Workshop",
	},
	{
		from: "09:30am",
		to: "10:30am",
		description: "Product Demo",
		type: "Sales meeting",
	},
	{
		from: "10:30am",
		to: "11:30am",
		description: "Project Planning",
		type: "Team meeting",
	},
];

export default function Reminders() {
	return (
		<div className="overflow-hidden rounded-lg border bg-white text-neutral-800 dark:border-neutral-800 dark:bg-neutral-950  dark:text-neutral-400 laptop-sm:row-start-2 laptop-lg:col-span-1 laptop-lg:col-start-1 laptop-lg:row-span-2  laptop-lg:row-start-1 laptop-lg:max-h-none">
			<div className="flex justify-between border-b border-[#EDEDED] p-2 px-5 font-semibold dark:border-neutral-800">
				<span>Reminder</span>
				<button className="text-blue-700">Show All</button>
			</div>
			<div className="laptop-sm:overflow-y-auto  laptop-lg:max-h-none ">
				{schedule.map((schedule, index: number) => (
					<Reminder key={index} to={schedule.to} from={schedule.from} description={schedule.description} type={schedule.type} index={index} />
				))}
			</div>
		</div>
	);
}
