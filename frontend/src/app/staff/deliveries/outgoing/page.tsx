"use client";
import { useQuery } from "@tanstack/react-query";
import { getOutgoingOrders } from "../../utils/deliveries";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { OrderProps } from "../../types/Order/orders";
import Title from "../../components/Title/Title";
import OutgoingOrderTable from "./components/OutgoingOrderTable";

export default function Page() {
	const { isLoading, error, data } = useQuery({
		queryKey: ["outgoing"],
		queryFn: getOutgoingOrders,
	});
	const [selectedOrders, setSelectedOrders] = useState<Array<string>>([]);
	const [orders, setOrders] = useState<
		Array<OrderProps & { to: string; arrivedAt: string }>
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
			<Title>Outgoing Orders</Title>
			<OutgoingOrderTable {...{ orders, selectedOrders, setSelectedOrders }} />
		</div>
	);
}
