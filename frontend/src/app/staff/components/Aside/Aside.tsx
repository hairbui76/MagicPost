"use client";
import Menu from "./Menu";
import AppContext from "@/contexts/AppContext";
import { AppContextProps } from "@/contexts/AppContext";
import { useContext } from "react";
export default function Aside() {
	const { collapsed } = useContext(AppContext) as AppContextProps;
	return (
		<aside className={`${collapsed ? "hidden" : ""} w-80`}>
			<Menu />
		</aside>
	);
}
