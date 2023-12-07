"use client";

import { useOrderState, emptyOrder } from "../../utils/orders";
import { OrderProps } from "../../types/Order/orders";
import PrimaryButton from "../Button/PrimaryButton";
import SecondaryButton from "../Button/SecondaryButton";
import Form from "../Form/Form";
import CustomerFieldset from "./Customer/CustomerFieldset";
import ExtraDataFieldset from "./ExtraData/ExtraDataFieldset";
import PackageFieldset from "./Package/PackageFieldset";
import Title from "../Title/Title";

export default function Order({
	order = null,
	handleSubmit,
}: {
	order?: OrderProps | null;
	handleSubmit: (order: OrderProps) => void;
}) {
	const { id, sender, receiver, packageInfo, extraData, resetOrder } =
		useOrderState(order || emptyOrder);
	const packageValue = packageInfo.items.value.reduce(
		(packageValue, item) => packageValue + item.value,
		0
	);

	const newOrder = {
		id: "",
		sender: sender.value,
		receiver: receiver.value,
		packageInfo: {
			type: packageInfo.type.value,
			items: packageInfo.items.value,
			properties: packageInfo.properties.value,
		},
		extraData: {
			cod: extraData.cod.value,
			payer: extraData.payer.value,
			note: extraData.note.value,
		},
		createdAt: null,
		status: "",
	};

	return (
		<div>
			<Title>New Order</Title>
			<Form
				handleSubmit={() => handleSubmit(newOrder)}
				className="w-full gap-4 lg:grid lg:grid-cols-2 flex flex-col"
			>
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
		</div>
	);
}
