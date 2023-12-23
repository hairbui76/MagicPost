"use client";

import StaffContext, { StaffContextProps } from "@/contexts/StaffContext";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import Title from "../../components/Title/Title";
import { getStaffs } from "../../utils/staffs";
import StaffsSummaryTable from "../components/StaffsSummaryTable";

function Page() {
	const { staffs, setStaffs } = useContext(StaffContext) as StaffContextProps;
	const { isPending, error, data } = useQuery({
		queryKey: ["staffs"],
		queryFn: getStaffs,
	});

	useEffect(() => {
		if (data) {
			toast.success(data.message);
			setStaffs(data.users);
		}
	}, [data, setStaffs]);

	if (isPending) return <Skeleton active />;

	if (error) toast.error(error.message);
	return (
		<div>
			<Title>Staffs</Title>
			<StaffsSummaryTable staffs={staffs} />
		</div>
	);
}

export default Page;
