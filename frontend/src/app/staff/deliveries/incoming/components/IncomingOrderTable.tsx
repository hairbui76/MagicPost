"use client";

import Table from "@/app/staff/components/Table/Table";
import { OrderProps } from "@/app/staff/types/Order/orders";
import IncomingOrderSummary from "./IncomingOrderSummary";
import { Dispatch, SetStateAction, useState } from "react";
import Pagination from "@/app/staff/components/Pagination/Pagination";
import { Moment } from "moment";
import IncomingOrderFilter from "./IncomingOrderFilter";
import Actions from "../../components/Actions/Actions";
import { confirmOrders, rejectOrders } from "@/app/staff/utils/deliveries";

export default function IncomingOrderTable({
	orders,
	selectedOrders,
	setSelectedOrders,
}: {
	orders: Array<OrderProps & { from: string; deliveryTime: string }>;
	selectedOrders: Array<string>;
	setSelectedOrders: Dispatch<SetStateAction<string[]>>;
}) {
	const [pageNumber, setPageNumber] = useState(1);
	const [timeRange, setTimeRange] = useState<Array<Moment | null>>([
		null,
		null,
	]);
	const [sourceFilter, setSourceFilter] = useState("");
	const [selectAll, setSelectAll] = useState(false);
	const [rejectReason, setRejectReason] = useState("");
	console.log(orders);
	return (
		<div className="flex flex-col gap-4">
			<IncomingOrderFilter
				{...{ sourceFilter, setSourceFilter, timeRange, setTimeRange }}
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
				onConfirm={() => confirmOrders(selectedOrders, "incoming")}
				onReject={() => rejectOrders(selectedOrders, rejectReason, "incoming")}
			/>
			<Table columnHeadings={["", "ID", "From", "Time of Delivery"]}>
				{orders.map(({ id, from, deliveryTime }) => {
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
						<IncomingOrderSummary
							key={id}
							{...{ id, from, deliveryTime, selected, onChange }}
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
