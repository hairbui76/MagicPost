"use client";

import Title from "@/components/Title/Title";
import { toast } from "react-toastify";
import { PointProps } from "../../../utils/points";
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
			province: point.address.province,
			district: point.address.district,
			ward: point.address.ward,
			address: point.address.name,
			addressLat: lat,
			addressLong: long,
		};
		const body = processedPoints;
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_POINT_ENDPOINT}/create`,
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
	return (
		<>
			<Title>New Point</Title>
			<Point handleSubmit={handleSubmit} editable={true} />
		</>
	);
}
