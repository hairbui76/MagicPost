import {
	Legend,
	PolarAngleAxis,
	PolarGrid,
	PolarRadiusAxis,
	Radar,
	RadarChart,
	ResponsiveContainer,
} from "recharts";

export default function CustomRadarChart({
	data,
}: {
	data: Array<{
		property: string;
		value: number;
	}>;
}) {
	return (
		<ResponsiveContainer width="100%" height={300} className="text-xs">
			<RadarChart outerRadius={90} width={350} height={250} data={data}>
				<PolarGrid />
				<PolarAngleAxis dataKey="property" />
				<PolarRadiusAxis />
				<Radar
					dataKey="value"
					stroke="#8884d8"
					fill="#8884d8"
					fillOpacity={0.6}
				/>
			</RadarChart>
		</ResponsiveContainer>
	);
}
