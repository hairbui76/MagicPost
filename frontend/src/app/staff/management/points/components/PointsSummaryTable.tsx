"use client";
import { PointProps } from "@/app/staff/utils/points";
import SummaryTable from "@/components/SummaryTable";

export default function PointsSummaryTable({
	points,
}: {
	points: Array<PointProps>;
}) {
	return (
		<div className="flex flex-col items-center gap-4">
			<SummaryTable
				items={points}
				columnHeadings={["", "ID", "Created At", "Category", "Status"]}
				// filter={filter}
			>
				{/* <OrderFilter
					{...{
						statusFilter,
						setStatusFilter,
						timeRange,
						setTimeRange,
						categoryFilter,
						setCategoryFilter,
					}}
				/> */}
			</SummaryTable>
		</div>
	);
}
