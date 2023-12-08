"use client";

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
		lat: state.lat.value,
		long: state.long.value,
	};

	return (
		<Form handleSubmit={() => handleSubmit(newPoint)}>
			<PointFieldSet state={state} />
		</Form>
	);
}
