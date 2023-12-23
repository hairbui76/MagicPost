"use client";

import Table from "@/app/staff/components/Table/Table";
import { OrderProps } from "@/app/staff/types/Order/orders";
import OutgoingOrderSummary from "./OutgoingOrderSummary";
import { Dispatch, SetStateAction, useState } from "react";
import Pagination from "@/app/staff/components/Pagination/Pagination";
import { Moment } from "moment";
import OutgoingOrderFilter from "./OutgoingOrderFilter";
import Actions from "../../components/Actions/Actions";
import { confirmOrders, rejectOrders } from "@/app/staff/utils/deliveries";

export default function OutgoingOrderTable({
	orders,
	selectedOrders,
	setSelectedOrders,
}: {
	orders: Array<OrderProps & { to: string; arrivedAt: string }>;
	selectedOrders: Array<string>;
	setSelectedOrders: Dispatch<SetStateAction<string[]>>;
}) {
	const [pageNumber, setPageNumber] = useState(1);
	const [timeRange, setTimeRange] = useState<Array<Moment | null>>([
		null,
		null,
	]);
	const [desFilter, setDesFilter] = useState("");
	const [selectAll, setSelectAll] = useState(false);
	const [rejectReason, setRejectReason] = useState("");
	return (
		<div className="flex flex-col gap-4">
			<OutgoingOrderFilter
				{...{ desFilter, setDesFilter, timeRange, setTimeRange }}
			/>
			<Actions
				selectAll={selectAll}
				onSelectAll={() => {
					setSelectAll(!selectAll);
					!selectAll
						? setSelectedOrders(orders.map((order) => order.id as string))
						: setSelectedOrders([]);
				}}
				selected={!!selectedOrders.length}
				rejectReason={rejectReason}
				setRejectReason={setRejectReason}
				onConfirm={() => confirmOrders(selectedOrders, "outgoing")}
				onReject={() => rejectOrders(selectedOrders, rejectReason, "outgoing")}
			/>
			<Table columnHeadings={["", "ID", "Arrived At", "Next Point"]}>
				{orders.map(({ id, to, arrivedAt }) => {
					const selected =
						selectedOrders.findIndex((selectedId) => selectedId === id) !== -1;
					const onChange = () => {
						const index = selectedOrders.findIndex(
							(selectedId) => selectedId === id
						);
						if (index === -1) {
							setSelectedOrders([...selectedOrders, id as string]);
						} else {
							setSelectedOrders(
								selectedOrders.filter((selectedId) => selectedId !== id)
							);
						}
					};
					return (
						<OutgoingOrderSummary
							key={id}
							{...{ id, to, arrivedAt, selected, onChange }}
						/>
					);
				})}
			</Table>
			<Pagination
				numberOfPages={Math.floor(orders.length / 20 + 1)}
				pageNumber={pageNumber}
				setPageNumber={setPageNumber}
			/>
		</div>
	);
}
