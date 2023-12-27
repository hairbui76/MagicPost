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

export default function DestinationFilter({
	desFilter,
	setDesFilter,
}: {
	desFilter: string;
	setDesFilter: Dispatch<SetStateAction<string>>;
}) {
	return (
		<SelectFilter
			label="To"
			name="to"
			value={desFilter}
			setValue={setDesFilter}
			options={points}
		/>
	);
}
