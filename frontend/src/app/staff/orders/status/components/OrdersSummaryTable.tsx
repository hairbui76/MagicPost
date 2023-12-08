"use client";
import { OrderProps } from "@/app/staff/types/Order/orders";
import { useState } from "react";
import OrderSummary from "./OrderSummary";

export default function OrdersSummaryTable({
	orders,
}: {
	orders: Array<OrderProps>;
}) {
	const [pageNumber, setPageNumber] = useState(1);
	return (
		<div className="overflow-x-auto bg-custom-white">
			<table className="table table-sm ">
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
							<th className="text-center text-sm" key={index}>
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{orders.map((order, index) => (
						<OrderSummary
							key={order.id}
							order={order}
							visible={Math.floor(index / 20 + 1) === pageNumber}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
}
