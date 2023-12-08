import Fieldset from "@/app/staff/components/Form/Fieldset";
import Select from "@/app/staff/components/Form/Select";
import TimeRange from "@/app/staff/components/Form/TimeRange";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction } from "react";

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

const categories = [
	{
		value: "parcel",
		label: "Parcel",
	},
	{
		value: "document",
		label: "Document",
	},
	{
		value: "all",
		label: "All",
	},
];

export default function OrderFilter({
	statusFilter,
	setStatusFilter,
	categoryFilter,
	setCategoryFilter,
	timeRange,
	setTimeRange,
}: {
	statusFilter: string;
	setStatusFilter: Dispatch<SetStateAction<string>>;
	categoryFilter: string;
	setCategoryFilter: Dispatch<SetStateAction<string>>;
	timeRange: any;
	setTimeRange: any;
}) {
	return (
		<Fieldset
			icon={faFilter}
			legend="Filter"
			className="self-start grid grid-cols-2 w-full md:flex-row md:flex md:justify-between"
		>
			<Select
				label="Status"
				name="status"
				options={statuses}
				handleChange={(value) => {
					setStatusFilter(value);
				}}
				className="text-sm"
				value={statusFilter.toString()}
			/>
			<Select
				label="Category"
				name="category"
				options={categories}
				handleChange={(value) => {
					setCategoryFilter(value);
				}}
				className="text-sm"
				value={categoryFilter}
			/>
			<TimeRange
				{...{
					timeRange,
					handleChange: (dates: any) => {
						console.log(dates);
						console.log(timeRange);
						setTimeRange(dates);
					},
				}}
				className="text-sm"
				label="Range"
			/>
		</Fieldset>
	);
}
