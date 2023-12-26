import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

const COLORS = ["#82ca9d", "#8884d8"];

export default function CustomBarChart({
	data,
}: {
	data: Array<
		{
			name: string;
		} & any
	>;
}) {
	return (
		<ResponsiveContainer width="100%" height={300} className="text-xs">
			<BarChart data={data}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend
					wrapperStyle={{
						fontSize: "0.7rem",
					}}
					iconType="square"
				/>
				{data && data.length
					? Object.keys(data[0])
							.filter((key) => key !== "name")
							.map((dataKey, index) => (
								<Bar key={dataKey} dataKey={dataKey} fill={COLORS[index]} />
							))
					: null}
			</BarChart>
		</ResponsiveContainer>
	);
}
