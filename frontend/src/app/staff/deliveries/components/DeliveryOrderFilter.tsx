import TimeRangeFilter from "@/app/staff/components/Order/Filter/TimeRangeFilter";
import { Address } from "@/app/staff/utils/orders";
import AddressInput from "@/components/AddressInput";
import { Dispatch, SetStateAction } from "react";

import FilterFieldset from "../../components/Order/Filter/FilterFieldset";

export default function DeliveryOrderFilter({
	pointFilter,
	timeRange,
	setTimeRange,
	setPointFilter,
	handleConfirm,
}: {
	pointFilter: Address;
	timeRange: any;
	setTimeRange: any;
	setPointFilter: Dispatch<SetStateAction<Address>>;
	handleConfirm: () => void;
}) {
	return (
		<FilterFieldset
			className="md:grid md:grid-cols-4 gap-2 flex flex-col text-sm"
			handleConfirm={handleConfirm}
		>
			<AddressInput
				className="col-span-3"
				handleChange={(address) =>
					setPointFilter({ ...pointFilter, ...address })
				}
				value={pointFilter}
				includeSpecificAddress={false}
			/>
			<div className="col-span-1">
				<TimeRangeFilter {...{ timeRange, setTimeRange }} />
			</div>{" "}
		</FilterFieldset>
	);
}
