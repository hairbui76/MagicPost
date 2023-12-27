import CustomRadarChart from "@/app/staff/components/Charts/CustomRadarChart";

export default function PropertiesChart({
	data,
}: {
	data: Array<{
		property: string;
		value: number;
	}>;
}) {
	return (
		<div className="cols-span-1 bg-custom-white px-6 p-4 col-start-2 lg:col-start-3 row-start-2 lg:row-start-3 rounded-md shadow-md">
			<div className="mb-2">Package Properties</div>
			<CustomRadarChart data={data} />
		</div>
	);
}
