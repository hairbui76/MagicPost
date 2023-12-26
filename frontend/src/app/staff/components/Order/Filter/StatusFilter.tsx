import { Dispatch, SetStateAction } from "react";
import SelectFilter from "../../Filter/SelectFilter";

const statuses = [
	{
		value: "0",
		label: "Pending",
	},
	{
		value: "1",
		label: "Delivering",
	},
];

export default function StatusFilter({
	statusFilter,
	setStatusFilter,
}: {
	statusFilter: string;
	setStatusFilter: Dispatch<SetStateAction<string>>;
}) {
	return (
		<SelectFilter
			label="Status"
			name="status"
			value={statusFilter}
			setValue={setStatusFilter}
			options={statuses}
		/>
	);
}
