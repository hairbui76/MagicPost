"use client";
import Pagination from "@/app/staff/components/Pagination/Pagination";
import Table from "@/app/staff/components/Table/Table";
import { OrderProps } from "@/app/staff/types/Order/orders";
import compareAsc from "date-fns/compareAsc";
import { Moment } from "moment";
import { useState } from "react";
import OrderFilter from "./OrderFilter";
import OrderSummary from "./OrderSummary";

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
			<Table columnHeadings={["", "ID", "Created At", "Category", "Status"]}>
				{filterOrders(orders).map((order, index) =>
					Math.floor(index / 20 + 1) === pageNumber ? (
						<OrderSummary key={order.id} order={order} />
					) : null
				)}
			</Table>
			<Pagination
				numberOfPages={Math.floor(filterOrders(orders).length / 20 + 1)}
				pageNumber={pageNumber}
				setPageNumber={setPageNumber}
			/>
		</div>
	);
}
