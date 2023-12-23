"use client";

import OrderContext, { OrderContextProps } from "@/contexts/OrderContext";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import OrdersSummaryTable from "./components/Summary/OrdersSummaryTable";
import Title from "../../components/Title/Title";
import { getOrders } from "../../utils/orders";

function Page() {
	const { orders, setOrders } = useContext(OrderContext) as OrderContextProps;
	const { isPending, error, data } = useQuery({
		queryKey: ["orders"],
		queryFn: getOrders,
	});

	useEffect(() => {
		if (data) {
			toast.success(data.message);
			setOrders(data.orders);
		}
	}, [data, setOrders]);

	if (isPending) return <Skeleton active />;

	if (error) toast.error(error.message);
	return (
		<div>
			<Title>Order Status</Title>
			<OrdersSummaryTable orders={orders} />
		</div>
	);
}

export default Page;
