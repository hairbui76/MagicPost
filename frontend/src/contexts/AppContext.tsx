"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Dispatch, SetStateAction, createContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type MenuKey = "home" | "forum" | "resources" | "account";

export type AppContextProps = {
	menuKey: MenuKey;
	setMenuKey: Dispatch<SetStateAction<MenuKey>>;
	user: any;
	setUser: Dispatch<SetStateAction<any>>;
};

const queryClient = new QueryClient();

const AppContext = createContext<AppContextProps | null>(null);

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [menuKey, setMenuKey] = useState<MenuKey>("home");
	const [user, setUser] = useState(null);

	return (
		<AppContext.Provider value={{ menuKey, setMenuKey, user, setUser }}>
			<QueryClientProvider client={queryClient}>
				{children}
				<ToastContainer style={{ fontSize: "0.8rem" }} />
			</QueryClientProvider>
		</AppContext.Provider>
	);
};

export default AppContext;

export { AppContextProvider };
