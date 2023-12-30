"use client";

import { toast } from "react-toastify";
import { useReducer, useState } from "react";
import uniqid from "uniqid";
import { OrderProps } from "../types/Order/orders";
import { ItemProps, PackageProperties } from "../types/Order/package";
import { copyObject } from "@/utils";

export type Address = {
	id?: string | null;
	name?: string | null;
	lat?: number | null;
	long?: number | null;
	province?: string | null;
	district?: string | null;
	ward?: string | null;
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
	createdAt: "",
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

const [
	filterIncomingOrders,
	filterOutGoingOrders,
	filterWaitingOrder,
	filterOrders,
] = [
	"/order/getIncomingOrders",
	"/order/getOutgoingOrders",
	"/order/getArrivedOrders",
	"/order/filter",
].map((path) => createFilterOrdersFunction(path));

const [confirmIncomingOrders, confirmOutGoingOrders, confirmWaitingOrders] = [
	"/order/confirmIncomingOrders",
	"/order/forwardOrders",
	"/order/confirmArrivedOrders",
].map((path) => createConfirmOrdersFunction(path));

export {
	filterIncomingOrders,
	filterOutGoingOrders,
	filterWaitingOrder,
	filterOrders,
	confirmIncomingOrders,
	confirmOutGoingOrders,
	confirmWaitingOrders,
};

function createFilterOrdersFunction(path: string) {
	const filterOrders = async (params: {
		pageNumber: number;
		status?: string;
		category?: string;
		startDate?: Date;
		endDate?: Date;
		province?: string | undefined | null;
		district?: string | undefined | null;
		ward?: string | undefined | null;
	}) => {
		const { pageNumber, startDate, endDate, status, category } = params;
		const filter: { [key: string]: string } = {
			pageNumber: pageNumber.toString(),
		};
		if (startDate) filter[`startDate`] = startDate.toISOString();
		if (endDate) filter[`endDate`] = endDate.toISOString();
		if (status) filter[`status`] = status;
		if (category) filter[`category`] = category;

		return fetch(
			process.env.NEXT_PUBLIC_API_ENDPOINT +
				path +
				"?" +
				new URLSearchParams(filter),
			{
				credentials: "include",
			}
		).then(async (res) => {
			if (res.status !== 200) {
				const json = await res.json();
				throw new Error(json.message);
			}
			return res.json();
		});
	};
	return filterOrders;
}

function createConfirmOrdersFunction(path: string) {
	return async ({
		orders,
		confirm,
		reason,
	}: {
		orders: string[];
		confirm: boolean;
		reason?: string;
	}) => {
		try {
			const json = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + path, {
				credentials: "include",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					orders,
					confirm,
				}),
			}).then(async (response) => {
				if (response.status !== 200) {
					const message = await Promise.resolve(response.json()).then(
						(json) => json.message
					);
					throw new Error(message);
				}
				return response.json();
			});
			toast.success(json.message);
			return json;
		} catch (err: any) {
			toast.error(err.message);
		}
	};
}
