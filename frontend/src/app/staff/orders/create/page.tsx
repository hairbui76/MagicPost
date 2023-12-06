"use client";

import Order from "../../components/Order/Order";
import { OrderProps } from "../../types/Order/orders";
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
			SenderName: processedOrders.sender.name,
			SenderAddress: processedOrders.sender.address,
			SenderPhone: processedOrders.sender.phone,
			Receiver: processedOrders.receiver.name,
			ReceiverAddress: processedOrders.receiver.address,
			ReceiverPhone: processedOrders.receiver.phone,
		};
		const result = await fetch(
			`${process.env.NEXT_PUBLIC_CREATE_ORDER_ENDPOINT}`,
			{
				method: "POST",
				body: JSON.stringify(body),
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			}
		).then((response) => response.json());
		console.log(result);
	}
	return <Order handleSubmit={handleSubmit} />;
}
