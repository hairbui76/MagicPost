"use client";

import PrimaryButton from "@/components/Button/PrimaryButton";
import Title from "@/components/Title/Title";
import PointContext, { PointContextProps } from "@/contexts/PointContext";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { getPoints } from "../../utils/points";
import PointsSummaryTable from "./components/PointsSummaryTable";

function Page() {
	const { points, setPoints } = useContext(PointContext) as PointContextProps;
	const { isPending, error, data } = useQuery({
		queryKey: ["points"],
		queryFn: getPoints,
	});
	const router = useRouter();

	useEffect(() => {
		if (data) {
			toast.success(data.message);
			setPoints(data.data);
		}
	}, [data, setPoints]);

	if (isPending) return <Skeleton active />;

	if (error) toast.error(error.message);
	return (
		<div className="flex flex-col">
			<div className="flex justify-between">
				<Title>Points</Title>
				<PrimaryButton handleClick={() => router.push("points/create")}>
					Create new point
				</PrimaryButton>
			</div>
			<PointsSummaryTable points={points} />
		</div>
	);
}

export default Page;
