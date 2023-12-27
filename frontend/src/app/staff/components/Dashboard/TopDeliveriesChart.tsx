import CustomBarChart from "@/app/staff/components/Charts/CustomBarChart";

export default function TopDeliveriesChart({
	data,
}: {
	data: Array<{
		point: string;
		incoming: number;
		outgoing: number;
	}>;
}) {
	const chartData = data.map(({ incoming, outgoing, point }) => {
		return { incoming, outgoing, name: point };
	});
	return (
		<div className="bg-custom-white px-6 p-4 col-span-2 shadow-md rounded-md">
			<div className="mb-2">Top Deliveries</div>
			<div className="ml-[-2rem] md:ml-[-1.5rem]">
				<CustomBarChart data={chartData} />
			</div>
		</div>
	);
}
