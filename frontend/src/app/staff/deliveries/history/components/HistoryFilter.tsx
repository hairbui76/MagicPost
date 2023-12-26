import FilterFieldset from "@/app/staff/components/Order/Filter/FilterFieldset";
import TimeRange from "@/components/Form/TimeRange";
import SelectFilter from "@/components/legacy/Filter/SelectFilter";
import { Dispatch, SetStateAction } from "react";

export default function HistoryFilter({
	typeFilter,
	timeRange,
	statusFilter,
	setTypeFilter,
	setTimeRange,
	setStatusFilter,
}: {
	typeFilter: string;
	timeRange: any;
	statusFilter: string;
	setTypeFilter: Dispatch<SetStateAction<string>>;
	setTimeRange: any;
	setStatusFilter: Dispatch<SetStateAction<string>>;
}) {
	return (
		<FilterFieldset>
			<SelectFilter
				label="Type"
				name="type"
				options={types}
				value={typeFilter}
				setValue={setTypeFilter}
			/>
			<TimeRange
				label="Time"
				timeRange={timeRange}
				handleChange={setTimeRange}
			/>
			<SelectFilter
				label="Status"
				name="status"
				options={statuses}
				value={statusFilter}
				setValue={setStatusFilter}
			/>
		</FilterFieldset>
	);
}

const types = [
	{ value: "incoming", label: "incoming" },
	{ value: "outgoing", label: "outgoing" },
];

const statuses = [
	{ value: "confirmed", label: "confirmed" },
	{ value: "rejected", label: "rejected" },
	{ value: "pending", label: "pending" },
];
