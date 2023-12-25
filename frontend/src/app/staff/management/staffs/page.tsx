"use client";

import PrimaryButton from "@/components/Button/PrimaryButton";
import Title from "@/components/Title/Title";
import StaffContext, { StaffContextProps } from "@/contexts/StaffContext";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { getStaffs } from "../../utils/staffs";
import StaffsSummaryTable from "./components/StaffsSummaryTable";

function Page() {
	const { staffs, setStaffs } = useContext(StaffContext) as StaffContextProps;
	const { isPending, error, data } = useQuery({
		queryKey: ["staffs"],
		queryFn: getStaffs,
	});
	const router = useRouter();

	useEffect(() => {
		if (data) {
			toast.success(data.message);
			setStaffs(data.data);
		}
	}, [data, setStaffs]);

	if (isPending) return <Skeleton active />;

	if (error) toast.error(error.message);
	return (
		<div className="flex flex-col">
			<div className="flex justify-between">
				<Title>Staffs</Title>
				<PrimaryButton handleClick={() => router.push("staffs/create")}>
					Create new staff
				</PrimaryButton>
			</div>
			<StaffsSummaryTable staffs={staffs} />
		</div>
	);
}

export default Page;
