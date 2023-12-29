"use client";

import { confirmOrders, rejectOrders } from "@/app/staff/utils/deliveries";
import { Address } from "@/app/staff/utils/orders";
import Pagination from "@/components/Pagination/Pagination";
import Table from "@/components/legacy/Table/Table";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import { Moment } from "moment";
import { useState } from "react";
import { toast } from "react-toastify";
import Actions from "../../components/Actions/Actions";
import DeliveryOrderFilter from "../../components/DeliveryOrderFilter";
import OutgoingOrderSummary from "./OutgoingOrderSummary";

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
		`${process.env.NEXT_PUBLIC_ORDER_ENDPOINT}/getOutgoingOrders?` +
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
	const [filterToggle, setFilterToggle] = useState(false);
	const [trigger, setTrigger] = useState(false);
	const { isLoading, error, data } = useQuery({
		queryKey: ["outgoing", filterToggle, pageNumber, trigger],
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
	console.log(data?.data.totalPage);
	return (
		<div className="flex flex-col gap-4">
			<DeliveryOrderFilter
				{...{ pointFilter, setPointFilter, timeRange, setTimeRange }}
				handleConfirm={() => setFilterToggle(!filterToggle)}
			/>
			<Actions
				selectAll={selectAll}
				onSelectAll={() => {
					setSelectAll(!selectAll);
					!selectAll
						? setSelectedOrders(
								data.data.data.map((order: any) => order.id as string)
						  )
						: setSelectedOrders([]);
				}}
				selected={!!selectedOrders.length}
				rejectReason={rejectReason}
				setRejectReason={setRejectReason}
				onConfirm={async () => {
					try {
						const response = await confirmOrders(selectedOrders, "outgoing");
						const { message } = await response.json();
						if (response.status === 200) {
							toast.success(message);
							setTrigger(!trigger);
						} else toast.error(message);
					} catch (err: any) {
						toast.error(err);
					}
				}}
				onReject={() => rejectOrders(selectedOrders, rejectReason, "outgoing")}
			/>
			<Table columnHeadings={["", "ID", "Arrived At", "Next Point"]}>
				{data?.data.data.map(
					({
						id,
						to,
						arrivedAt,
					}: {
						id: string;
						to: string;
						arrivedAt: string;
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
							<OutgoingOrderSummary
								key={id}
								{...{ id, to, arrivedAt, selected, onChange }}
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
