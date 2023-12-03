import { OrderProps } from "@/app/staff/types/Order/orders";
import OrderSummary from "./OrderSummary";

export default function OrdersSummaryTable({
	orders,
}: {
	orders: Array<OrderProps>;
}) {
	return (
		<div className="overflow-x-auto bg-custom-white">
			<table className="table table-xs ">
				<thead className="text-custom-text-color ">
					<tr>
						{[
							"",
							"ID",
							"Created At",
							"Category",
							"Sender",
							"Receiver",
							"Status",
						].map((header, index) => (
							<th className="text-center" key={index}>
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{orders.map((order) => (
						<OrderSummary key={order.id} order={order} />
					))}
				</tbody>
			</table>
		</div>
	);
}
