"use client";

import { toast } from "react-toastify";
import { PointProps } from "../../utils/points";
import Point from "../components/Point";

async function getPlaceDetail(placeId: string) {
	const res = await fetch(`/api/address/${placeId}`);
	const { data } = await res.json();
	const lat = data.geometry.location.lat;
	const long = data.geometry.location.lng;
	return { lat, long };
}

export default function Page() {
	async function handleSubmit(point: PointProps) {
		const { lat, long } = await getPlaceDetail(point.address.id!);
		const processedPoints = {
			...point,
			address: point.address,
			addressLat: lat,
			addressLong: long,
		};
		// TODO: Change DB schema to match OrderProps
		const body = processedPoints;
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_ORDER_ENDPOINT}/create`,
			{
				method: "POST",
				body: JSON.stringify(body),
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const response = await res.json();
		if (res.status === 200) {
			toast.success(response.message);
		} else {
			toast.error(response.message);
		}
	}
	return <Point handleSubmit={handleSubmit} />;
}
