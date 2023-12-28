import PrimaryButton from "@/components/Button/PrimaryButton";
import SecondaryButton from "@/components/Button/SecondaryButton";
import Form from "@/components/Form/Form";
import { PointProps, emptyPoint, usePointState } from "../../../utils/points";
import PointFieldSet from "./PointFieldset";
import { useRouter } from "next/navigation";

export default function Point({
	point = null,
	handleSubmit,
	editable = false,
}: {
	point?: PointProps | null;
	handleSubmit: (point: PointProps) => void;
	editable?: boolean;
}) {
	const state = usePointState(point || emptyPoint);
	const router = useRouter();

	const newPoint: PointProps = {
		type: state.type.value,
		pointName: state.pointName.value,
		address: state.address.value,
		email: state.email.value,
		phone: state.phone.value,
	};

	return (
		<Form
			handleSubmit={() =>
				handleSubmit(point ? { ...point, ...newPoint } : newPoint)
			}
			className="w-full gap-4 flex flex-col relative"
		>
			<PointFieldSet state={state} disabled={!editable} />
			{editable ? (
				<div className="flex flex-row gap-4">
					<PrimaryButton type="submit">
						{point ? "Save changes" : "Confirm"}
					</PrimaryButton>
					<SecondaryButton
						type="reset"
						handleClick={
							point
								? () => router.push("/staff/management/points")
								: () => state.resetPoint()
						}
					>
						{point ? "Cancel" : "Reset"}
					</SecondaryButton>
				</div>
			) : null}
		</Form>
	);
}
