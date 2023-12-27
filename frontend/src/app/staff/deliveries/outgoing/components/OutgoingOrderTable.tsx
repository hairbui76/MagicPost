"use client";

import OutgoingOrderSummary from "./OutgoingOrderSummary";
import { useState } from "react";
import { Moment } from "moment";
import Actions from "../../components/Actions/Actions";
import { confirmOrders, rejectOrders } from "@/app/staff/utils/deliveries";
import Table from "@/components/legacy/Table/Table";
import Pagination from "@/components/Pagination/Pagination";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Skeleton } from "antd";
import DeliveryOrderFilter from "../../components/DeliveryOrderFilter";
import { Address } from "@/app/staff/utils/orders";

async function filterOutgoingOrders(
	pageNumber: number,
	startDate?: Date,
	endDate?: Date,
	province?: string | undefined | null,
	district?: string | undefined | null,
	ward?: string | undefined | null
) {
	const filter: { [key: string]: string } = {
		pageNumber: pageNumber.toString(),
	};
	if (startDate) filter[`startDate`] = startDate.toISOString();
	if (endDate) filter[`endDate`] = endDate.toISOString();
	if (province) filter[`province`] = province;
	if (district) filter[`district`] = district;
	if (ward) filter[`province`] = ward;

	return fetch(
		`${process.env.NEXT_PUBLIC_ORDER_ENDPOINT}/outgoing?` +
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

export default function OutgoingOrderTable() {
	const [selectedOrders, setSelectedOrders] = useState<Array<string>>([]);
	const [timeRange, setTimeRange] = useState<Array<Moment | null>>([
		null,
		null,
	]);
	const [selectAll, setSelectAll] = useState(false);
	const [rejectReason, setRejectReason] = useState("");
	const [pageNumber, setPageNumber] = useState(1);
	const [pointFilter, setPointFilter] = useState<Address>({
		province: "",
		district: "",
		ward: "",
	});
	const { isLoading, error, data } = useQuery({
		queryKey: ["incoming", timeRange, pointFilter],
		queryFn: () =>
			filterOutgoingOrders(
				pageNumber,
				timeRange[0]?.toDate(),
				timeRange[1]?.toDate(),
				pointFilter.province,
				pointFilter.district,
				pointFilter.ward
			),
	});

	if (isLoading) return <Skeleton active />;

	if (error) toast.error(error.message);
	return (
		<div className="flex flex-col gap-4">
			<DeliveryOrderFilter
				{...{ pointFilter, setPointFilter, timeRange, setTimeRange }}
			/>
			<Actions
				selectAll={selectAll}
				onSelectAll={() => {
					setSelectAll(!selectAll);
					!selectAll
						? setSelectedOrders(
								data.data.data.map((order) => order.id as string)
						  )
						: setSelectedOrders([]);
				}}
				selected={!!selectedOrders.length}
				rejectReason={rejectReason}
				setRejectReason={setRejectReason}
				onConfirm={() => confirmOrders(selectedOrders, "outgoing")}
				onReject={() => rejectOrders(selectedOrders, rejectReason, "outgoing")}
			/>
			<Table columnHeadings={["", "ID", "Arrived At", "Next Point"]}>
				{data?.data.data.map(({ id, to, arrivedAt }) => {
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
				numberOfPages={data?.data.totalPage || 1}
				setPageNumber={setPageNumber}
				pageNumber={pageNumber}
			/>
		</div>
	);
}
