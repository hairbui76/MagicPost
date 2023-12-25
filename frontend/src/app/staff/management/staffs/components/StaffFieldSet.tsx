import Fieldset from "@/components/Form/Fieldset";
import TextInput from "@/components/Form/TextInput";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { StaffStateProps } from "../../../utils/staffs";

export default function StaffFieldSet({ state }: { state: StaffStateProps }) {
	return (
		<Fieldset
			legend="Staff's Information"
			icon={faLocationDot}
			className="sm:flex-col"
		>
			<TextInput
				label="Name"
				placeholder="Name"
				required={true}
				name="name"
				value={state.name.value}
				handleChange={(name: string) => state.name.handleChange(name)}
			/>
			<TextInput
				label="Username"
				placeholder="Username"
				required={true}
				name="username"
				value={state.username.value}
				handleChange={(username: string) =>
					state.username.handleChange(username)
				}
			/>
			<TextInput
				label="Email"
				placeholder="Email"
				required={true}
				name="email"
				value={state.email.value}
				handleChange={(email: string) => state.email.handleChange(email)}
			/>
			<TextInput
				label="Phone number"
				placeholder="Phone number"
				required={true}
				name="phoneNumber"
				value={state.phoneNumber.value}
				handleChange={(phoneNumber: string) =>
					state.phoneNumber.handleChange(phoneNumber)
				}
			/>
		</Fieldset>
	);
}
