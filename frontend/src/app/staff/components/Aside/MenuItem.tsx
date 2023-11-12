import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MenuItem({
	label,
	path,
	icon,
}: {
	label: string;
	path: string;
	icon: any;
}) {
	return (
		<li>
			<Link href={path}>
				{<FontAwesomeIcon icon={icon} className="w-3" />}
				{label}
			</Link>
		</li>
	);
}
