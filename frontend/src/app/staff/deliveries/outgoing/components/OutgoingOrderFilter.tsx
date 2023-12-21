import DestinationFilter from "@/app/staff/components/Order/Filter/DestinationFilter";
import FilterFieldset from "@/app/staff/components/Order/Filter/FilterFieldset";
import TimeRangeFilter from "@/app/staff/components/Order/Filter/TimeRangeFilter";
import { SetStateAction, Dispatch } from "react";

export default function OutgoingOrderFilter({
	desFilter,
	setDesFilter,
	timeRange,
	setTimeRange,
}: {
	desFilter: string;
	setDesFilter: Dispatch<SetStateAction<string>>;
	timeRange: any;
	setTimeRange: any;
}) {
	return (
		<FilterFieldset>
			<DestinationFilter {...{ desFilter, setDesFilter }} />
			<TimeRangeFilter {...{ timeRange, setTimeRange }} />
		</FilterFieldset>
	);
}
