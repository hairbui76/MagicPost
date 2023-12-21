import { useContext } from "react";
import { CollapsedContext } from "../../layout";
import Menu from "./Menu";
export default function Nav() {
	const { collapsed } = useContext(CollapsedContext);
	return (
		<nav
			className={`${
				collapsed ? "hidden" : "fixed sm:absolute w-full sm:w-56"
			} z-[29] bg-base-100 h-screen pt-16`}
		>
			<Menu />
		</nav>
	);
}
