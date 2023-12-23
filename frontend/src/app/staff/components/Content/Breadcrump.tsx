import { usePathname } from "next/navigation";

export default function Breadcrumps() {
	const pathname = usePathname();
	return pathname === "/staff" ? null : (
		<div className="text-lg breadcrumbs">
			<ul>
				{pathname
					.replace("/staff/", "")
					.split("/")
					.map((segment) => (
						<li className="overflow-hidden" key={segment}>
							{segment[0].toLocaleUpperCase() + segment.slice(1)}
						</li>
					))}
			</ul>
		</div>
	);
}
