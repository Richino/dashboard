import { IoCheckmarkOutline } from "react-icons/io5";
import { close } from "@/redux/settings";
import { useDispatch } from "react-redux";
import { BiChevronLeft } from "react-icons/bi";
import { useState } from "react";
const languages = [
	"English",
	"中文",
	"Español",
	"हिन्दी",
	"Français",
	"العربية",
	"বাংলা",
	"Русский",
	"Português",
	"Bahasa Indonesia",
	"اردو",
	"Deutsch",
	"日本語",
	"Kiswahili",
	"मराठी",
	"తెలుగు",
	"Türkçe",
	"தமிழ்",
	"Italiano",
	"ਪੰਜਾਬੀ",
	"ગુજરાતી",
	"Polski",
	"Українська",
	"Nederlands",
	"ไทย",
	"ಕನ್ನಡ",
	"ଓଡ଼ିଆ",
	"Yorùbá",
	"മലയാളം",
	"سنڌي",
];
export default function Language() {
	const dispatch = useDispatch();
	const [index, setIndex] = useState(0);
	return (
		<div className="grid-cols-4 gap-5 p-5 laptop-sm:grid">
			<button className="m-5 ml-0 mt-0 flex w-36 items-center laptop-sm:hidden" onClick={() => dispatch(close())}>
				<BiChevronLeft size={26} />
				<span className="text-xl font-medium">Language</span>
			</button>
			{languages.map((key, i) => (
				<div className={`laptop-sm:border border-neutral-200 flex justify-between rounded p-5 hover:cursor-pointer dark:border-neutral-800 max-h-[60px]`} onClick={() => setIndex(i)}>
					<span>{key}</span>
					<IoCheckmarkOutline size={26} className={`text-blue-700 ${i === index ? "block" : "hidden"}`} />
				</div>
			))}
		</div>
	);
}
