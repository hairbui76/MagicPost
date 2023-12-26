import FilterFieldset from "@/app/staff/components/Order/Filter/FilterFieldset";
import Filter from "@/components/Filter";
import { Dispatch, SetStateAction } from "react";

const types = [
	{
		label: "Transaction Point",
		value: "TRANSACTION_POINT",
	},
	{
		label: "Gathering Point",
		value: "GATHERING_POINT",
	},
];

export default function PointFilter({
	pointTypeFilter,
	setPointTypeFilter,
}: {
	pointTypeFilter: string;
	setPointTypeFilter: Dispatch<SetStateAction<string>>;
}) {
	return (
		<FilterFieldset>
			<Filter
				label="Point Type"
				name="point-type"
				value={pointTypeFilter}
				setValue={setPointTypeFilter}
				options={types}
			/>
		</FilterFieldset>
	);
}
