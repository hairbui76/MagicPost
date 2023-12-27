export default function Overview({
	incoming,
	outgoing,
	pending,
	revenue,
	profit,
}: {
	incoming: number;
	outgoing: number;
	pending: number;
	revenue: number;
	profit: number;
}) {
	const labels = ["Incoming", "Outgoing", "Pending", "Revenue", "Profit"];
	const zip = [incoming, outgoing, pending, revenue, profit].map(
		(attr, index) => {
			return {
				label: labels[index],
				value: attr,
			};
		}
	);
	return (
		<div className=" bg-custom-white px-6 p-4 rounded-md col-span-2 lg:col-span-3 shadow-md">
			<div className="font-md mb-2">Today</div>
			<div className="grid grid-cols-5">
				{zip.map(({ label, value }) => (
					<div key={label}>
						<div className="text-slate-500 text-sm">{label}</div>
						<div className="font-bold text-lg">{value}</div>
					</div>
				))}
			</div>
		</div>
	);
}
