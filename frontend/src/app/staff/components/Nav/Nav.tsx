import Menu from "./Menu";
export default function Nav({ collapsed }: { collapsed: boolean }) {
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
