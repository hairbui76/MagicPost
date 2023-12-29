"use client";

import { Order } from "@/app/staff/components";
import { OrderProps } from "@/app/staff/types/Order/orders";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";

async function fetchOrder(orderId: string) {
	return await fetch(
		`${process.env.NEXT_PUBLIC_ORDER_ENDPOINT}/get/${orderId}`,
		{ credentials: "include" }
	).then(async (response) => {
		if (response.status !== 200) {
			const message = await Promise.resolve(response.json()).then(
				(json) => json.message
			);
			throw new Error(message);
		}
		return response.json();
	});
}

async function updateOrder(order: OrderProps) {
	return fetch(`${process.env.NEXT_PUBLIC_ORDER_ENDPOINT}/update/${order.id}`, {
		credentials: "include",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(order),
		method: "PUT",
	});
}

export default function Page({
	params,
}: {
	params: {
		orderId: string;
	};
}) {
	const [trigger, setTrigger] = useState(false);
	const { orderId } = params;
	const { isPending, error, data } = useQuery({
		queryKey: ["order-by-id", orderId, trigger],
		queryFn: () => fetchOrder(orderId),
	});

	if (isPending) return <Skeleton active />;

	if (error) toast.error(error.message);

	if (data) {
		const order = data.data;

		return (
			<Order
				order={order}
				handleSubmit={async (newOrder: OrderProps) => {
					try {
						const response = await updateOrder(newOrder);
						const { message } = await response.json();
						if (response.status !== 200) throw new Error(message);
						toast.success(message);
						setTrigger(!trigger);
						// router.push("/staff/orders/status");
					} catch (err: any) {
						toast.error(err.message);
					}
				}}
			/>
		);
	}

	return "Order not found";
}
