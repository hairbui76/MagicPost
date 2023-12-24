"use client";
import OrderLink from "@/app/staff/components/Order/OrderLink/OrderLink";
import TableRow from "@/app/staff/components/Table/TableRow";
import { formatDate } from "@/utils/helper";

export default function IncomingOrderSummary({
	id,
	from,
	deliveryTime,
	selected,
	onChange,
}: {
	id: string | undefined;
	from: string;
	deliveryTime: string;
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
			<td className="text-center text-xs">{from}</td>
			<td className="text-center text-xs">{formatDate(deliveryTime)}</td>
		</TableRow>
	);
}
