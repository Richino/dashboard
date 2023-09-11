import SideNav from "@/components/navbars/side";
import "./globals.scss";
import { Inter } from "next/font/google";
import TopNav from "@/components/navbars/top";
import StateProvider from "@/redux/provider";
import BottomNav from "@/components/navbars/bottom";
import { ThemeProvider } from "@/components/theme";
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
	title: "Dashboard",
	description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" id="html" suppressHydrationWarning>
			<body className={`${inter.className}  w-screen overflow-hidden text-sm transition-colors `}>
				<ThemeProvider attribute="class" enableSystem={false}>
					<StateProvider>
						<div className="flex h-[100svh] max-h-[100svh] w-full overflow-hidden bg-neutral-50 text-neutral-800 dark:bg-neutral-900">
							<SideNav />
							<div className=" h-full w-full flex-col">
								<TopNav />
								{children}
								{<BottomNav />}
							</div>
						</div>
					</StateProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
