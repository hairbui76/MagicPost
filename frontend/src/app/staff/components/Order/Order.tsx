"use client";

import PrimaryButton from "@/components/Button/PrimaryButton";
import SecondaryButton from "@/components/Button/SecondaryButton";
import TerminateButton from "@/components/Button/TerminateButton";
import Form from "@/components/Form/Form";
import Title from "@/components/Title/Title";
import { faReceipt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import { OrderProps } from "../../types/Order/orders";
import { ItemProps } from "../../types/Order/package";
import { emptyOrder, useOrderState } from "../../utils/orders";
import CustomerFieldset from "./Customer/CustomerFieldset";
import ExtraDataFieldset from "./ExtraData/ExtraDataFieldset";
import PackageFieldset from "./Package/PackageFieldset";

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
	const [editable, setEditable] = useState(order === null);
	const packageValue = packageInfo.items.value.reduce(
		(packageValue: number, item: ItemProps) => packageValue + item.value,
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
			<div className="flex flex-row justify-between items-center">
				<Title>{order ? `Order ID: ${order.id}` : "New Order"}</Title>
				{editable ? null : (
					<button
						className="btn btn-success mb-4 btn-sm"
						type="button"
						onClick={() => setEditable(true)}
					>
						EDIT
					</button>
				)}
			</div>
			{order ? (
				<Link
					className="w-fit link link-neutral mb-4 block"
					href={`/view/${order.id}`}
				>
					<FontAwesomeIcon icon={faReceipt} className="mr-2" />
					View receipt
				</Link>
			) : null}
			<Form
				handleSubmit={() => handleSubmit({ ...order, ...newOrder })}
				className="w-full gap-4 lg:grid lg:grid-cols-2 flex flex-col"
			>
				<CustomerFieldset
					type="sender"
					info={sender.value}
					handleChange={sender.handleChange}
					disabled={!editable}
				/>
				<CustomerFieldset
					type="receiver"
					info={receiver.value}
					handleChange={receiver.handleChange}
					disabled={!editable}
				/>
				<PackageFieldset {...packageInfo} disabled={!editable} />
				<ExtraDataFieldset
					{...{ ...extraData, packageValue }}
					disabled={!editable}
				/>
				<div className="flex flex-row gap-4">
					{order ? (
						editable ? (
							<>
								<PrimaryButton type="submit">Save Changes</PrimaryButton>
								<TerminateButton
									type="button"
									handleClick={() => {
										resetOrder();
										setEditable(false);
									}}
								>
									Discard Changes
								</TerminateButton>
							</>
						) : null
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
