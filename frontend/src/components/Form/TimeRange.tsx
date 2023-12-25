import { DatePicker } from "antd";
import InputContainer from "./InputContainer";
const { RangePicker } = DatePicker;

export default function TimeRange({
	timeRange,
	handleChange,
	label,
}: {
	label: string;
	timeRange: any;
	handleChange: any;
}) {
	return (
		<InputContainer {...{ label }} className="text-sm">
			<RangePicker value={timeRange} onChange={handleChange} />
		</InputContainer>
	);
}
