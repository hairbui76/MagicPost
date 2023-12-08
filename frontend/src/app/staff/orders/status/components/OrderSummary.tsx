import { OrderProps } from "@/app/staff/types/Order/orders";
import { format } from "date-fns";

export default function OrderSummary({
	order,
	visible = false,
}: {
	order: OrderProps;
	visible?: boolean;
}) {
	return (
		<tr className={`${visible ? "" : "hidden"}`}>
			{[
				"actions",
				order.id,
				format(new Date(order.createdAt!), "yyyy/MM/dd HH:mm:ss"),
				order.packageInfo.type,
				order.sender.name,
				order.receiver.name,
				order.status,
			].map((cell, index) => (
				<td className="text-center" key={index}>
					{cell}
				</td>
			))}
		</tr>
	);
}
