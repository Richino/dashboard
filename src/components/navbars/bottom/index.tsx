"use client";
import { usePathname } from "next/navigation";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";


export default function Navigation() {
	const path = usePathname();
	if (path.startsWith("/orders") || path.startsWith("/inventory") || path.startsWith("/team") || path.startsWith("/customers")) {
		return (
			<div className="dark:bg-neutral-950 dark:border-neutral-800 sticky bottom-0 hidden flex-col  gap-5 border-dashed  border-t border-neutral-100 bg-white p-5 text-neutral-600 laptop-sm:flex">
				<div className="grid place-items-center">
					<div className="flex items-center justify-between gap-5 text-neutral-600 dark:text-neutral-400">
						<button>
							<BiChevronLeft size={16} />
						</button>
						<div className="flex gap-5 text-neutral-600 dark:text-neutral-400">
							<button className="text-blue-500">1</button>
							<button>2</button>
							<button>3</button>
							<button>4</button>
							<div>...</div>
							<button>20</button>
						</div>
						<button>
							<BiChevronRight size={16} />
						</button>
					</div>
				</div>
			</div>
		);
	} else {
		return null;
	}
}
