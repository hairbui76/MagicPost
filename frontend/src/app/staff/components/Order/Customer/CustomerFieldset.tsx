import { Address } from "@/app/staff/utils/orders";
import AddressInput from "@/components/AddressInput";
import { faUserCheck, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction } from "react";
import Fieldset from "../../Form/Fieldset";
import TextInput from "../../Form/TextInput";
export default function CustomerFieldset({
	type,
	info,
	handleChange,
}: {
	type: "sender" | "receiver";
	info: { name: string; address: Address; phone: string };
	handleChange: Dispatch<
		SetStateAction<{ name: string; address: Address; phone: string }>
	>;
}) {
	const pronounce = type === "sender" ? "Sender's" : "Receiver's";
	const legend = pronounce + " Information";
	const { name, address, phone } = info;
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
			<TextInput
				label="Phone"
				placeholder={`${pronounce} number`}
				name={`${type}-phone`}
				value={phone}
				handleChange={(phone) => handleChange({ ...info, phone })}
			/>
			<AddressInput
				handleChange={(placeId, name, province, district, ward) =>
					handleChange({
						...info,
						address: {
							...address,
							id: placeId,
							name,
							province,
							district,
							ward,
						},
					})
				}
			/>
		</Fieldset>
	);
}
