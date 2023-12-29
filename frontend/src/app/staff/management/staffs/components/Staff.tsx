import {
	CreateStaffProps,
	emptyCreateStaff,
	useCreateStaffState,
} from "@/app/staff/utils/staffs";
import PrimaryButton from "@/components/Button/PrimaryButton";
import SecondaryButton from "@/components/Button/SecondaryButton";
import Form from "@/components/Form/Form";
import { useRouter } from "next/navigation";
import StaffAssignPointField from "./StaffAssignPointFieldSet";
import StaffFieldSet from "./StaffFieldSet";

export default function Staff({
	staff = null,
	handleSubmit,
	editable = false,
}: {
	staff?: CreateStaffProps | null;
	handleSubmit: (staff: CreateStaffProps) => void;
	editable?: boolean;
}) {
	const state = useCreateStaffState(staff || emptyCreateStaff);
	const router = useRouter();

	const newStaff: CreateStaffProps = {
		role: state.role.value,
		name: state.name.value,
		username: state.username.value,
		email: state.email.value,
		phoneNumber: state.phoneNumber.value,
		pointId: state.pointId.value,
		address: state.address.value,
	};

	return (
		<Form
			handleSubmit={() =>
				handleSubmit(staff ? { ...staff, ...newStaff } : newStaff)
			}
			className="w-full gap-4 flex flex-col"
		>
			<StaffFieldSet state={state} disabled={!editable} editView={!!staff} />
			<StaffAssignPointField state={state} disabled={!editable || !!staff} />
			{editable ? (
				<div className="flex flex-row gap-4">
					<PrimaryButton type="submit">
						{staff ? "Save changes" : "Confirm"}
					</PrimaryButton>
					<SecondaryButton
						type="reset"
						handleClick={
							staff
								? () => router.push("/staff/management/staffs")
								: () => state.resetStaff()
						}
					>
						{staff ? "Cancel" : "Reset"}
					</SecondaryButton>
				</div>
			) : null}
		</Form>
	);
}
