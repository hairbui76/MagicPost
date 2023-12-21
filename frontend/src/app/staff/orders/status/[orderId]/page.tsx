"use client";

import { OrderProps } from "@/app/staff/types/Order/orders";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Skeleton } from "antd";
import { Order } from "@/app/staff/components";
import { getOrderById } from "@/app/staff/utils/orders";

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
		queryKey: [`${params.orderId}`],
		queryFn: async () => {
			return await getOrderById(params.orderId);
		},
	});
	useEffect(() => {
		if (data) {
			const { order, message } = data;
			setOrder(order);
			toast.success(data.message);
		}
	}, [data, params, setOrder]);

	if (isPending) return <Skeleton active />;

	if (error) toast.error(error.message);

	return order ? (
		<Order order={order} handleSubmit={updateOrder} />
	) : (
		"Not found"
	);
}
