import CustomLineChart from "@/app/staff/components/Charts/CustomLineChart";

export default function MonthlyOrderChart({
	data,
}: {
	data: Array<{
		day: number;
		incoming: number;
		outgoing: number;
		pending: number;
	}>;
}) {
	const chartData = data.map(({ day, incoming, outgoing, pending }) => {
		return {
			name: day.toString(),
			incoming,
			outgoing,
			pending,
		};
	});
	return (
		<div className="col-span-2 bg-custom-white px-6 p-4 rounded-md shadow-md">
			<div className="mb-2">This month&apos;s order status</div>
			<div className="ml-[-2rem] md:ml-[-1.5rem]">
				<CustomLineChart data={chartData} />
			</div>
		</div>
	);
}
