import OrderLink from "@/app/staff/components/Order/OrderLink/OrderLink";
import TableRow from "@/components/legacy/Table/TableRow";
import { formatDate } from "@/utils/helper";

export default function WaitingOrderSummary({
	id,
	createdAt,
	type,
	receiverName,
	selected,
	onChange,
}: {
	id: string | undefined;
	createdAt: string | undefined;
	type: string;
	receiverName: string;
	selected: boolean;
	onChange: () => void;
}) {
	return (
		<TableRow>
			<td className="flex justify-center items-center">
				<input
					type="checkbox"
					className="checkbox border-custom-text-color border-1 checkbox-sm rounded-sm"
					onChange={onChange}
					checked={selected}
				/>
			</td>
			<td>
				<OrderLink id={id as string} />
			</td>
			<td className="text-center text-xs">{formatDate(createdAt as string)}</td>
			<td className="text-center text-xs">{receiverName}</td>
			<td className="text-center text-xs">{type}</td>
		</TableRow>
	);
}
