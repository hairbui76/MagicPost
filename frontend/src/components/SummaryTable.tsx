"use client";

import Table from "@/app/staff/components/Table/Table";
import { Dispatch, SetStateAction } from "react";
import Pagination from "./Pagination/Pagination";
import Summary from "./Summary";

function renderItems<T extends DatabaseTableProps>(
	items: Array<T>,
	filter?: ((items: Array<T>) => Array<T>) | undefined
) {
	if (filter) {
		return filter(items);
	}
	return items;
}

export default function SummaryTable<T extends DatabaseTableProps>({
	items,
	columnHeadings,
	filter,
	children,
	pageNumber,
	totalPage,
	setPageNumber,
}: {
	items: Array<T>;
	columnHeadings: Array<string>;
	filter?: ((items: Array<T>) => Array<T>) | undefined;
	children?: React.ReactElement;
	pageNumber: number;
	totalPage: number;
	setPageNumber: Dispatch<SetStateAction<number>>;
}) {
	return (
		<div className="flex flex-col items-center gap-4 w-full">
			{children}
			<Table columnHeadings={columnHeadings}>
				{renderItems(items, filter).map((item) => (
					<Summary key={item.id} item={item} headers={columnHeadings} />
				))}
			</Table>
			<Pagination
				pageNumber={pageNumber}
				numberOfPages={totalPage}
				setPageNumber={setPageNumber}
			/>
		</div>
	);
}
