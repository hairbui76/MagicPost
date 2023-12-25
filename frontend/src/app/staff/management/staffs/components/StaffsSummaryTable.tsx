"use client";
import { StaffProps } from "@/app/staff/utils/staffs";
import SummaryTable from "@/components/SummaryTable";

export default function StaffsSummaryTable({
	staffs,
}: {
	staffs: Array<StaffProps>;
}) {
	return (
		<div className="flex flex-col items-center gap-4">
			<SummaryTable
				items={staffs}
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
