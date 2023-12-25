"use client";
import { OrderProps } from "@/app/staff/types/Order/orders";
import SummaryTable from "@/components/SummaryTable";
import { compareAsc } from "date-fns";
import { Moment } from "moment";
import { useState } from "react";
import OrderFilter from "./OrderFilter";

export default function OrdersSummaryTable({
	orders,
}: {
	orders: Array<OrderProps>;
}) {
	const [statusFilter, setStatusFilter] = useState("");
	const [timeRange, setTimeRange] = useState<Array<Moment | null>>([
		null,
		null,
	]);
	const [categoryFilter, setCategoryFilter] = useState("");
	function filter(orders: Array<OrderProps>) {
		return orders.filter((order) => {
			const { status, packageInfo, createdAt } = order;
			if (statusFilter !== "" && status !== statusFilter) {
				return false;
			}
			if (categoryFilter !== "" && packageInfo.type !== categoryFilter) {
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
			<SummaryTable
				items={orders}
				columnHeadings={["", "ID", "Created At", "Category", "Status"]}
				filter={filter}
			>
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
			</SummaryTable>
		</div>
	);
}
