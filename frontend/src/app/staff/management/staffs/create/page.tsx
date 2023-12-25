"use client";

import { StaffProps } from "@/app/staff/utils/staffs";
import { toast } from "react-toastify";
import Staff from "../components/Staff";

export default function Page() {
	async function handleSubmit(staff: StaffProps) {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_POINT_ENDPOINT}/create`,
			{
				method: "POST",
				body: JSON.stringify(staff),
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
	return <Staff handleSubmit={handleSubmit} />;
}
