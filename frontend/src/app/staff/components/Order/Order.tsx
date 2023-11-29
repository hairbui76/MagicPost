"use client";

import { useState, useReducer, ReducerWithoutAction } from "react";
import PrimaryButton from "../Button/PrimaryButton";
import SecondaryButton from "../Button/SecondaryButton";
import Form from "../Form/Form";
import CustomerFieldset from "./Customer/CustomerFieldset";
import PackageFieldset from "./Package/PackageFieldset";
import { PackageTypeProps } from "./Package/PackageTypeField";
import { PackageItemsProps } from "./Package/PackageItemsField";
import uniqid from "uniqid";
import { ItemProps } from "./Package/PackageItem";

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
	const [packageItems, itemsDispatch] = useReducer(
		itemsReducer as ReducerWithoutAction<Array<ItemProps>>,
		[
			{
				id: uniqid(),
				name: "helmet",
				value: 0,
				weight: 10,
				quantity: 100,
			},
		] as Array<ItemProps>
	);
	const type = {
		value: packageType,
		handleChange: setPackageType,
	} as PackageTypeProps;
	const items = {
		value: packageItems,
		handleChange: itemsDispatch,
	} as PackageItemsProps;
	return (
		<Form action={action}>
			<CustomerFieldset type="sender" info={sender} handleChange={setSender} />
			<CustomerFieldset
				type="receiver"
				info={receiver}
				handleChange={setReceiver}
			/>
			<PackageFieldset {...{ type, items }} />
			<div className="flex flex-row gap-4">
				<PrimaryButton type="submit">Confirm</PrimaryButton>
				<SecondaryButton type="reset">Reset</SecondaryButton>
			</div>
		</Form>
	);
}

function itemsReducer(
	items: Array<ItemProps>,
	action: { type: string; item?: ItemProps }
) {
	const { type, item } = action;
	switch (type) {
		case "item_changed": {
			return items.map((curItem) => {
				if (item && curItem.id === item.id) {
					return item;
				}
				return curItem;
			});
		}
		case "item_added": {
			return [
				...items,
				{ id: uniqid(), name: "", quantity: 1, value: 0, weight: 0 },
			];
		}
		case "item_removed": {
			return items.filter((curItem) => item && curItem.id !== item.id);
		}
	}
	return [];
}
