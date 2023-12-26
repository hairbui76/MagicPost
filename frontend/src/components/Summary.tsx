import TableRow from "@/app/staff/components/Table/TableRow";
import { formatDate } from "@/utils/helper";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Summary<T extends DatabaseTableProps>({
	item,
	headers,
}: {
	item: T;
	headers: Array<{ label: string; value: string }>;
}) {
	const pathname = usePathname();
	return (
		<TableRow>
			<td>
				<button type="button" className="mx-auto block">
					<FontAwesomeIcon icon={faBars} />
				</button>
			</td>
			<td>
				<Link
					className="mx-auto block w-fit link text-[#007FFF]"
					href={`${pathname}/${item.id}`}
				>
					{item.id}
				</Link>
			</td>
			{headers.map(({ value }, index) => (
				<td className="text-center text-xs" key={index}>
					{item[value] instanceof Date ? formatDate(item[value]) : item[value]}
				</td>
			))}
		</TableRow>
	);
}
