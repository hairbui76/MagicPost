import Table from "@/app/staff/components/Table/Table";
import type { Dispatch, SetStateAction } from "react";
import Pagination from "./Pagination/Pagination";
import Summary from "./Summary";

export default function SummaryTable<T extends DatabaseTableProps>({
	items,
	columnHeadings,
	children,
	pageNumber,
	totalPage,
	setPageNumber,
	selected,
	onSelectToggle,
}: {
	items: Array<T>;
	columnHeadings: Array<{ label: string; value: string }>;
	children?: React.ReactElement | Array<React.ReactNode>;
	pageNumber: number;
	totalPage: number;
	setPageNumber: Dispatch<SetStateAction<number>>;
	selected?: string[];
	onSelectToggle?: ((id: string) => void) | undefined;
}) {
	return (
		<div className="flex flex-col items-center gap-4 w-full">
			{children}
			<Table columnHeadings={columnHeadings} selectable={!!onSelectToggle}>
				{items.map((item) => (
					<Summary
						key={item.id}
						item={item}
						headers={columnHeadings}
						selected={!!(selected && selected.find((id) => id === item.id))}
						onSelectToggle={onSelectToggle}
					/>
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
