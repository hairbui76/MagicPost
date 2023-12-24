"use client";

import Table from "@/app/staff/components/Table/Table";
import {
	DeliveryHistoryProps,
	getDeliveryHistory,
} from "@/app/staff/utils/deliveries";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import HistoryItem from "./HistoryItem";
import uniqid from "uniqid";
import { useState } from "react";
import HistoryFilter from "./HistoryFilter";
import compareAsc from "date-fns/compareAsc";
import { Moment } from "moment";

export default function HistoryTable() {
	const { isLoading, error, data } = useQuery({
		queryKey: ["delivery-history"],
		queryFn: getDeliveryHistory,
	});
	const [typeFilter, setTypeFilter] = useState("");
	const [statusFilter, setStatusFilter] = useState("");
	const [timeRange, setTimeRange] = useState<Array<Moment | null>>([
		null,
		null,
	]);

	function filter(history: Array<DeliveryHistoryProps>) {
		return history.filter((event) => {
			if (typeFilter !== "" && typeFilter !== event.type) return false;
			if (statusFilter !== "" && statusFilter !== event.status) return false;
			if (!timeRange) return true;
			if (
				timeRange[0] &&
				compareAsc(timeRange[0].toDate(), new Date(event.time || "")) === 1
			) {
				return false;
			}
			if (
				timeRange[1] &&
				compareAsc(timeRange[1].toDate(), new Date(event.time || "")) === -1
			) {
				return false;
			}
			return true;
		});
	}

	if (isLoading) return <div>Loading...</div>;

	if (error) toast.error(error.message);

	return (
		<div className="flex flex-col gap-4">
			<HistoryFilter
				{...{
					statusFilter,
					setStatusFilter,
					timeRange,
					setTimeRange,
					typeFilter,
					setTypeFilter,
				}}
			/>
			<Table
				columnHeadings={[
					"Order ID",
					"Delivery ID",
					"Type",
					"From/To",
					"Time",
					"Status",
					"Reason",
				]}
			>
				{data
					? filter(data.history).map((event: DeliveryHistoryProps) => (
							<HistoryItem key={uniqid()} {...event} />
					  ))
					: null}
			</Table>
		</div>
	);
}
