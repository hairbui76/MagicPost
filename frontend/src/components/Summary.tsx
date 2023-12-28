import TableRow from "@/app/staff/components/Table/TableRow";
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
	const mapHeaders = (
		headers: Array<{ label: string; value: string }>,
		item: T
	) => {
		return headers.map(({ value: key }) => {
			if (key.includes(".")) {
				const keys = key.split(".");
				return keys.reduce((nestedItem: { [key: string]: any }, k: string) => {
					return nestedItem[k];
				}, item);
			}
			return item[key];
		});
	};
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
			{mapHeaders(headers, item).map((value, index) => (
				<td className="text-center text-xs" key={index}>
					{value}
				</td>
			))}
		</TableRow>
	);
}
