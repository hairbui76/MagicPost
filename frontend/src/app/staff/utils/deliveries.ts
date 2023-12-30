export type DeliveryHistoryProps = {
	orderId: string;
	type: "incoming" | "outgoing";
	destination: {
		address: string;
		pointName: string;
		type: string;
	};
	status: "confirmed" | "rejected" | "pending";
	reason: string;
	time: string;
	deliveryId: string | undefined;
	toUser: boolean;
};

export async function getDeliveryHistory() {
	return await fetch(
		`${process.env.NEXT_PUBLIC_API_ENDPOINT}/deliveries/history`,
		{
			credentials: "include",
		}
	).then(async (response) => {
		if (response.status !== 200) {
			const json = await response.json();
			throw new Error(json.message);
		}
		return response.json();
	});
}
