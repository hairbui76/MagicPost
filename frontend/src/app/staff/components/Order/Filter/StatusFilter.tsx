import { Dispatch, SetStateAction } from "react";
import Select from "../../Form/Select";
import SelectFilter from "./SelectFilter";

const statuses = [
	{
		value: "0",
		label: "Pending",
	},
	{
		value: "1",
		label: "Delivering",
	},
	{
		value: "all",
		label: "All",
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
