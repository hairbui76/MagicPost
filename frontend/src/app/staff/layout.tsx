"use client";
import { useState, createContext, Dispatch, SetStateAction } from "react";
import { Content, Header, Nav } from "./components";

export const CollapsedContext = createContext({
	collapsed: true,
	setCollapsed: (() => {}) as Dispatch<SetStateAction<boolean>>,
});

export default function Layout({
	children,
}: {
	children: Array<React.ReactNode>;
}) {
	const [collapsed, setCollapsed] = useState(true);
	return (
		<CollapsedContext.Provider value={{ collapsed, setCollapsed }}>
			<div className="h-screen">
				<Header onToggle={() => setCollapsed(!collapsed)} />
				<div className="flex h-screen pt-16 relative">
					<Nav />
					<Content>{children}</Content>
				</div>
			</div>
		</CollapsedContext.Provider>
	);
}
