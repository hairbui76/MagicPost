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
						<li key={segment}>
							<span>{segment[0].toLocaleUpperCase() + segment.slice(1)}</span>
						</li>
					))}
			</ul>
		</div>
	);
}
