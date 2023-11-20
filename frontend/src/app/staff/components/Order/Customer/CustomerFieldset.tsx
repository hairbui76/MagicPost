import Input from "../../Form/Input";
import Fieldset from "../../Form/Fieldset";
export default function CustomerFieldset({
	type,
}: {
	type: "sender" | "receiver";
}) {
	const pronounce = type === "sender" ? "Sender's" : "Receiver's";
	const legend =
		(type === "sender" ? "1. " : "2. ") + pronounce + " Information";
	return (
		<Fieldset legend={legend}>
			<Input
				label="Full name"
				placeholder={`${pronounce} name`}
				required={true}
				name={`${type}-name`}
			/>
			<Input
				label="Address"
				placeholder={`${pronounce} address`}
				required={true}
				name={`${type}-address`}
			/>
			<Input
				label="Phone"
				placeholder={`${pronounce} number`}
				name={`${type}-phone`}
			/>
		</Fieldset>
	);
}
