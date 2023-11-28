"use client";

import { useState } from "react";
import PrimaryButton from "../Button/PrimaryButton";
import SecondaryButton from "../Button/SecondaryButton";
import Form from "../Form/Form";
import CustomerFieldset from "./Customer/CustomerFieldset";
import PackageFieldset from "./Package/PackageFieldset";
import { PackageTypeProps } from "./Package/PackageFieldset";

export default function Order({
	action,
}: {
	action: (formData: FormData) => void;
}) {
	const [sender, setSender] = useState({ name: "", address: "", phone: "" });
	const [receiver, setReceiver] = useState({
		name: "",
		address: "",
		phone: "",
	});
	const [packageType, setPackageType] = useState("parcel");
	const packageInfo = {
		type: {
			value: packageType,
			handleChange: setPackageType,
		} as PackageTypeProps,
	};
	return (
		<Form action={action}>
			<CustomerFieldset type="sender" info={sender} handleChange={setSender} />
			<CustomerFieldset
				type="receiver"
				info={receiver}
				handleChange={setReceiver}
			/>
			<PackageFieldset {...packageInfo} />
			<div className="flex flex-row gap-4">
				<PrimaryButton type="submit">Confirm</PrimaryButton>
				<SecondaryButton type="reset">Reset</SecondaryButton>
			</div>
		</Form>
	);
}
