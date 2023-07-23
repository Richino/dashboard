interface Props{
   to: string,
   from: string
   description: string
   type: string
   index: number
}

export default function Reminder(props: Props) {
	return (
		<div  className={`flex  gap-2 p-5  ${props.index != 0 ? "border-t border-[#EDEDED]" : ""}  dark:border-neutral-800 dark:text-neutral-50`}>
			<div className="flex flex-col gap-2 text-xs">
				<span className="rounded-md bg-blue-700 p-1 text-white ">{props.from}</span>
				<span className="rounded-md bg-neutral-100 p-1 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-50">{props.to}</span>
			</div>
			<div className="flex flex-col">
				<span className="font-bold">{props.description}</span>
				<span className="text-sm dark:text-neutral-400">{props.type}</span>
			</div>
		</div>
	);
}
