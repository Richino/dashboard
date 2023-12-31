"use client";
import Card from "@/components/dashboard/cards";
import Chart from "@/components/dashboard/chart";
import Users from "@/components/dashboard/users";
import Reminders from "@/components/dashboard/reminder";
import Message from "@/components/dashboard/messages";
import nprogress from "nprogress";
import { useEffect } from "react";

export default function Home() {
	useEffect(() => {
		nprogress.done();
	}, []);

	return (
		<main className="text-neutral-800 flex flex-col gap-5  p-5 overflow-y-auto h-[calc(100%-55px)] dark:text-neutral-400">
			<div className="font-semibold text-2xl">Dashboard</div>
			<div className="grid grid-cols-1 gap-5 laptop-sm:grid-cols-2 laptop-lg:grid-cols-4">
				<Card title="Update" summary={"Sales revenue increased by 20% in 1 week"} summary2="See analytics" button={true} />
				<Card title="Net Revenue" summary={12300} summary2="5% vs last month" />
				<Card title="Weekly Sales" summary={2400} summary2="71% of goal" />
				<Card title="Page Visits" summary={423} summary2="22% higher" pages={true} />
			</div>
			<div className="grid grid-cols-1 gap-5 laptop-sm:grid-cols-2 laptop-lg:grid-cols-4">
				<Chart />
				<Reminders />
				<Message />
				<Users />
			</div>
		</main>
	);
}
