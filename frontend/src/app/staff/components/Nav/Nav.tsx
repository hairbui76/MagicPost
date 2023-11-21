import Menu from "./Menu";
export default function Nav({ collapsed }: { collapsed: boolean }) {
	return (
		<nav
			className={`${
				collapsed ? "hidden" : "absolute sm:relative w-full sm:w-56"
			} z-[9998] bg-base-100 h-full`}
		>
			<Menu />
		</nav>
	);
}
