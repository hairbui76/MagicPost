"use client";

import IncomingOrderSummary from "./IncomingOrderSummary";
import { useState } from "react";
import { Moment } from "moment";
import Actions from "../../components/Actions/Actions";
import { confirmOrders, rejectOrders } from "@/app/staff/utils/deliveries";
import Table from "@/components/legacy/Table/Table";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import { toast } from "react-toastify";
import Pagination from "@/components/Pagination/Pagination";
import { Address } from "@/app/staff/utils/orders";
import DeliveryOrderFilter from "../../components/DeliveryOrderFilter";

async function filterIncomingOrders(
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

export default function IncomingOrderTable() {
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
	const [filterToggle, setFilterToggle] = useState(false);

	const { isLoading, error, data } = useQuery({
		queryKey: ["incoming", filterToggle, pageNumber],
		queryFn: () =>
			filterIncomingOrders(
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
				{...{
					pointFilter,
					setPointFilter,
					timeRange,
					setTimeRange,
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
				onConfirm={() => confirmOrders(selectedOrders, "incoming")}
				onReject={() => rejectOrders(selectedOrders, rejectReason, "incoming")}
			/>
			<Table columnHeadings={["", "ID", "From", "Time of Delivery"]}>
				{data?.data.data.map(
					({
						id,
						from,
						deliveryTime,
					}: {
						id: string;
						from: string;
						deliveryTime: string;
					}) => {
						const selected =
							selectedOrders.findIndex((selectedId) => selectedId === id) !==
							-1;
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
					}
				)}
			</Table>
			<Pagination
				numberOfPages={data?.data.totalPage || 1}
				setPageNumber={setPageNumber}
				pageNumber={pageNumber}
			/>
		</div>
	);
}
