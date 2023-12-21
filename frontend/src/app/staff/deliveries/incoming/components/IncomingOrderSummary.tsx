"use client";
import TableRow from "@/app/staff/components/Table/TableRow";
import { formatDate } from "@/utils/helper";
import Link from "next/link";

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
				<Link
					className="mx-auto block w-fit link text-[#007FFF]"
					href={`/staff/orders/status/${id}`}
				>
					{id}
				</Link>
			</td>
			<td className="text-center text-xs">{from}</td>
			<td className="text-center text-xs">{formatDate(deliveryTime)}</td>
		</TableRow>
	);
}
