"use client";
import { OrderContextProvider } from "@/contexts/OrderContext";
import { StaffContextProvider } from "@/contexts/StaffContext";
import withAuth from "@/utils/withAuth";
import { Dispatch, SetStateAction, createContext, useState } from "react";
import { Content, Header, Nav } from "./components";

export const CollapsedContext = createContext({
	collapsed: true,
	setCollapsed: (() => {}) as Dispatch<SetStateAction<boolean>>,
});

function Layout({ children }: { children: Array<React.ReactNode> }) {
	const [collapsed, setCollapsed] = useState(true);
	return (
		<OrderContextProvider>
			<StaffContextProvider>
				<CollapsedContext.Provider value={{ collapsed, setCollapsed }}>
					<div className="h-screen">
						<Header onToggle={() => setCollapsed(!collapsed)} />
						<div className="flex h-screen relative">
							<Nav />
							<Content>{children}</Content>
						</div>
					</div>
				</CollapsedContext.Provider>
			</StaffContextProvider>
		</OrderContextProvider>
	);
}

export default withAuth(Layout);
