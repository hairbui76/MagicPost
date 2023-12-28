"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Point from "../components/Point";
import { PointProps } from "@/app/staff/utils/points";
import Title from "@/components/Title/Title";
import { useState } from "react";

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
	try {
		toast.info(`Updating point ${point.id}`);
		await fetch(
			`${process.env.NEXT_PUBLIC_API_ENDPOINT}/point/UpdatePoint/${point.id}`,
			{
				credentials: "include",
				body: JSON.stringify(point),
				method: "PUT",
			}
		).then(async (response) => {
			const message = await Promise.resolve(response.json()).then(
				(json) => json.message
			);
			if (response.status !== 200) {
				throw new Error(message);
			}
			toast.success(message);
		});
	} catch (error: any) {
		toast.error(error.message);
	}
}

export default function Page() {
	const { pointId }: { pointId: string } = useParams();
	const router = useRouter();
	const [editable, setEditable] = useState(false);
	const { isLoading, data, error } = useQuery({
		queryKey: ["point", pointId],
		queryFn: () => fetchPoint(pointId),
	});
	if (isLoading) return <div>Loading...</div>;

	if (error) toast.error(error.message);

	if (data.data.data) {
		const { id, pointName, type, email, phone, createdAt } = data.data.data;
		const point: PointProps = {
			id,
			pointName,
			type,
			email,
			phone,
			createdAt,
			address: {
				name: data.data.data.address,
				lat: data.data.data.addressLat,
				long: data.data.data.addressLong,
				province: data.data.data.province,
				district: data.data.data.district,
				ward: data.data.data.ward,
			},
		};
		return (
			<>
				<div className="flex flex-row justify-between items-center">
					<Title>{"Point: " + data.point.id}</Title>
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
					handleSubmit={(point: PointProps) => {
						updatePoint(point);
						router.push("/staff/management/points");
					}}
					editable={editable}
				/>
			</>
		);
	}
	return <div>Not found</div>;
}
