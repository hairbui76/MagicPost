import { DatePicker } from "antd";
import InputContainer from "./InputContainer";
const { RangePicker } = DatePicker;

export default function TimeRange({
	timeRange,
	handleChange,
	label,
	className = "",
}: {
	label: string;
	timeRange: any;
	handleChange: any;
	className?: string;
}) {
	return (
		<InputContainer {...{ label, className }}>
			<RangePicker value={timeRange} onChange={handleChange} />
		</InputContainer>
	);
}
