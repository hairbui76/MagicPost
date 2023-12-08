"use client";

import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import OrdersSummaryTable from "./components/OrdersSummaryTable";
import Title from "../../components/Title/Title";
import { getOrders } from "../../utils/orders";

function Page() {
	const [orders, setOrders] = useState([]);
	const { isPending, error, data } = useQuery({
		queryKey: ["orders"],
		queryFn: getOrders,
	});

	useEffect(() => {
		if (data) {
			toast.success(data.message);
			setOrders(data.orders);
		}
	}, [data]);

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
