"use client";

import Pagination from "@/components/Pagination/Pagination";
import Table from "@/components/legacy/Table/Table";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import { Moment } from "moment";
import { useState } from "react";
import { toast } from "react-toastify";
import Actions from "../../../components/Actions/Actions";
import WaitingOrderFilter from "./WaitingOrderFilter";
import { OrderProps } from "@/app/staff/types/Order/orders";
import WaitingOrderSummary from "./WaitingOrderSummary";

async function filterWaitingOrders(
	pageNumber: number,
	startDate?: Date,
	endDate?: Date,
	categoryFilter?: string
) {
	const filter: { [key: string]: string } = {
		pageNumber: pageNumber.toString(),
	};
	if (startDate) filter[`startDate`] = startDate.toISOString();
	if (endDate) filter[`endDate`] = endDate.toISOString();
	if (categoryFilter) filter[`category`] = categoryFilter;

	return fetch(
		`${process.env.NEXT_PUBLIC_ORDER_ENDPOINT}/waiting?` +
			new URLSearchParams(filter),
		{
			credentials: "include",
		}
	).then(async (res) => {
		if (res.status !== 200) {
			const json = await res.json();
			throw new Error(json.message);
		}
		return res.json();
	});
}

async function confirmOrders(orders: Array<string>) {
	try {
		const json = await fetch(
			`${process.env.NEXT_PUBLIC_ORDER_ENDPOINT}/waiting/confirm`,
			{
				credentials: "include",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					orders,
				}),
			}
		).then(async (response) => {
			if (response.status !== 200) {
				const message = await Promise.resolve(response.json()).then(
					(json) => json.message
				);
				throw new Error(message);
			}
			return response.json();
		});
		toast.success(json.message);
		return json;
	} catch (err: any) {
		toast.error(err.message);
	}
}

async function rejectOrders(orders: Array<string>, rejectReason: string) {
	try {
		const json = await fetch(
			`${process.env.NEXT_PUBLIC_ORDER_ENDPOINT}/waiting/reject`,
			{
				credentials: "include",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ orders, reason: rejectReason }),
			}
		).then(async (response) => {
			if (response.status !== 200) {
				const message = await Promise.resolve(response.json()).then(
					(json) => json.message
				);
				throw new Error(message);
			}
			return response.json();
		});
		toast.success(json.message);
		return json;
	} catch (err: any) {
		toast.error(err.message);
	}
}

export default function WaitingOrderTable() {
	const [selectedOrders, setSelectedOrders] = useState<Array<string>>([]);
	const [timeRange, setTimeRange] = useState<Array<Moment | null>>([
		null,
		null,
	]);
	const [selectAll, setSelectAll] = useState(false);
	const [rejectReason, setRejectReason] = useState("");
	const [pageNumber, setPageNumber] = useState(1);
	const [filterToggle, setFilterToggle] = useState(false);
	const [categoryFilter, setCategoryFilter] = useState("");

	const { isLoading, error, data } = useQuery({
		queryKey: ["waiting", filterToggle, pageNumber],
		queryFn: () =>
			filterWaitingOrders(
				pageNumber,
				timeRange[0]?.toDate(),
				timeRange[1]?.toDate(),
				categoryFilter
			),
	});
	if (isLoading) return <Skeleton active />;

	if (error) toast.error(error.message);

	return (
		<div className="flex flex-col gap-4">
			<WaitingOrderFilter
				{...{
					timeRange,
					setTimeRange,
					categoryFilter,
					setCategoryFilter,
					handleConfirm: () => setFilterToggle(!filterToggle),
				}}
			/>
			<Actions
				selectAll={selectAll}
				onSelectAll={() => {
					setSelectAll(!selectAll);
					!selectAll
						? setSelectedOrders(
								data?.data.data.map((order: any) => order.id as string)
						  )
						: setSelectedOrders([]);
				}}
				selected={!!selectedOrders.length}
				rejectReason={rejectReason}
				setRejectReason={setRejectReason}
				onConfirm={() => confirmOrders(selectedOrders)}
				onReject={() => rejectOrders(selectedOrders, rejectReason)}
			/>
			<Table columnHeadings={["", "ID", "Created At", "Receiver", "Type"]}>
				{data?.data.data.map((order: OrderProps) => {
					const { id, createdAt, receiver, packageInfo } = order;
					const { name: receiverName } = receiver;
					const { type } = packageInfo;
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
						<WaitingOrderSummary
							key={id}
							{...{ id, createdAt, receiverName, selected, type, onChange }}
						/>
					);
				})}
			</Table>
			<Pagination
				numberOfPages={data?.data.totalPage || 1}
				setPageNumber={setPageNumber}
				pageNumber={pageNumber}
			/>
		</div>
	);
}
