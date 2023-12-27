import FilterFieldset from "@/app/staff/components/Order/Filter/FilterFieldset";
import { Address } from "@/app/staff/utils/orders";
import AddressInput from "@/components/AddressInput";
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
	pointFilter,
	setPointFilter,
	handleConfirm,
}: {
	typeFilter: string;
	timeRange: any;
	statusFilter: string;
	setTypeFilter: Dispatch<SetStateAction<string>>;
	setTimeRange: any;
	setStatusFilter: Dispatch<SetStateAction<string>>;
	handleConfirm: () => void;
	pointFilter: Address;
	setPointFilter: Dispatch<SetStateAction<Address>>;
}) {
	return (
		<FilterFieldset
			handleConfirm={handleConfirm}
			className="text-sm md:grid md:grid-cols-3"
		>
			<SelectFilter
				label="Type"
				name="type"
				options={types}
				value={typeFilter}
				setValue={setTypeFilter}
			/>
			<SelectFilter
				label="Status"
				name="status"
				options={statuses}
				value={statusFilter}
				setValue={setStatusFilter}
			/>
			<TimeRange
				label="Time"
				timeRange={timeRange}
				handleChange={setTimeRange}
			/>
			<AddressInput
				includeSpecificAddress={false}
				value={pointFilter}
				handleChange={(address) =>
					setPointFilter({ ...pointFilter, ...address })
				}
				className="col-span-3"
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
