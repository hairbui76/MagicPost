import { Address } from "@/app/staff/utils/orders";
import { CreateStaffStateProps } from "@/app/staff/utils/staffs";
import AddressInput from "@/components/AddressInput";
import Fieldset from "@/components/Form/Fieldset";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

export default function StaffAssignPointField({
	state,
}: {
	state: CreateStaffStateProps;
}) {
	return (
		<Fieldset
			legend="Staff Point Assignment"
			icon={faLocationDot}
			className="sm:flex-col"
		>
			<AddressInput
				className="flex-1"
				value={state.address.value}
				handleChange={(newAddress: Address) =>
					state.address.handleChange({ ...state.address.value, ...newAddress })
				}
				includeSpecificAddress={false}
			/>
		</Fieldset>
	);
}
