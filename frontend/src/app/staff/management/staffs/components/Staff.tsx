"use client";

import {
	CreateStaffProps,
	emptyCreateStaff,
	useCreateStaffState,
} from "@/app/staff/utils/staffs";
import PrimaryButton from "@/components/Button/PrimaryButton";
import SecondaryButton from "@/components/Button/SecondaryButton";
import Form from "@/components/Form/Form";
import StaffAssignPointField from "./StaffAssignPointFieldSet";
import StaffFieldSet from "./StaffFieldSet";

export default function Staff({
	staff = null,
	handleSubmit,
}: {
	staff?: CreateStaffProps | null;
	handleSubmit: (staff: CreateStaffProps) => void;
}) {
	const state = useCreateStaffState(staff || emptyCreateStaff);

	const newStaff: CreateStaffProps = {
		role: state.role.value,
		name: state.name.value,
		username: state.username.value,
		email: state.email.value,
		phoneNumber: state.phoneNumber.value,
		pointId: state.pointId.value,
		address: state.address.value,
	};
	console.log(newStaff);

	return (
		<Form
			handleSubmit={() => handleSubmit(newStaff)}
			className="w-full gap-4 flex flex-col"
		>
			<StaffFieldSet state={state} />
			<StaffAssignPointField state={state} />
			<div className="flex flex-row gap-4">
				<PrimaryButton type="submit">Confirm</PrimaryButton>
				<SecondaryButton type="reset" handleClick={() => state.resetStaff()}>
					Reset
				</SecondaryButton>
			</div>
		</Form>
	);
}
