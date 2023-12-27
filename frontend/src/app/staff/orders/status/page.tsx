"use client";

import Title from "@/components/Title/Title";
import OrdersSummaryTable from "./components/Summary/OrdersSummaryTable";

function Page() {
	return (
		<div>
			<Title>Order Status</Title>
			<OrdersSummaryTable />
		</div>
	);
}

export default Page;
