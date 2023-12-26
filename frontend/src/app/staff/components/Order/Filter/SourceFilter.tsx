import { Dispatch, SetStateAction } from "react";
import SelectFilter from "../../Filter/SelectFilter";

const points = [
	{
		value: "Hanoi",
		label: "Hanoi",
	},
	{
		value: "HCM",
		label: "HCM",
	},
];

export default function SourceFilter({
	sourceFilter,
	setSourceFilter,
}: {
	sourceFilter: string;
	setSourceFilter: Dispatch<SetStateAction<string>>;
}) {
	return (
		<SelectFilter
			label="From"
			name="from"
			value={sourceFilter}
			setValue={setSourceFilter}
			options={points}
		/>
	);
}
