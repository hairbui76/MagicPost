import FilterFieldset from "@/app/staff/components/Order/Filter/FilterFieldset";
import { Address } from "@/app/staff/utils/orders";
import AddressInput from "@/components/AddressInput";
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
	pointFilter,
	setPointFilter,
	roleFilter,
	setRoleFilter,
	handleConfirm,
}: {
	pointFilter: Address;
	setPointFilter: Dispatch<SetStateAction<Address>>;
	roleFilter: string;
	setRoleFilter: Dispatch<SetStateAction<string>>;
	handleConfirm: () => void;
}) {
	return (
		<FilterFieldset
			handleConfirm={handleConfirm}
			className="md:grid md:grid-cols-4 gap-2 flex flex-col w-full text-sm"
		>
			<AddressInput
				includeSpecificAddress={false}
				value={pointFilter}
				handleChange={(address) =>
					setPointFilter({ ...pointFilter, ...address })
				}
				className="col-span-3"
			/>
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
