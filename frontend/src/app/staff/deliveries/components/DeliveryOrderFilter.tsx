import TimeRangeFilter from "@/app/staff/components/Order/Filter/TimeRangeFilter";
import { Address } from "@/app/staff/utils/orders";
import AddressInput from "@/components/AddressInput";
import Fieldset from "@/components/Form/Fieldset";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction } from "react";

export default function DeliveryOrderFilter({
	pointFilter,
	timeRange,
	setTimeRange,
	setPointFilter,
}: {
	pointFilter: Address;
	timeRange: any;
	setTimeRange: any;
	setPointFilter: Dispatch<SetStateAction<Address>>;
}) {
	return (
		<Fieldset
			icon={faFilter}
			legend="Filter"
			className="md:grid md:grid-cols-4 gap-2 flex flex-col"
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
			</div>
		</Fieldset>
	);
}
