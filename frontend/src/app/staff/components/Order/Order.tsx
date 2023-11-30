"use client";

import { useOrderState } from "../../lib/orders";
import PrimaryButton from "../Button/PrimaryButton";
import SecondaryButton from "../Button/SecondaryButton";
import Form from "../Form/Form";
import CustomerFieldset from "./Customer/CustomerFieldset";
import PackageFieldset from "./Package/PackageFieldset";

export default function Order() {
	const { sender, receiver, packageInfo } = useOrderState();
	return (
		<Form action={() => {}}>
			<CustomerFieldset
				type="sender"
				info={sender.value}
				handleChange={sender.handleChange}
			/>
			<CustomerFieldset
				type="receiver"
				info={receiver.value}
				handleChange={receiver.handleChange}
			/>
			<PackageFieldset {...packageInfo} />
			<div className="flex flex-row gap-4">
				<PrimaryButton type="submit">Confirm</PrimaryButton>
				<SecondaryButton type="reset">Reset</SecondaryButton>
			</div>
		</Form>
	);
}
