import TimeRange from "../../../../../components/Form/TimeRange";

export default function TimeRangeFilter({
	timeRange,
	setTimeRange,
}: {
	timeRange: any;
	setTimeRange: any;
}) {
	return (
		<TimeRange
			{...{
				timeRange,
				handleChange: (dates: any) => {
					setTimeRange(dates);
				},
			}}
			className="text-sm"
			label="Range"
		/>
	);
}
