"use client";
import { OrderProps } from "@/app/staff/types/Order/orders";
import { useState } from "react";
import OrderSummary from "./OrderSummary";
import Pagination from "@/app/staff/components/Pagination/Pagination";
import OrderFilter from "./OrderFilter";
import compareAsc from "date-fns/compareAsc";
import { Moment } from "moment";

export default function OrdersSummaryTable({
	orders,
}: {
	orders: Array<OrderProps>;
}) {
	const [pageNumber, setPageNumber] = useState(1);
	const [statusFilter, setStatusFilter] = useState("all");
	const [timeRange, setTimeRange] = useState<Array<Moment | null>>([
		null,
		null,
	]);
	const [categoryFilter, setCategoryFilter] = useState("all");
	console.log(orders);
	function filterOrders(orders: Array<OrderProps>) {
		return orders.filter((order) => {
			const { status, packageInfo, createdAt } = order;
			if (statusFilter !== "all" && status !== statusFilter) {
				return false;
			}
			if (categoryFilter !== "all" && packageInfo.type !== categoryFilter) {
				return false;
			}
			if (!timeRange) {
				return true;
			}
			if (
				timeRange[0] &&
				compareAsc(timeRange[0].toDate(), new Date(createdAt || "")) === 1
			) {
				return false;
			}
			if (
				timeRange[1] &&
				compareAsc(timeRange[1].toDate(), new Date(createdAt || "")) === -1
			) {
				return false;
			}
			return true;
		});
	}

	return (
		<div className="flex flex-col items-center gap-4">
			<OrderFilter
				{...{
					statusFilter,
					setStatusFilter,
					timeRange,
					setTimeRange,
					categoryFilter,
					setCategoryFilter,
				}}
			/>
			<table className="table table-sm overflow-x-auto bg-custom-white rounded-md shadow-md w-full">
				<thead className="text-custom-text-color">
					<tr className="border-b-2 border-custom-grey">
						{["", "ID", "Created At", "Category", "Status"].map(
							(header, index) => (
								<th className="text-center text-sm" key={index}>
									{header}
								</th>
							)
						)}
					</tr>
				</thead>
				<tbody>
					{filterOrders(orders).map((order, index) => (
						<OrderSummary
							key={order.id}
							order={order}
							visible={Math.floor(index / 20 + 1) === pageNumber}
						/>
					))}
				</tbody>
			</table>
			<Pagination
				numberOfPages={Math.floor(orders.length / 20 + 1)}
				pageNumber={pageNumber}
				setPageNumber={setPageNumber}
			/>
		</div>
	);
}
