import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function CustomPieChart({
	data,
}: {
	data: Array<{
		name: string;
		value: number;
	}>;
}) {
	return (
		<ResponsiveContainer height={250} width="100%">
			<PieChart className="text-xs flex flex-col justify-between align-center">
				<Pie
					data={data}
					innerRadius={80}
					outerRadius={100}
					cy={130}
					fill="#8884d8"
					paddingAngle={5}
					dataKey="value"
					isAnimationActive={true}
					label
					className=""
				>
					{data.map((_, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
				<Tooltip />
				<Legend
					wrapperStyle={{
						position: "static",
					}}
				/>
			</PieChart>
		</ResponsiveContainer>
	);
}
