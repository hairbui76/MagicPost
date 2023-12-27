import OrderLink from "@/app/staff/components/Order/OrderLink/OrderLink";
import TableRow from "@/components/legacy/Table/TableRow";
import { formatDate } from "@/utils/helper";

export default function OutgoingOrderSummary({
	id,
	to,
	arrivedAt,
	selected,
	onChange,
}: {
	id: string | undefined;
	to: string;
	arrivedAt: string;
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
			<td className="text-center text-xs">{formatDate(arrivedAt)}</td>
			<td className="text-center text-xs">{to}</td>
		</TableRow>
	);
}
