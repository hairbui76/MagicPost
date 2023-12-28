"use client";

import SummaryTable from "@/components/SummaryTable";
import PointContext, { PointContextProps } from "@/contexts/PointContext";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import PointFilter from "./PointFilter";
import { Address } from "@/app/staff/utils/orders";

async function filterPoints(
	pageNumber: number,
	pointTypeFilter?: string,
	pointFilter?: Address
) {
	const filter: { [key: string]: string } = {
		pageNumber: pageNumber.toString(),
	};
	if (pointTypeFilter) filter["type"] = pointTypeFilter;
	if (pointFilter?.province) filter["province"] = pointFilter?.province;
	if (pointFilter?.district) filter["district"] = pointFilter?.district;
	if (pointFilter?.ward) filter["ward"] = pointFilter?.ward;
	return fetch(
		`${process.env.NEXT_PUBLIC_POINT_ENDPOINT}/filter?` +
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
		label: "Point Name",
		value: "pointName",
	},
	{
		label: "Address",
		value: "address.name",
	},
	{
		label: "Phone",
		value: "phone",
	},
	{
		label: "Email",
		value: "email",
	},
	{
		label: "Type",
		value: "type",
	},
];

export default function PointsSummaryTable() {
	const [pageNumber, setPageNumber] = useState(1);
	const [totalPage, setTotalPage] = useState(1);
	const [pointTypeFilter, setPointTypeFilter] = useState("");
	const [filterToggle, setFilterToggle] = useState(false);
	const [pointFilter, setPointFilter] = useState<Address>({
		province: "",
		district: "",
		ward: "",
	});

	const { points, setPoints } = useContext(PointContext) as PointContextProps;
	const {
		isPending,
		error,
		data: response,
	} = useQuery({
		queryKey: ["points", filterToggle, pageNumber],
		queryFn: () => filterPoints(pageNumber, pointTypeFilter, pointFilter),
	});

	useEffect(() => {
		if (response) {
			toast.success(response.message);
			setPoints(response.data.data);
			setTotalPage(response.data.totalPage);
		}
	}, [response, setPoints]);

	if (isPending) return <Skeleton active />;

	if (error) toast.error(error.message);

	return (
		<div className="flex flex-col items-center gap-4">
			<SummaryTable
				items={points}
				columnHeadings={columnHeadings}
				pageNumber={pageNumber}
				totalPage={totalPage}
				setPageNumber={setPageNumber}
			>
				<PointFilter
					{...{
						pointFilter,
						setPointFilter,
						pointTypeFilter,
						setPointTypeFilter,
						handleConfirm: () => setFilterToggle(!filterToggle),
					}}
				/>
			</SummaryTable>
		</div>
	);
}
