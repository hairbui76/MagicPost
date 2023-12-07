"use client";

import { useEffect, useState } from "react";
import OrdersSummaryTable from "./components/OrdersSummaryTable";
import { OrderProps } from "../../types/Order/orders";
import { emptyOrder } from "../../utils/orders";
import Title from "../../components/Title/Title";

const sampleOrders = (() => {
	const res = [];
	for (let i = 0; i < 5; i++) {
		res.push({ ...emptyOrder, id: `${i}`, createdAt: new Date() });
	}
	return res;
})();

async function getOrders() {
	try {
		const orders = await fetch(
			`${process.env.NEXT_PUBLIC_GET_ALL_ORDERS_ENDPOINT}`,
			{
				headers: {
					Accept: "text/plain",
				},
				credentials: "include",
			}
		).then((response) => response.json());
		return orders;
	} catch (error) {
		throw error;
	}
}

function Page() {
	const [orders, setOrders] = useState([] as Array<OrderProps>);
	useEffect(() => {
		// (async () => {
		// 	try {
		// 		const res = await getOrders();
		// 		setOrders(res);
		// 	} catch (error) {
		// 		console.log(error);
		// 	}
		// })();

		setOrders(sampleOrders);
	}, []);
	return (
		<div>
			<Title>Order Status</Title>
			<OrdersSummaryTable orders={orders} />
		</div>
	);
}

export default Page;
