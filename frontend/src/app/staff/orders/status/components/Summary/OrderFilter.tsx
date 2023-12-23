import CategoryFilter from "@/app/staff/components/Order/Filter/CategoryFilter";
import FilterFieldset from "@/app/staff/components/Order/Filter/FilterFieldset";
import StatusFilter from "@/app/staff/components/Order/Filter/StatusFilter";
import TimeRangeFilter from "@/app/staff/components/Order/Filter/TimeRangeFilter";
import { Dispatch, SetStateAction } from "react";

export default function OrderFilter({
	statusFilter,
	setStatusFilter,
	categoryFilter,
	setCategoryFilter,
	timeRange,
	setTimeRange,
}: {
	statusFilter: string;
	setStatusFilter: Dispatch<SetStateAction<string>>;
	categoryFilter: string;
	setCategoryFilter: Dispatch<SetStateAction<string>>;
	timeRange: any;
	setTimeRange: any;
}) {
	return (
		<FilterFieldset>
			<StatusFilter {...{ statusFilter, setStatusFilter }} />
			<CategoryFilter {...{ categoryFilter, setCategoryFilter }} />
			<TimeRangeFilter {...{ timeRange, setTimeRange }} />
		</FilterFieldset>
	);
}
