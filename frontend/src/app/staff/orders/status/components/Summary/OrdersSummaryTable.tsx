"use client";
import { OrderProps } from "@/app/staff/types/Order/orders";
import SummaryTable from "@/components/SummaryTable";
import OrderContext, { OrderContextProps } from "@/contexts/OrderContext";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import { compareAsc } from "date-fns";
import { Moment } from "moment";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import OrderFilter from "./OrderFilter";

async function filterOrders(
	pageNumber: number,
	statusFilter?: string,
	categoryFilter?: string,
	startDate?: Date,
	endDate?: Date
) {
	const filter: { [key: string]: string } = {
		pageNumber: pageNumber.toString(),
	};
	if (statusFilter) filter[`status`] = statusFilter;
	if (categoryFilter) filter[`category`] = categoryFilter;
	if (startDate) filter[`startDate`] = startDate.toISOString();
	if (endDate) filter[`endDate`] = endDate.toISOString();
	return fetch(
		`${process.env.NEXT_PUBLIC_ORDER_ENDPOINT}/filter?` +
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

const columnHeadings = [
	{
		label: "ID",
		value: "id",
	},
	{
		label: "Created At",
		value: "createdAt",
	},
	{
		label: "Category",
		value: "category",
	},
	{
		label: "Status",
		value: "status",
	},
];

export default function OrdersSummaryTable({
	orders,
}: {
	orders: Array<OrderProps>;
}) {
	const [pageNumber, setPageNumber] = useState(1);
	const [totalPage, setTotalPage] = useState(1);
	const [statusFilter, setStatusFilter] = useState("");
	const [timeRange, setTimeRange] = useState<Array<Moment | null>>([
		null,
		null,
	]);
	const [categoryFilter, setCategoryFilter] = useState("");

	const { setOrders } = useContext(OrderContext) as OrderContextProps;
	const {
		isPending,
		error,
		data: response,
	} = useQuery({
		queryKey: ["orders", statusFilter, timeRange, categoryFilter],
		queryFn: () =>
			filterOrders(
				pageNumber,
				statusFilter,
				categoryFilter,
				timeRange[0]?.toDate(),
				timeRange[1]?.toDate()
			),
	});

	useEffect(() => {
		if (response) {
			toast.success(response.message);
			setOrders(response.data.data);
			setTotalPage(response.data.totalPage);
		}
	}, [response, setOrders]);

	if (isPending) return <Skeleton active />;

	if (error) toast.error(error.message);

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
				columnHeadings={columnHeadings}
				filter={filter}
				pageNumber={pageNumber}
				totalPage={totalPage}
				setPageNumber={setPageNumber}
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
