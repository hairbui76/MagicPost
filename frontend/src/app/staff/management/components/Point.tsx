"use client";

import PrimaryButton from "../../components/Button/PrimaryButton";
import SecondaryButton from "../../components/Button/SecondaryButton";
import Form from "../../components/Form/Form";
import { PointProps, emptyPoint, usePointState } from "../../utils/points";
import PointFieldSet from "./PointFieldset";

export default function Point({
	point = null,
	handleSubmit,
}: {
	point?: PointProps | null;
	handleSubmit: (point: PointProps) => void;
}) {
	const state = usePointState(point || emptyPoint);

	const newPoint: PointProps = {
		type: state.type.value,
		pointName: state.pointName.value,
		address: state.address.value,
		email: state.email.value,
		phone: state.phone.value,
	};

	return (
		<Form
			handleSubmit={() => handleSubmit(newPoint)}
			className="w-full gap-4 flex flex-col"
		>
			<PointFieldSet state={state} />
			<div className="flex flex-row gap-4">
				<PrimaryButton type="submit">Confirm</PrimaryButton>
				<SecondaryButton type="reset" handleClick={() => state.resetPoint()}>
					Reset
				</SecondaryButton>
			</div>
		</Form>
	);
}
