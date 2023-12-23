import { OrderProps } from "@/app/staff/types/Order/orders";

export type LookUpResultProps = OrderProps & {
	timeline: Array<{ event: string; time: string | null }>;
};

export async function getOrderById(orderId: string) {
	await new Promise((resolve) => setTimeout(resolve, 2000));
	return Promise.resolve({
		message: "Get order successfully",
		order: {
			id: "4d7d9f32-433b-4846-b55e-f6f550fd510f",
			createdAt: "2023-12-23T07:45:17.9450782Z",
			status: "PENDING",
			sender: {
				name: "string",
				address: {
					name: "string",
					lat: 0,
					long: 0,
					province: "string",
					district: "string",
					ward: "string",
				},
				phone: "string",
			},
			receiver: {
				name: "string",
				address: {
					name: "string",
					lat: 0,
					long: 0,
					province: "string",
					district: "string",
					ward: "string",
				},
				phone: "string",
			},
			packageInfo: {
				type: "string",
				items: [],
				properties: ["fragile", "liquid", "something"],
			},
			extraData: {
				cod: 0,
				payer: "RECEIVER",
				note: "string",
			},
			timeline: [
				{
					event: "Received from sender at Hanoi' transact point",
					time: new Date().toString(),
				},
				{
					event: "Arrived at Hanoi's gathering point",
					time: new Date().toString(),
				},
				{
					event: "Returned to Hanoi's gathering point",
					time: new Date().toString(),
				},
				{
					event: "Arrived at TP HCM's gathering point",
					time: new Date().toString(),
				},
				{
					event: "Arrived at TP HCM's transact point",
					time: null,
				},
				{
					event: "Sent to receiver",
					time: null,
				},
			],
		},
	});
	return fetch(`${process.env.NEXT_PUBLIC_ORDER_ENDPOINT}/get/${orderId}`, {
		credentials: "include",
	}).then(async (res) => {
		if (res.status !== 200) {
			const json = await res.json();
			throw new Error(json.message);
		}
		return res.json();
	});
}
