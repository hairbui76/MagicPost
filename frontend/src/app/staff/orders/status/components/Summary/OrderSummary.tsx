import { OrderProps } from "@/app/staff/types/Order/orders";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import TableRow from "@/app/staff/components/Table/TableRow";
import { formatDate } from "@/utils/helper";

export default function OrderSummary({ order }: { order: OrderProps }) {
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
					href={`/staff/orders/status/${order.id}`}
				>
					{order.id}
				</Link>
			</td>
			{[formatDate(order.createdAt!), order.packageInfo.type, order.status].map(
				(cell, index) => (
					<td className="text-center text-xs" key={index}>
						{cell}
					</td>
				)
			)}
		</TableRow>
	);
}
