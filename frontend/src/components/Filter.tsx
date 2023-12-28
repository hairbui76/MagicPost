import SelectFilter from "@/app/staff/components/Filter/SelectFilter";
import TimeRange from "@/components/Form/TimeRange";
import { Dispatch, SetStateAction } from "react";

export default function Filter<T>({
	type = "select",
	label,
	name,
	value,
	setValue,
	options,
}: {
	type?: "select" | "timerange";
	label: string;
	name: string;
	value: T;
	setValue: Dispatch<SetStateAction<T>>;
	options?: { value: string; label: string }[];
}) {
	if (type === "timerange") {
		return (
			<TimeRange
				{...{
					timeRange: value,
					handleChange: (dates: any) => {
						setValue(dates);
					},
				}}
				label={label}
			/>
		);
	}
	return (
		<SelectFilter
			label={label}
			name={name}
			value={value as string}
			setValue={setValue as Dispatch<SetStateAction<string>>}
			options={options!}
		/>
	);
}
