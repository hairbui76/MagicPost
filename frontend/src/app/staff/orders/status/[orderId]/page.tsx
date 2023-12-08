"use client";

import { OrderProps } from "@/app/staff/types/Order/orders";
import { getOrders } from "../../../utils/orders";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Skeleton } from "antd";
import { Order } from "@/app/staff/components";

function getOrderById(
	orders: Array<OrderProps>,
	orderId: string
): OrderProps | null {
	const filtered = orders.filter((order: OrderProps) => order.id === orderId);
	return filtered.length ? filtered[0] : null;
}

export default function Page({
	params,
}: {
	params: {
		orderId: string;
	};
}) {
	function updateOrder(newOrder: OrderProps) {
		console.log(newOrder);
	}

	const [order, setOrder] = useState<OrderProps | null>(null);
	const { isPending, error, data } = useQuery({
		queryKey: ["orders"],
		queryFn: getOrders,
	});
	useEffect(() => {
		const { orderId } = params;
		if (data) {
			const order = getOrderById(data.orders, orderId);
			setOrder(order);
			if (order === null) {
				toast.info(`Fetched successfully but order ${orderId} not found!`);
			} else toast.success(data.message);
		}
	}, [data, params, setOrder]);

	if (isPending) return <Skeleton active />;

	if (error) toast.error(error.message);

	return order ? <Order order={order} handleSubmit={updateOrder} /> : "Undone";
}
