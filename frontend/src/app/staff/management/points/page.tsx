"use client";

import PrimaryButton from "@/components/Button/PrimaryButton";
import Title from "@/components/Title/Title";
import { useRouter } from "next/navigation";
import PointsSummaryTable from "./components/PointsSummaryTable";

function Page() {
	const router = useRouter();

	return (
		<div className="flex flex-col">
			<div className="flex justify-between">
				<Title>Points</Title>
				<PrimaryButton handleClick={() => router.push("points/create")}>
					Create new point
				</PrimaryButton>
			</div>
			<PointsSummaryTable />
		</div>
	);
}

export default Page;
