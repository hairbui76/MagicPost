"use client";

import { DeliveryHistoryProps } from "@/app/staff/utils/deliveries";
import { Address } from "@/app/staff/utils/orders";
import Pagination from "@/components/Pagination/Pagination";
import Table from "@/components/legacy/Table/Table";
import { useQuery } from "@tanstack/react-query";
import { Moment } from "moment";
import { useState } from "react";
import { toast } from "react-toastify";
import uniqid from "uniqid";
import HistoryFilter from "./HistoryFilter";
import HistoryItem from "./HistoryItem";

async function filterHistory(
	pageNumber: number,
	startDate?: Date,
	endDate?: Date,
	type?: string,
	status?: string,
	province?: string | undefined | null,
	district?: string | undefined | null,
	ward?: string | undefined | null
) {
	const filter: { [key: string]: string } = {
		pageNumber: pageNumber.toString(),
	};
	if (startDate) filter[`startDate`] = startDate.toISOString();
	if (endDate) filter[`endDate`] = endDate.toISOString();
	if (type) filter["type"] = type;
	if (status) filter["status"] = status;
	if (province) filter[`province`] = province;
	if (district) filter[`district`] = district;
	if (ward) filter[`province`] = ward;

	return fetch(
		`${process.env.NEXT_PUBLIC_DELIVERY_ENDPOINT}/getDeliveryHistory?` +
			new URLSearchParams(filter),
		{ credentials: "include" }
	).then(async (res) => {
		if (res.status !== 200) {
			const json = await res.json();
			throw new Error(json.message);
		}
		return res.json();
	});
}

export default function HistoryTable() {
	const [typeFilter, setTypeFilter] = useState("");
	const [statusFilter, setStatusFilter] = useState("");
	const [timeRange, setTimeRange] = useState<Array<Moment | null>>([
		null,
		null,
	]);
	const [pointFilter, setPointFilter] = useState<Address>({
		province: "",
		district: "",
		ward: "",
	});
	const [filterToggle, setFilterToggle] = useState(false);
	const [pageNumber, setPageNumber] = useState(1);

	const { isLoading, error, data } = useQuery({
		queryKey: ["history", filterToggle, pageNumber],
		queryFn: () =>
			filterHistory(
				pageNumber,
				timeRange[0]?.toDate(),
				timeRange[1]?.toDate(),
				typeFilter,
				statusFilter,
				pointFilter.province,
				pointFilter.district,
				pointFilter.ward
			),
	});

	if (isLoading) return <div>Loading...</div>;

	if (error) toast.error(error.message);

	return (
		<div className="flex flex-col gap-4">
			<HistoryFilter
				{...{
					pointFilter,
					setPointFilter,
					statusFilter,
					setStatusFilter,
					timeRange,
					setTimeRange,
					typeFilter,
					setTypeFilter,
					handleConfirm: () => setFilterToggle(!filterToggle),
				}}
			/>
			<Table
				columnHeadings={[
					"",
					"Category",
					"To",
					"Address",
					"Point/User",
					"Time",
					"Status",
				]}
			>
				{data?.data.data.map((event: DeliveryHistoryProps) => (
					<HistoryItem key={uniqid()} {...event} />
				))}
			</Table>
			<Pagination
				pageNumber={pageNumber}
				setPageNumber={setPageNumber}
				numberOfPages={data?.data.totalPage || 1}
			/>
		</div>
	);
}
