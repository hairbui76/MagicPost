"use client";

import { toast } from "react-toastify";
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
	return <Order handleSubmit={handleSubmit} />;
}
