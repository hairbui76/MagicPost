"use client";

import Title from "@/components/Title/Title";
import CustomLineChart from "../../components/Charts/CustomLineChart";
import Overview from "./components/Overview";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getStatistics } from "../../utils/statistics";
import { toast } from "react-toastify";
import MonthlyOrderChart from "./components/MonthlyOrderChart";
import RevenueChart from "./components/RevenueChart";
import TopDeliveriesChart from "./components/TopDeliveriesChart";
import PropertiesChart from "./components/PropertiesChart";

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
			<div>
				<Title>Statistics</Title>
				<div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
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
