"use client";

import { useReducer, useState } from "react";
import uniqid from "uniqid";
import { OrderProps } from "../types/Order/orders";
import { ItemProps, PackageProperties } from "../types/Order/package";

export const emptyOrder = {
	id: "",
	sender: { name: "", address: "", phone: "" },
	receiver: { name: "", address: "", phone: "" },
	packageInfo: {
		type: "parcel" as "parcel" | "document",
		items: [] as Array<ItemProps>,
		properties: [] as Array<PackageProperties>,
	},
	extraData: {
		cod: 0,
		payer: "sender" as "sender" | "receiver",
		note: "",
	},
	createdAt: null,
	status: "",
};

export function useOrderState(order: OrderProps) {
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
	const [cod, setCod] = useState(order.extraData.cod);
	const [payer, setPayer] = useState(order.extraData.payer);
	const [note, setNote] = useState(order.extraData.note);

	function resetOrder() {
		setSender(emptyOrder.sender);
		setReceiver(emptyOrder.receiver);
		setType(emptyOrder.packageInfo.type);
		itemsDispatch({ type: "items_reset" });
		setCod(emptyOrder.extraData.cod);
		setPayer(emptyOrder.extraData.payer);
		setNote(emptyOrder.extraData.note);
	}

	return {
		id: order.id,
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
		extraData: {
			cod: {
				value: cod,
				handleChange: setCod,
			},
			payer: {
				value: payer,
				handleChange: setPayer,
			},
			note: {
				value: note,
				handleChange: setNote,
			},
		},
		resetOrder,
		createdAt: order.createdAt,
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
		case "items_reset": {
			return [];
		}
	}
	return [];
}
