"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Order from "../../components/Order/Order";
import { OrderProps } from "../../types/Order/orders";

async function getPlaceDetail(placeId: string) {
	const res = await fetch(`/api/address/${placeId}`);
	const { data } = await res.json();
	const lat = data.geometry.location.lat;
	const long = data.geometry.location.lng;
	return { lat, long };
}

export default function Page() {
	const router = useRouter();
	async function handleSubmit(order: OrderProps) {
		const itemsWithoutID = order.packageInfo.items.map(
			({ name, quantity, weight, value }) => {
				return { name, quantity, weight, value };
			}
		);
		const [senderPlaceDetail, receiverPlaceDetail] = await Promise.all([
			getPlaceDetail(order.sender.address.id!),
			getPlaceDetail(order.receiver.address.id!),
		]);
		const processedOrders = {
			...order,
			sender: {
				...order.sender,
				address: { ...order.sender.address, ...senderPlaceDetail },
			},
			receiver: {
				...order.receiver,
				address: { ...order.receiver.address, ...receiverPlaceDetail },
			},
			packageInfo: { ...order.packageInfo, items: itemsWithoutID },
		};
		const body = {
			sender: processedOrders.sender,
			receiver: processedOrders.receiver,
			packageInfo: processedOrders.packageInfo,
			extraData: processedOrders.extraData,
		};
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_ORDER_ENDPOINT}/create`,
			{
				method: "POST",
				body: JSON.stringify(body),
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const response = await res.json();
		if (res.status === 200) {
			toast.success(response.message);
			router.push("status");
		} else {
			toast.error(response.message);
		}
	}
	return <Order handleSubmit={handleSubmit} />;
}
