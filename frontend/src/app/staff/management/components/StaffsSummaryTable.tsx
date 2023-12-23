"use client";
import Pagination from "@/app/staff/components/Pagination/Pagination";
import Table from "@/app/staff/components/Table/Table";
import { useState } from "react";
import { StaffProps } from "../../types/Order/staffs";
import StaffsSummary from "./StaffsSummary";

export default function StaffsSummaryTable({
	staffs,
}: {
	staffs: Array<StaffProps>;
}) {
	const [pageNumber, setPageNumber] = useState(1);

	return (
		<div className="flex flex-col items-center gap-4">
			<Table columnHeadings={["", "ID", "Created At", "Category", "Status"]}>
				{staffs.map((staff, index) =>
					Math.floor(index / 20 + 1) === pageNumber ? (
						<StaffsSummary key={staff.id} staff={staff} />
					) : null
				)}
			</Table>
			<Pagination
				numberOfPages={Math.floor(staffs.length / 20 + 1)}
				pageNumber={pageNumber}
				setPageNumber={setPageNumber}
			/>
		</div>
	);
}
