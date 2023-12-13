"use client";

import { useReducer, useState } from "react";
import uniqid from "uniqid";
import { OrderProps } from "../types/Order/orders";
import { ItemProps, PackageProperties } from "../types/Order/package";
import { copyObject } from "@/utils";

export type Address = {
	id?: string;
	name: string;
	lat?: number | null;
	long?: number | null;
	province: string;
	district: string;
	ward: string;
};

export const emptyOrder = {
	id: "",
	sender: {
		name: "",
		address: {
			id: "",
			name: "",
			lat: null,
			long: null,
			province: "",
			district: "",
			ward: "",
		},
		phone: "",
	},
	receiver: {
		name: "",
		address: {
			id: "",
			name: "",
			lat: null,
			long: null,
			province: "",
			district: "",
			ward: "",
		},
		phone: "",
	},
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
				return copyObject(order.packageInfo.items);
			}
		}
		return [];
	}
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
	const [status, setStatus] = useState(order.status);

	function resetOrder() {
		setSender(copyObject(order.sender));
		setReceiver(copyObject(order.receiver));
		setType(copyObject(order.packageInfo.type));
		itemsDispatch({ type: "items_reset" });
		setCod(copyObject(order.extraData.cod));
		setPayer(copyObject(order.extraData.payer));
		setNote(copyObject(order.extraData.note));
		setStatus(copyObject(order.status));
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
		status: {
			value: status,
			handleChange: setStatus,
		},
	};
}

export async function getOrders() {
	return fetch(`${process.env.NEXT_PUBLIC_ORDER_ENDPOINT}/get`, {
		credentials: "include",
	}).then(async (res) => {
		if (res.status !== 200) {
			const json = await res.json();
			throw new Error(json.message);
		}
		return res.json();
	});
}
