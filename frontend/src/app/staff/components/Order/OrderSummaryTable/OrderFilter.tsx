import FilterFieldset from "@/app/staff/components/Order/Filter/FilterFieldset";
import Filter from "@/components/Filter";
import { Dispatch, SetStateAction } from "react";
const statuses = [
	{
		value: "0",
		label: "Pending",
	},
	{
		value: "1",
		label: "Delivering",
	},
];
const categories = [
	{
		value: "parcel",
		label: "Parcel",
	},
	{
		value: "document",
		label: "Document",
	},
];

export default function OrderFilter({
	statusFilter,
	setStatusFilter,
	categoryFilter,
	setCategoryFilter,
	timeRange,
	setTimeRange,
	handleConfirm,
}: {
	statusFilter: string;
	setStatusFilter: Dispatch<SetStateAction<string>>;
	categoryFilter: string;
	setCategoryFilter: Dispatch<SetStateAction<string>>;
	timeRange: any;
	setTimeRange: any;
	handleConfirm: () => void;
}) {
	return (
		<FilterFieldset handleConfirm={() => handleConfirm()}>
			<Filter
				label="Status"
				name="status"
				value={statusFilter}
				setValue={setStatusFilter}
				options={statuses}
			/>
			<Filter
				label="Category"
				name="category"
				value={categoryFilter}
				setValue={setCategoryFilter}
				options={categories}
			/>
			<Filter
				label="Timerange"
				name="timerange"
				type="timerange"
				value={timeRange}
				setValue={setTimeRange}
			/>
			{/* <TimeRangeFilter {...{ timeRange, setTimeRange }} /> */}
		</FilterFieldset>
	);
}
