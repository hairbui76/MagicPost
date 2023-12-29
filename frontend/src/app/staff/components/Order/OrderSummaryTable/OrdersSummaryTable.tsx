"use client";

import SummaryTable from "@/components/SummaryTable";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import { Moment } from "moment";
import { useState } from "react";
import { toast } from "react-toastify";
import OrderFilter from "./OrderFilter";
import Actions from "../../Actions/Actions";

const columnHeadings = [
	{
		label: "Created At",
		value: "createdAt",
	},
	{
		label: "Sender",
		value: "sender.name",
	},
	{
		label: "From",
		value: "sender.address.name",
	},
	{
		label: "Receiver",
		value: "receiver.name",
	},
	{
		label: "To",
		value: "receiver.address.name",
	},
	{
		label: "Category",
		value: "packageInfo.type",
	},
	{
		label: "Status",
		value: "status",
	},
];

export default function OrdersSummaryTable({
	filterOrders,
	action,
}: {
	filterOrders: any;
	action?: any;
}) {
	const [pageNumber, setPageNumber] = useState(1);
	const [statusFilter, setStatusFilter] = useState("");
	const [timeRange, setTimeRange] = useState<Array<Moment | null>>([
		null,
		null,
	]);
	const [categoryFilter, setCategoryFilter] = useState("");
	const [filterToggle, setFilterToggle] = useState(false);
	const [selected, setSelected] = useState<string[]>([]);
	const [selectAll, setSelectAll] = useState(false);
	const [reason, setReason] = useState("");
	const [refreshFactor, setRefreshFactor] = useState(0);

	function onSelectToggle(id: string) {
		const index = selected.findIndex((selectedId) => selectedId === id);
		if (index === -1) {
			setSelected([...selected, id]);
		} else {
			setSelected([...selected.slice(0, index), ...selected.slice(index + 1)]);
		}
	}

	const { isPending, error, data } = useQuery({
		queryKey: ["orders", filterToggle, pageNumber, refreshFactor],
		queryFn: () => {
			setSelected([]);
			return filterOrders({
				pageNumber,
				status: statusFilter,
				category: categoryFilter,
				startDate: timeRange[0]?.toDate(),
				endDate: timeRange[1]?.toDate(),
			});
		},
	});

	if (isPending) return <Skeleton active />;

	if (error) toast.error(error.message);

	if (data)
		return (
			<div className="flex flex-col items-center gap-4">
				<SummaryTable
					items={data.data.data}
					totalPage={data.data.totalPage}
					{...{
						columnHeadings,
						pageNumber,
						setPageNumber,
						selected,
						onSelectToggle: action && onSelectToggle,
					}}
				>
					{action && (
						<Actions
							selected={!!selected.length}
							onConfirm={() =>
								action({
									orders: selected,
									confirm: true,
								})
							}
							onReject={() =>
								action({
									orders: selected,
									confirm: false,
									reason,
								})
							}
							{...{ reason, setReason }}
							selectAll={selectAll}
							onSelectAll={() => {
								setSelectAll(!selectAll);
								setSelected(
									selectAll
										? []
										: [...data.data.data.map((order: any) => order.id)]
								);
							}}
							onRefresh={() => setRefreshFactor(refreshFactor + 1)}
						/>
					)}
					<OrderFilter
						{...{
							statusFilter,
							setStatusFilter,
							timeRange,
							setTimeRange,
							categoryFilter,
							setCategoryFilter,
							handleConfirm: () => setFilterToggle(!filterToggle),
						}}
					/>
				</SummaryTable>
			</div>
		);
}
