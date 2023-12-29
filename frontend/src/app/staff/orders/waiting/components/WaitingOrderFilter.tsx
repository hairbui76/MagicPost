import FilterFieldset from "@/app/staff/components/Order/Filter/FilterFieldset";
import TimeRangeFilter from "@/app/staff/components/Order/Filter/TimeRangeFilter";
import Filter from "@/components/Filter";
import { Dispatch, SetStateAction } from "react";
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

export default function WaitingOrderFilter({
	timeRange,
	setTimeRange,
	categoryFilter,
	setCategoryFilter,
	handleConfirm,
}: {
	timeRange: any;
	setTimeRange: any;
	categoryFilter: string;
	setCategoryFilter: Dispatch<SetStateAction<string>>;
	handleConfirm: () => void;
}) {
	return (
		<FilterFieldset
			className="md:grid md:grid-cols-4 gap-2 flex flex-col text-sm"
			handleConfirm={handleConfirm}
		>
			<Filter
				label="Category"
				name="category"
				value={categoryFilter}
				setValue={setCategoryFilter}
				options={categories}
			/>
			<div className="col-span-1">
				<TimeRangeFilter {...{ timeRange, setTimeRange }} />
			</div>{" "}
		</FilterFieldset>
	);
}
