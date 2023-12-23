import { OrderProps } from "../types/Order/orders";

const date = new Date().toString();

// TODO: Change fetch's API
export async function getIncomingOrders() {
	// return await fetch(
	// 	`${process.env.NEXT_PUBLIC_API_ENDPOINT}/get/incoming`,
	// 	{
	// 		credentials: "include",
	// 	}
	// )
	// 	.then(async (res) => {
	//     if (res.status !== 200) {
	//       const json = await res.json();
	//       throw new Error(json.message);
	//     }
	//     return res.json();
	//   });
	return {
		message: "success",
		orders: [
			{
				id: "13asdasdassdfvzxcdasasddfvvdvdfvdfvd",
				sender: {
					name: "Someone",
					address: {
						id: "1",
						name: "12th Beatle Juice",
						lat: null,
						long: null,
						province: "",
						district: "",
						ward: "",
					},
					phone: "",
				},
				receiver: {
					name: "",
					address: {
						id: "",
						name: "",
						lat: null,
						long: null,
						province: "",
						district: "",
						ward: "",
					},
					phone: "",
				},
				packageInfo: {
					type: "parcel" as "parcel" | "document",
					items: [],
					properties: [],
				},
				extraData: {
					cod: 0,
					payer: "sender" as "sender" | "receiver",
					note: "",
				},
				createdAt: date,
				status: "PENDING",
				from: "Hanoi",
				deliveryTime: date,
			},
		] as Array<OrderProps & { from: string; deliveryTime: string }>,
	};
}

// TODO: Change fetch's API
export async function getOutgoingOrders() {
	// return await fetch(
	// 	`${process.env.NEXT_PUBLIC_API_ENDPOINT}/get/outgoing`,
	// 	{
	// 		credentials: "include",
	// 	}
	// )
	// 	.then(async (res) => {
	//     if (res.status !== 200) {
	//       const json = await res.json();
	//       throw new Error(json.message);
	//     }
	//     return res.json();
	//   });
	return {
		message: "success",
		orders: [
			{
				id: "13asdasdassdfvzxcdasasddfvvdvdfvdfvd",
				sender: {
					name: "Someone",
					address: {
						id: "1",
						name: "12th Beatle Juice",
						lat: null,
						long: null,
						province: "",
						district: "",
						ward: "",
					},
					phone: "",
				},
				receiver: {
					name: "",
					address: {
						id: "",
						name: "",
						lat: null,
						long: null,
						province: "",
						district: "",
						ward: "",
					},
					phone: "",
				},
				packageInfo: {
					type: "parcel" as "parcel" | "document",
					items: [],
					properties: [],
				},
				extraData: {
					cod: 0,
					payer: "sender" as "sender" | "receiver",
					note: "",
				},
				createdAt: date,
				status: "PENDING",
				to: "Hanoi",
				arrivedAt: date,
			},
		] as Array<OrderProps & { to: string; arrivedAt: string }>,
	};
}

export async function confirmOrders(
	selectedOrders: Array<string>,
	mode: "incoming" | "outgoing"
) {
	try {
		const json = await fetch(
			`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${mode}/confirm`,
			{
				credentials: "include",
				method: "PUT",
				body: JSON.stringify({
					orders: selectedOrders,
				}),
			}
		).then((response) => response.json());
		return json;
	} catch (err) {
		throw err;
	}
}

export async function rejectOrders(
	selectedOrders: Array<string>,
	reason: string,
	mode: "incoming" | "outgoing"
) {
	try {
		const json = await fetch(
			`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${mode}/reject`,
			{
				credentials: "include",
				method: "PUT",
				body: JSON.stringify({
					orders: selectedOrders,
					reason: reason,
				}),
			}
		).then((response) => response.json());
		return json;
	} catch (err) {
		throw err;
	}
}
