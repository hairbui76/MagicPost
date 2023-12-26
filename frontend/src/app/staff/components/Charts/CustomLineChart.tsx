import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

const colors = ["#9CD08F", "#4281A4", "#EA526F"];

export default function CustomLineChart({
	data,
}: {
	data: Array<
		{
			name: string;
		} & any
	>;
}) {
	return (
		<ResponsiveContainer width="100%" height={250}>
			<LineChart data={data}>
				<CartesianGrid strokeDasharray="5 5" />
				<XAxis dataKey="name" className="text-xs" />
				<YAxis className="text-xs" />
				<Tooltip wrapperStyle={{ fontSize: "0.75rem" }} />
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
								<Line
									type="linear"
									dataKey={dataKey}
									stroke={colors[index]}
									key={dataKey}
								/>
							))
					: null}
			</LineChart>
		</ResponsiveContainer>
	);
}
