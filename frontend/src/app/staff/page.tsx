"use client";

import Title from "@/components/Title/Title";
import Overview from "./components/Dashboard/Overview";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getStatistics } from "./utils/statistics";
import { toast } from "react-toastify";
import MonthlyOrderChart from "./components/Dashboard/MonthlyOrderChart";
import RevenueChart from "./components/Dashboard/RevenueChart";
import TopDeliveriesChart from "./components/Dashboard/TopDeliveriesChart";
import PropertiesChart from "./components/Dashboard/PropertiesChart";

export default function Page() {
	const [point, setPoint] = useState("all");
	const { isLoading, error, data } = useQuery({
		queryKey: ["statistics", point],
		queryFn: async () => {
			return await getStatistics(point);
		},
	});
	if (isLoading) return <div>Loading...</div>;
	if (error) toast.error(error.message);

	if (data) {
		const statistics = data.statistics;
		return (
			<div className="pt-4">
				<Title>Dashboard</Title>
				<div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
					<Overview {...statistics.overview} />
					<MonthlyOrderChart data={statistics.orders} />
					<RevenueChart {...statistics.revenue} />
					<TopDeliveriesChart data={statistics.topDeliveries} />
					<PropertiesChart data={statistics.properties} />
				</div>
			</div>
		);
	}
}
