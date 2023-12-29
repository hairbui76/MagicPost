"use client";

import { CreateStaffProps } from "@/app/staff/utils/staffs";
import { toast } from "react-toastify";
import Staff from "../components/Staff";

export default function Page() {
	async function handleSubmit(staff: CreateStaffProps) {
		const { address, ...info } = staff;
		const processedStaff = {
			...info,
			province: address.province,
			district: address.district,
			ward: address.ward,
		};
		const res = await fetch(`${process.env.NEXT_PUBLIC_USER_ENDPOINT}/create`, {
			method: "POST",
			body: JSON.stringify(processedStaff),
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const response = await res.json();
		if (res.status === 200) {
			toast.success(response.message);
		} else {
			toast.error(response.message);
		}
	}
	return <Staff handleSubmit={handleSubmit} editable={true} />;
}
