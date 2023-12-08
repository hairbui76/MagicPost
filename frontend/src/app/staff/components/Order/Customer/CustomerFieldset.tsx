import AddressInput from "@/components/AddressInput";
import { faUserCheck, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction } from "react";
import Fieldset from "../../Form/Fieldset";
import Select from "../../Form/Select";
import TextInput from "../../Form/TextInput";
export default function CustomerFieldset({
	type,
	info,
	handleChange,
}: {
	type: "sender" | "receiver";
	info: { name: string; address: string; phone: string };
	handleChange: Dispatch<
		SetStateAction<{ name: string; address: string; phone: string }>
	>;
}) {
	const pronounce = type === "sender" ? "Sender's" : "Receiver's";
	const legend = pronounce + " Information";
	const { name, address, phone } = info;
	const fakeAddressOptions = [
		{
			value: "HN",
			label: "Hanoi",
		},
		{
			value: "HCM",
			label: "TP Ho Chi Minh",
		},
	];
	return (
		<Fieldset
			legend={legend}
			icon={type === "sender" ? faUserPen : faUserCheck}
			className="sm:flex-col"
		>
			<TextInput
				label="Full name"
				placeholder={`${pronounce} name`}
				required={true}
				name={`${type}-name`}
				value={name}
				handleChange={(name) => handleChange({ ...info, name })}
			/>
			<Select
				label="Address"
				required={true}
				name={`${type}-address`}
				value={address}
				handleChange={(address) => handleChange({ ...info, address })}
				options={fakeAddressOptions}
			/>
			<TextInput
				label="Phone"
				placeholder={`${pronounce} number`}
				name={`${type}-phone`}
				value={phone}
				handleChange={(phone) => handleChange({ ...info, phone })}
			/>
			<AddressInput />
		</Fieldset>
	);
}
