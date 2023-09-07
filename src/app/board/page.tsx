"use client";
import KanbanBoard from "@/components/board";
import nprogress from "nprogress";
import path from "path";
import { useEffect, useRef, useState } from "react";

export default function Page() {
	useEffect(() => {
		nprogress.done();
	}, [path]);

	return <KanbanBoard />;
}
