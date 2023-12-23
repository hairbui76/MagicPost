"use client";
import { useQuery } from "@tanstack/react-query";
import { getIncomingOrders } from "../../utils/deliveries";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { OrderProps } from "../../types/Order/orders";
import Title from "../../components/Title/Title";
import IncomingOrderTable from "./components/IncomingOrderTable";

export default function Page() {
	const { isLoading, error, data } = useQuery({
		queryKey: ["incoming"],
		queryFn: getIncomingOrders,
	});
	const [selectedOrders, setSelectedOrders] = useState<Array<string>>([]);
	const [orders, setOrders] = useState<
		Array<OrderProps & { from: string; deliveryTime: string }>
	>([]);
	useEffect(() => {
		if (data) {
			toast.success(data.message);
			setOrders([...data.orders]);
		}
	}, [data, setOrders]);
	if (isLoading) return <div>Loading...</div>;
	if (error) {
		toast.error(error.message);
	}
	return (
		<div>
			<Title>Incoming Orders</Title>

			<IncomingOrderTable {...{ orders, selectedOrders, setSelectedOrders }} />
		</div>
	);
}
