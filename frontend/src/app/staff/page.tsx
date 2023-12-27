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
import { Address } from "./utils/orders";
import AddressInput from "@/components/AddressInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Page() {
	const [point, setPoint] = useState<Address>({
		province: "",
		ward: "",
		district: "",
	});
	const [filterToggle, setFilterToggle] = useState(false);
	const { isLoading, error, data } = useQuery({
		queryKey: ["statistics", filterToggle],
		queryFn: () => getStatistics(point),
	});
	if (isLoading) return <div>Loading...</div>;
	if (error) toast.error(error.message);

	if (data) {
		const statistics = data.statistics;
		return (
			<div className="pt-4">
				<div className="flex flex-col sm:flex-row sm:items-end w-full">
					<Title>Dashboard</Title>
					<div className="w-full sm:w-fit flex flex-row items-end mb-4 ml-auto">
						<AddressInput
							rowLayoutOnSmallView={true}
							className="text-xs w-full sm:w-64"
							includeSpecificAddress={false}
							value={point}
							handleChange={(address) => setPoint({ ...point, ...address })}
						/>
						<button
							type="button"
							className="bg-custom-text-color h-9 w-9 rounded-md text-custom-white ml-2"
							onClick={() => setFilterToggle(!filterToggle)}
						>
							<FontAwesomeIcon icon={faMagnifyingGlass} />
						</button>
					</div>
				</div>
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
