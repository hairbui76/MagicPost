"use client";
import {
	Dispatch,
	SetStateAction,
	createContext,
	useEffect,
	useState,
} from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type MenuKey = "home" | "forum" | "resources" | "account";

export type AppContextProps = {
	menuKey: MenuKey;
	setMenuKey: Dispatch<SetStateAction<MenuKey>>;
	user: any;
	setUser: Dispatch<SetStateAction<any>>;
};

const AppContext = createContext<AppContextProps | null>(null);

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [menuKey, setMenuKey] = useState<MenuKey>("home");
	const [user, setUser] = useState(null);
	useEffect(() => {
		(async () => {
			const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}`, {
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
		<AppContext.Provider value={{ menuKey, setMenuKey, user, setUser }}>
			{children}
			<ToastContainer />
		</AppContext.Provider>
	);
};

export default AppContext;

export { AppContextProvider };
