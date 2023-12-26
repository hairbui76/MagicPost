"use client";

import SummaryTable from "@/components/SummaryTable";
import StaffContext, { StaffContextProps } from "@/contexts/StaffContext";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import StaffFilter from "./StaffFilter";

async function filterStaffs(pageNumber: number, roleFilter?: string) {
	const filter: { [key: string]: string } = {
		pageNumber: pageNumber.toString(),
	};
	if (roleFilter) filter["role"] = roleFilter;
	return fetch(
		`${process.env.NEXT_PUBLIC_USER_ENDPOINT}/filter?` +
			new URLSearchParams(filter),
		{ credentials: "include" }
	).then(async (res) => {
		if (res.status !== 200) {
			const json = await res.json();
			throw new Error(json.message);
		}
		return res.json();
	});
}

const columnHeadings = [
	{
		label: "Name",
		value: "name",
	},
	{
		label: "Username",
		value: "username",
	},
	{
		label: "Email",
		value: "email",
	},
	{
		label: "Phone Number",
		value: "phoneNumber",
	},
	{
		label: "Role",
		value: "role",
	},
];

export default function StaffsSummaryTable() {
	const [pageNumber, setPageNumber] = useState(1);
	const [totalPage, setTotalPage] = useState(1);
	const [roleFilter, setRoleFilter] = useState("");

	const { staffs, setStaffs } = useContext(StaffContext) as StaffContextProps;
	const {
		isPending,
		error,
		data: response,
	} = useQuery({
		queryKey: ["staffs", roleFilter, pageNumber],
		queryFn: () => filterStaffs(pageNumber, roleFilter),
	});

	useEffect(() => {
		if (response) {
			toast.success(response.message);
			setStaffs(response.data.data);
			setTotalPage(response.data.totalPage);
		}
	}, [response, setStaffs]);

	if (isPending) return <Skeleton active />;

	if (error) toast.error(error.message);

	return (
		<div className="flex flex-col items-center gap-4">
			<SummaryTable
				items={staffs}
				columnHeadings={columnHeadings}
				pageNumber={pageNumber}
				totalPage={totalPage}
				setPageNumber={setPageNumber}
			>
				<StaffFilter {...{ roleFilter, setRoleFilter }} />
			</SummaryTable>
		</div>
	);
}
