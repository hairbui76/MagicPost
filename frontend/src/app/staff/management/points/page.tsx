"use client";

import { toast } from "react-toastify";
import { OrderProps } from "../../types/Order/orders";
import Point from "../components/Point";

export default function Page() {
	async function handleSubmit(order: OrderProps) {
		const itemsWithoutID = order.packageInfo.items.map(
			({ name, quantity, weight, value }) => {
				return { name, quantity, weight, value };
			}
		);
		const processedOrders = {
			...order,
			packageInfo: { ...order.packageInfo, items: itemsWithoutID },
		};
		// TODO: Change DB schema to match OrderProps
		const body = {
			sender: processedOrders.sender,
			receiver: processedOrders.receiver,
			packageInfo: processedOrders.packageInfo,
			extraData: processedOrders.extraData,
		};
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_ORDER_ENDPOINT}/create`,
			{
				method: "POST",
				body: JSON.stringify(body),
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const response = await res.json();
		if (res.status === 200) {
			toast.success(response.message);
		} else {
			toast.error(response.message);
		}
	}
	//@ts-ignore
	return <Point handleSubmit={handleSubmit} />;
}
