"use client";
import { CreateStaffProps } from "@/app/staff/utils/staffs";
import Title from "@/components/Title/Title";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
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
	try {
		toast.info(`Updating staff ${user.id}`);
		await fetch(
			`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/UpdateUser/${user.id}`,
			{
				credentials: "include",
				body: JSON.stringify(user),
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
	const { staffId }: { staffId: string } = useParams();
	const router = useRouter();
	const [editable, setEditable] = useState(false);
	const { isLoading, data, error } = useQuery({
		queryKey: ["user", staffId],
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
				name: point.address,
				lat: point.addressLat,
				long: point.addressLong,
				province: point.province,
				district: point.district,
				ward: point.ward,
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
					handleSubmit={(staff: CreateStaffProps) => {
						updateStaff(staff);
						router.push("/staff/management/staffs");
					}}
					editable={editable}
				/>
			</>
		);
	}
	return "Staff not found";
}
