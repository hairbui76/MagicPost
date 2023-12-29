"use client";

import { PointProps } from "@/app/staff/utils/points";
import Title from "@/components/Title/Title";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Point from "../components/Point";

async function fetchPoint(pointId: string) {
	return await fetch(
		`${process.env.NEXT_PUBLIC_API_ENDPOINT}/point/GetPointById/${pointId}`,
		{
			credentials: "include",
		}
	).then(async (response) => {
		if (response.status !== 200) {
			const message = await Promise.resolve(response.json()).then(
				(json) => json.message
			);
			throw new Error(message);
		}
		return response.json();
	});
}

async function updatePoint(point: PointProps) {
	const { address, ...detail } = point;
	const newPoint = {
		...detail,
		address: address.name,
		addressLat: address.lat,
		addressLong: address.long,
		province: address.province,
		district: address.district,
		ward: address.ward,
	};
	return fetch(`${process.env.NEXT_PUBLIC_POINT_ENDPOINT}/update/${point.id}`, {
		credentials: "include",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(newPoint),
		method: "PUT",
	});
}

export default function Page() {
	const { pointId }: { pointId: string } = useParams();
	const [trigger, setTrigger] = useState(false);
	const [editable, setEditable] = useState(false);
	const { isLoading, data, error } = useQuery({
		queryKey: ["point", pointId, trigger],
		queryFn: () => fetchPoint(pointId),
	});
	if (isLoading) return <div>Loading...</div>;

	if (error) toast.error(error.message);

	if (data.data) {
		const { id, pointName, type, email, phone, createdAt } = data.data;
		const point: PointProps = {
			id,
			pointName,
			type,
			email,
			phone,
			createdAt,
			address: {
				name: data.data.address,
				lat: data.data.addressLat,
				long: data.data.addressLong,
				province: data.data.province,
				district: data.data.district,
				ward: data.data.ward,
			},
		};
		return (
			<>
				<div className="flex flex-row justify-between items-center">
					<Title>{"Point: " + data.data.id}</Title>
					{editable ? null : (
						<button
							className="btn btn-success mb-4 btn-sm"
							type="button"
							onClick={() => setEditable(true)}
						>
							EDIT
						</button>
					)}
				</div>
				<Point
					point={point}
					handleSubmit={async (newPoint: PointProps) => {
						try {
							const response = await updatePoint(newPoint);
							const { message } = await response.json();
							if (response.status !== 200) throw new Error(message);
							toast.success(message);
							setTrigger(!trigger);
							setEditable(false);
							// router.push("/staff/orders/status");
						} catch (err: any) {
							toast.error(err.message);
						}
					}}
					editable={editable}
				/>
			</>
		);
	}
	return <div>Not found</div>;
}
