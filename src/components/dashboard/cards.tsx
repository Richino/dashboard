import { BsThreeDots } from "react-icons/bs";

interface Cards {
	title: string;
	summary: string | number;
	summary2: string;
	button?: boolean;
	pages?: boolean;
}

const char = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "%"];

export default function Card(props: Cards) {
	return (
		<div className="text-neutral-800 flex border shrink-0 flex-col justify-between gap-2    bg-white p-5 rounded-lg dark:bg-neutral-950 dark:border-neutral-800 dark:text-neutral-50">
			<div className="flex justify-between font-semibold">
				<span>{props.title}</span>
				<BsThreeDots className="hover:cursor-pointer" size={16} />
			</div>
			<div className=" ">
				{typeof props.summary != "number" ? (
					String(props.summary)
						.split("")
						.map((letter, index) => (
							<span key={index} className={`${index >= 27 && index <= 30 && "text-[#007BFF]"} text-md `}>
								{letter}
							</span>
						))
				) : (
					<span className="text-xl ">{`${!props.pages ? "$" : ""}${props.summary}`}</span>
				)}
			</div>
			{props.button ? (
				<button className="w-24 text-left ">{props.summary2}</button>
			) : (
				<span className="">
					{String(props.summary2)
						.split("")
						.map((letter, index) => (
							<span key={index} className={`${char.includes(letter) && "text-[#007BFF]"} text-md `}>
								{letter}
							</span>
						))}
				</span>
			)}
		</div>
	);
}
