import FilterFieldset from "@/app/staff/components/Order/Filter/FilterFieldset";
import Filter from "@/components/Filter";
import { Dispatch, SetStateAction } from "react";

const roles = [
	{
		label: "Company Administrator",
		value: "COMPANY_ADMINISTRATOR",
	},
	{
		label: "Gathering Point Manager",
		value: "GATHERING_POINT_MANAGER",
	},
	{
		label: "Transaction Point Manager",
		value: "TRANSACTION_POINT_MANAGER",
	},
	{
		label: "Transaction Staff",
		value: "TRANSACTION_STAFF",
	},
	{
		label: "Gathering Staff",
		value: "GATHERING_STAFF",
	},
];

export default function StaffFilter({
	roleFilter,
	setRoleFilter,
}: {
	roleFilter: string;
	setRoleFilter: Dispatch<SetStateAction<string>>;
}) {
	return (
		<FilterFieldset>
			<Filter
				label="Role"
				name="role"
				value={roleFilter}
				setValue={setRoleFilter}
				options={roles}
			/>
		</FilterFieldset>
	);
}
