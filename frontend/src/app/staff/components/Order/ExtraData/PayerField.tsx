import { PayerProps } from "@/app/staff/types/Order/extradata";
import RadioInput from "../../../../../components/Form/RadioInput";

export function PayerField({ value, handleChange }: PayerProps) {
	return (
		<div className="flex flex-col gap-2">
			<div className="font-medium">Payer</div>
			<div className="flex flex-row justify-between">
				<RadioInput
					label="Sender"
					name="payer"
					checked={value === "sender"}
					handleChange={() => {
						if (value !== "sender") {
							handleChange("sender");
						}
					}}
					value={"sender"}
				/>
				<RadioInput
					label="Receiver"
					name="payer"
					checked={value === "receiver"}
					handleChange={() => {
						if (value !== "receiver") {
							handleChange("receiver");
						}
					}}
					value={"receiver"}
				/>
			</div>
		</div>
	);
}
