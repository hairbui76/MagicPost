"use client";

import { useOrderState } from "../../lib/orders";
import PrimaryButton from "../Button/PrimaryButton";
import SecondaryButton from "../Button/SecondaryButton";
import Form from "../Form/Form";
import CustomerFieldset from "./Customer/CustomerFieldset";
import ExtraDataFieldset from "./ExtraData/ExtraDataFieldset";
import PackageFieldset from "./Package/PackageFieldset";

export default function Order() {
	const { sender, receiver, packageInfo, extraData, resetOrder } =
		useOrderState();
	const packageValue = packageInfo.items.value.reduce(
		(packageValue, item) => packageValue + item.value,
		0
	);
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
			<ExtraDataFieldset {...{ ...extraData, packageValue }} />
			<div className="flex flex-row gap-4">
				<PrimaryButton type="submit">Confirm</PrimaryButton>
				<SecondaryButton type="reset" handleClick={() => resetOrder()}>
					Reset
				</SecondaryButton>
			</div>
		</Form>
	);
}
