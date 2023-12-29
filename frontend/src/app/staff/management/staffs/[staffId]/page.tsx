"use client";
import { CreateStaffProps } from "@/app/staff/utils/staffs";
import Title from "@/components/Title/Title";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Staff from "../components/Staff";

async function fetchStaff(staffId: string) {
	return await fetch(
		`${process.env.NEXT_PUBLIC_USER_ENDPOINT}/get/${staffId}`,
		{ credentials: "include" }
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

async function updateStaff(user: CreateStaffProps) {
	return fetch(
		`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/UpdateUser/${user.id}`,
		{
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(user),
			method: "PUT",
		}
	);
}

export default function Page() {
	const { staffId }: { staffId: string } = useParams();
	const [trigger, setTrigger] = useState(false);
	const [editable, setEditable] = useState(false);
	const { isLoading, data, error } = useQuery({
		queryKey: ["user", staffId, trigger],
		queryFn: () => fetchStaff(staffId),
	});

	if (isLoading) return <div>Loading...</div>;

	if (error) toast.error(error.message);

	if (data) {
		const { id, role, name, username, email, phoneNumber, pointId, point } =
			data.data;
		const staff: CreateStaffProps = {
			id,
			role,
			name,
			username,
			email,
			phoneNumber,
			pointId,
			address: {
				name: point.address.name,
				lat: point.address.lat,
				long: point.address.long,
				province: point.address.province,
				district: point.address.district,
				ward: point.address.ward,
			},
		};
		return (
			<>
				<div className="flex flex-row justify-between items-center">
					<Title>{"Staff: " + id}</Title>
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
				<Staff
					staff={staff}
					handleSubmit={async (newStaff: CreateStaffProps) => {
						try {
							const response = await updateStaff(newStaff);
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
	return "Staff not found";
}
