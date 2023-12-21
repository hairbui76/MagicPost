import FilterFieldset from "@/app/staff/components/Order/Filter/FilterFieldset";
import SourceFilter from "@/app/staff/components/Order/Filter/SourceFilter";
import TimeRangeFilter from "@/app/staff/components/Order/Filter/TimeRangeFilter";
import { SetStateAction, Dispatch } from "react";

export default function IncomingOrderFilter({
	sourceFilter,
	setSourceFilter,
	timeRange,
	setTimeRange,
}: {
	sourceFilter: string;
	setSourceFilter: Dispatch<SetStateAction<string>>;
	timeRange: any;
	setTimeRange: any;
}) {
	return (
		<FilterFieldset>
			<SourceFilter {...{ sourceFilter, setSourceFilter }} />
			<TimeRangeFilter {...{ timeRange, setTimeRange }} />
		</FilterFieldset>
	);
}
