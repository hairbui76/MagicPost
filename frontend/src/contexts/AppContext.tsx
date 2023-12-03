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
import { getUser } from "../utils/index";

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
			try {
				const res = await getUser();
				setUser(res.user);
				console.log("Authenticated!!!");
			} catch (e) {
				console.log(e);
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
