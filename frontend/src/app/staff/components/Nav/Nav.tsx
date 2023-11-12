"use client";
import Menu from "./Menu";
import AppContext from "@/contexts/AppContext";
import { AppContextProps } from "@/contexts/AppContext";
import { useContext } from "react";
export default function Nav() {
	const { collapsed } = useContext(AppContext) as AppContextProps;
	return (
		<nav
			className={`${
				collapsed ? "hidden" : ""
			} w-56 flex-shrink-0 absolute top-0 left-0 pt-16 z-[9998] bg-base-100 h-full`}
		>
			<Menu />
		</nav>
	);
}
