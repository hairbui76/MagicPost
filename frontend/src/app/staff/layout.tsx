"use client";
import { Nav, Content, Header } from "./components";
import { useState } from "react";

export default function Layout({
	children,
}: {
	children: Array<React.ReactNode>;
}) {
	const [collapsed, setCollapsed] = useState(true);
	return (
		<>
			<div className="h-screen">
				<Header onToggle={() => setCollapsed(!collapsed)} />
				<div className="flex h-screen pt-16 relative">
					<Nav collapsed={collapsed} />
					<Content>{children}</Content>
				</div>
			</div>
		</>
	);
}
