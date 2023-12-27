import CustomPieChart from "@/app/staff/components/Charts/CustomPieChart";

export default function RevenueChart({
	cod,
	profit,
	delivery,
}: {
	cod: number;
	profit: number;
	delivery: number;
}) {
	const labels = ["COD", "Delivery Cost", "Profit"];
	const chartData = [cod, delivery, profit].map((attr, index) => {
		return {
			name: labels[index],
			value: attr,
		};
	});
	return (
		<div className="bg-custom-white p-4 px-6 relative rounded-md col-span-1 lg:col-start-3 col-start-1 row-start-2 shadow-md">
			<div className="font-md text-lg">This month&apos;s revenue</div>
			<div>
				<CustomPieChart data={chartData} />
				<div className="absolute w-full text-center top-[114px] font-bold text-sm">
					Total: {cod + profit + delivery}
				</div>
			</div>
		</div>
	);
}
