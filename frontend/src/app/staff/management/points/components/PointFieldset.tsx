import AddressInput from "@/components/AddressInput";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Fieldset from "../../../../../components/Form/Fieldset";
import Select from "../../../../../components/Form/Select";
import TextInput from "../../../../../components/Form/TextInput";
import { PointStateProps } from "../../../utils/points";

export default function PointFieldSet({ state }: { state: PointStateProps }) {
	return (
		<Fieldset
			legend={"Point's Information"}
			icon={faLocationDot}
			className="sm:flex-col"
		>
			<TextInput
				label="Point name"
				placeholder="Point name"
				required={true}
				name="point-name"
				value={state.pointName.value}
				handleChange={(pointName: string) =>
					state.pointName.handleChange(pointName)
				}
			/>
			<Select
				label="Point type"
				name="type"
				options={[
					{ label: "Transaction Point", value: "TransactionPoint" },
					{ label: "Gathering Point", value: "GatheringPoint" },
				]}
				handleChange={(value) => {
					state.type.handleChange(value);
				}}
				className="text-sm"
				value={state.type.value}
				required={true}
			/>
			<TextInput
				label="Phone"
				placeholder="Phone"
				required={true}
				name="phone"
				value={state.phone.value}
				handleChange={(phone: string) => state.phone.handleChange(phone)}
			/>
			<TextInput
				label="Email"
				placeholder="Email"
				required={true}
				name="email"
				value={state.email.value}
				handleChange={(email: string) => state.email.handleChange(email)}
			/>
			<AddressInput
				value={state.address.value}
				handleChange={(newAddress) =>
					state.address.handleChange({
						...state.address.value,
						...newAddress,
					})
				}
			/>
		</Fieldset>
	);
}
