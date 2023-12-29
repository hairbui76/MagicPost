import TableRow from "@/app/staff/components/Table/TableRow";
import { formatDate } from "@/utils/helper";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Summary<T extends DatabaseTableProps>({
	item,
	headers,
	selected = false,
	onSelectToggle,
}: {
	item: T;
	headers: Array<{ label: string; value: string }>;
	selected?: boolean;
	onSelectToggle?: ((id: string) => void) | undefined;
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
			if (key === "createdAt") return formatDate(item[key]);
			return item[key];
		});
	};
	return (
		<TableRow>
			{!!onSelectToggle ? (
				<td>
					<input
						type="checkbox"
						className="checkbox checkbox-sm border-1 border-custom-text-color block my-auto"
						onChange={() => onSelectToggle(item.id as string)}
						checked={selected}
					/>
				</td>
			) : null}
			<td>
				<Link className="mx-auto block w-fit" href={`${pathname}/${item.id}`}>
					<FontAwesomeIcon icon={faEye} />
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
