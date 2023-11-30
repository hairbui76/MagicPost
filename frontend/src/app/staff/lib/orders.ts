"use client";

import { useReducer, useState } from "react";
import uniqid from "uniqid";
import {
	ItemProps,
	PackageOrderProps,
	PackageProperties,
} from "../types/orders";

const emptyOrder = {
	sender: { name: "", address: "", phone: "" },
	receiver: { name: "", address: "", phone: "" },
	packageInfo: {
		type: "parcel" as "parcel" | "document",
		items: [] as Array<ItemProps>,
		properties: [] as Array<PackageProperties>,
	},
};

export function useOrderState(order: PackageOrderProps = emptyOrder) {
	const [sender, setSender] = useState(order.sender);
	const [receiver, setReceiver] = useState(order.receiver);
	const [type, setType] = useState(order.packageInfo.type);
	const [items, itemsDispatch] = useReducer(
		itemsReducer,
		order.packageInfo.items as Array<ItemProps>
	);
	const [packageProperties, setPackageProperties] = useState(
		order.packageInfo.properties as Array<PackageProperties>
	);

	return {
		sender: {
			value: sender,
			handleChange: setSender,
		},
		receiver: {
			value: receiver,
			handleChange: setReceiver,
		},
		packageInfo: {
			type: {
				value: type,
				handleChange: setType,
			},
			items: {
				value: items,
				handleChange: itemsDispatch,
			},
			properties: {
				value: packageProperties,
				handleChange: setPackageProperties,
			},
		},
	};
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
