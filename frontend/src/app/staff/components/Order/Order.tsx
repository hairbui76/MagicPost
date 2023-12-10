"use client";

import { OrderProps } from "../../types/Order/orders";
import { emptyOrder, useOrderState } from "../../utils/orders";
import PrimaryButton from "../Button/PrimaryButton";
import SecondaryButton from "../Button/SecondaryButton";
import Form from "../Form/Form";
import Title from "../Title/Title";
import CustomerFieldset from "./Customer/CustomerFieldset";
import ExtraDataFieldset from "./ExtraData/ExtraDataFieldset";
import PackageFieldset from "./Package/PackageFieldset";
import Link from "next/link";
import { faReceipt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TerminateButton from "../Button/TerminateButton";

export default function Order({
	order = null,
	handleSubmit,
}: {
	order?: OrderProps | null;
	handleSubmit: (order: OrderProps) => void;
}) {
	const {
		id,
		createdAt,
		status,
		sender,
		receiver,
		packageInfo,
		extraData,
		resetOrder,
	} = useOrderState(order || emptyOrder);
	const packageValue = packageInfo.items.value.reduce(
		(packageValue, item) => packageValue + item.value,
		0
	);
	const newOrder = {
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
		id,
		createdAt,
		status: status.value,
	};

	return (
		<div>
			<Title>{order ? `Order ID: ${order.id}` : "New Order"}</Title>
			{order ? (
				<Link
					className="w-fit link link-neutral mb-4 block"
					href={`/staff/view/${order.id}`}
				>
					<FontAwesomeIcon icon={faReceipt} className="mr-2" />
					View receipt
				</Link>
			) : null}
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
					{order ? (
						<>
							<PrimaryButton type="submit">Save</PrimaryButton>
							<TerminateButton
								type="submit"
								handleClick={() => status.handleChange("cancelled")}
							>
								Cancel Order
							</TerminateButton>
						</>
					) : (
						<>
							<PrimaryButton type="submit">Confirm</PrimaryButton>
							<SecondaryButton type="reset" handleClick={() => resetOrder()}>
								Reset
							</SecondaryButton>
						</>
					)}
				</div>
			</Form>
		</div>
	);
}
