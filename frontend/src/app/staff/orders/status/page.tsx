"use client";

import OrderContext, { OrderContextProps } from "@/contexts/OrderContext";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import OrdersSummaryTable from "./components/OrdersSummaryTable";

async function getOrders() {
	return fetch(`${process.env.NEXT_PUBLIC_ORDER_ENDPOINT}/get`, {
		credentials: "include",
	}).then(async (res) => {
		if (res.status !== 200) {
			const json = await res.json();
			throw new Error(json.message);
		}
		return res.json();
	});
}

function Page() {
	const { orders, setOrders } = useContext(OrderContext) as OrderContextProps;
	const { isPending, error, data } = useQuery({
		queryKey: ["repoData"],
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

	return <OrdersSummaryTable orders={orders} />;
}

export default Page;
