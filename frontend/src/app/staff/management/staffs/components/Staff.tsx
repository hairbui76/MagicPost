"use client";

import {
	StaffProps,
	emptyStaff,
	useStaffState,
} from "@/app/staff/utils/staffs";
import PrimaryButton from "@/components/Button/PrimaryButton";
import SecondaryButton from "@/components/Button/SecondaryButton";
import Form from "@/components/Form/Form";
import StaffFieldSet from "./StaffFieldSet";

export default function Staff({
	staff = null,
	handleSubmit,
}: {
	staff?: StaffProps | null;
	handleSubmit: (staff: StaffProps) => void;
}) {
	const state = useStaffState(staff || emptyStaff);

	const newStaff: StaffProps = {
		name: state.name.value,
		username: state.username.value,
		email: state.email.value,
		phoneNumber: state.phoneNumber.value,
	};

	return (
		<Form
			handleSubmit={() => handleSubmit(newStaff)}
			className="w-full gap-4 flex flex-col"
		>
			<StaffFieldSet state={state} />
			<div className="flex flex-row gap-4">
				<PrimaryButton type="submit">Confirm</PrimaryButton>
				<SecondaryButton type="reset" handleClick={() => state.resetStaff()}>
					Reset
				</SecondaryButton>
			</div>
		</Form>
	);
}
