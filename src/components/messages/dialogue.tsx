import { Dialogue } from "./interface";

export default function Dialogue({ dialogue }: Dialogue) {
	return (
		<div className="text relative flex  w-full flex-col gap-5 overflow-y-auto p-5">
			{dialogue.map((message, index) => (
				<div key={index} className={`w-full`}>
					<p
						className={`${
							message.id === 2
								? "float-right bg-blue-700 text-white"
								: "float-left border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50"
						} w-auto max-w-[80%]  rounded-3xl p-5 laptop-sm:max-w-[45%]`}>
						{message.content}
					</p>
				</div>
			))}
		</div>
	);
}
