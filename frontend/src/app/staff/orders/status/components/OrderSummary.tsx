import { OrderProps } from "@/app/staff/types/Order/orders";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

export default function OrderSummary({ order }: { order: OrderProps }) {
	const router = useRouter();
	return (
		<tr onClick={() => router.push(`/view/${order.id}`)}>
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
