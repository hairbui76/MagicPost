"use client";

import { OrderProps } from "@/app/staff/types/Order/orders";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Skeleton } from "antd";
import { Order } from "@/app/staff/components";
import { useRouter } from "next/navigation";

async function fetchOrder(orderId: string) {
	return await fetch(
		`${process.env.NEXT_PUBLIC_API_ENDPOINT}/order/get/${orderId}`,
		{
			credentials: "include",
		}
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
	console.log(order);
	return;
	try {
		toast.info(`Updating order ${order.id}`);
		await fetch(
			`${process.env.NEXT_PUBLIC_API_ENDPOINT}/order/UpdateOrder/${order.id}`,
			{
				credentials: "include",
				body: JSON.stringify(order),
				method: "PUT",
			}
		).then(async (response) => {
			const message = await Promise.resolve(response.json()).then(
				(json) => json.message
			);
			if (response.status !== 200) {
				throw new Error(message);
			}
			toast.success(message);
		});
	} catch (error: any) {
		toast.error(error.message);
	}
}

export default function Page({
	params,
}: {
	params: {
		orderId: string;
	};
}) {
	const router = useRouter();
	const { orderId } = params;
	const { isPending, error, data } = useQuery({
		queryKey: ["order-by-id", orderId],
		queryFn: () => fetchOrder(orderId),
	});

	if (isPending) return <Skeleton active />;

	if (error) toast.error(error.message);

	if (data) {
		const order = data.data.data;

		return (
			<Order
				order={order}
				handleSubmit={(newOrder: OrderProps) => {
					router.push("/staff/orders/status");
					updateOrder(newOrder);
				}}
			/>
		);
	}

	return "Not found";
}
