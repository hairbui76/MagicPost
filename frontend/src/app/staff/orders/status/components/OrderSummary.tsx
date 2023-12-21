import { OrderProps } from "@/app/staff/types/Order/orders";
import { format } from "date-fns";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function OrderSummary({
	order,
	visible = false,
}: {
	order: OrderProps;
	visible?: boolean;
}) {
	return (
		<tr className={`${visible ? "" : "hidden"} border-custom-grey`}>
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
			{[
				format(new Date(order.createdAt!), "MMMM dd, yyyy, HH:mm"),
				order.packageInfo.type,
				order.status,
			].map((cell, index) => (
				<td className="text-center text-xs" key={index}>
					{cell}
				</td>
			))}
		</tr>
	);
}
