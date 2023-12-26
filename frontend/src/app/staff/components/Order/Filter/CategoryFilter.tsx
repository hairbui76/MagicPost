import { Dispatch, SetStateAction } from "react";
import SelectFilter from "../../Filter/SelectFilter";

const categories = [
	{
		value: "parcel",
		label: "Parcel",
	},
	{
		value: "document",
		label: "Document",
	},
];

export default function CategoryFilter({
	categoryFilter,
	setCategoryFilter,
}: {
	categoryFilter: string;
	setCategoryFilter: Dispatch<SetStateAction<string>>;
}) {
	return (
		<SelectFilter
			label="Category"
			name="category"
			value={categoryFilter}
			setValue={setCategoryFilter}
			options={categories}
		/>
	);
}
