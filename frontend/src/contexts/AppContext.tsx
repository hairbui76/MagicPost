"use client";
import config from "@/configs/config";
import { usePathname } from "next/navigation";
import {
	Dispatch,
	SetStateAction,
	createContext,
	useEffect,
	useState,
} from "react";

type MenuKey = "home" | "forum" | "resources" | "account";

export type AppContextProps = {
	collapsed: boolean;
	setCollapsed: Dispatch<SetStateAction<boolean>>;
	menuKey: MenuKey;
	setMenuKey: Dispatch<SetStateAction<MenuKey>>;
	user: any;
	setUser: Dispatch<SetStateAction<any>>;
};

const AppContext = createContext<AppContextProps | null>(null);

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [collapsed, setCollapsed] = useState(false);
	const pathname = usePathname();
	const [menuKey, setMenuKey] = useState<MenuKey>("home");
	const [user, setUser] = useState(null);
	useEffect(() => {
		(async () => {
			const res = await fetch(`${config.API_ENDPOINT}/auth`, {
				credentials: "include",
			});
			const response = await res.json();
			if (res.status === 200) {
				console.log("Authenticated!!!");
				setUser(response.user);
			}
		})();
	}, []);

	return (
		<AppContext.Provider
			value={{ collapsed, setCollapsed, menuKey, setMenuKey, user, setUser }}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppContext;

export { AppContextProvider };
