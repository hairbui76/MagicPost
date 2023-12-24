"use client";
import Pagination from "@/app/staff/components/Pagination/Pagination";
import Table from "@/app/staff/components/Table/Table";
import { Moment } from "moment";
import { useState } from "react";
import OrderFilter from "./OrderFilter";
import OrderSummary from "./OrderSummary";

type DatabaseTableProps = {
	id: string;
	createdAt: string;
};

function renderItems<T extends DatabaseTableProps>(
	items: Array<T>,
	filter?: ((items: Array<T>) => Array<T>) | undefined
) {
	if (filter) {
		return filter(items);
	}
	return items;
}

export default function OrdersSummaryTable<T extends DatabaseTableProps>({
	items,
	columnHeadings,
	filter,
}: {
	items: Array<T>;
	columnHeadings: Array<string>;
	filter?: ((items: Array<T>) => Array<T>) | undefined;
}) {
	const [pageNumber, setPageNumber] = useState(1);
	const [statusFilter, setStatusFilter] = useState("all");
	const [timeRange, setTimeRange] = useState<Array<Moment | null>>([
		null,
		null,
	]);
	const [categoryFilter, setCategoryFilter] = useState("all");

	return (
		<div className="flex flex-col items-center gap-4">
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
			<Table columnHeadings={columnHeadings}>
				{renderItems(items, filter).map((item, index) =>
					Math.floor(index / 20 + 1) === pageNumber ? (
						<OrderSummary key={item.id} item={item} />
					) : null
				)}
			</Table>
			<Pagination
				numberOfPages={Math.floor(renderItems(items, filter).length / 20 + 1)}
				pageNumber={pageNumber}
				setPageNumber={setPageNumber}
			/>
		</div>
	);
}
