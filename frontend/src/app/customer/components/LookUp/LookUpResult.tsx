import { useEffect, useState } from "react";
import { getOrderById, LookUpResultProps } from "../../utils/lookup";
import Timeline from "../Timeline/Timeline";
import Table from "@/app/staff/components/Table/Table";
import TableRow from "@/app/staff/components/Table/TableRow";

export default function LookupResult({ orderId }: { orderId: string }) {
	const [order, setOrder] = useState<LookUpResultProps | null>(null);
	const [error, setError] = useState<any>(null);
	useEffect(() => {
		(async () => {
			try {
				const order = await getOrderById(orderId).then((json) => {
					console.log(json);
					return json.order;
				});
				setOrder(order);
				setError(null);
			} catch (error) {
				setOrder(null);
				setError(error);
			}
		})();
	}, [orderId, setOrder]);
	if (!order && !error)
		return (
			<div className="text-custom-white flex items-center">
				<span className="loading loading-spinner mr-2"></span>Loading...
			</div>
		);

	if (error) return <div>{error}</div>;

	if (order)
		return (
			<div className="flex flex-col gap-4 bg-base-300 p-6  rounded-md w-full items-center">
				<h3 className="text-custom-white font-bold">Order {order.id}</h3>
				<div className="text-custom-white w-fit grid grid-cols-2 gap-x-12">
					<div className="flex flex-row justify-between gap-2">
						<span className="text-primary">From:</span>{" "}
						<span>{order.sender.address.name}</span>
					</div>
					<div className="flex flex-row justify-between gap-2">
						<span className="text-primary">To:</span>{" "}
						<span>{order.receiver.address.name}</span>
					</div>
					<div className="flex flex-row justify-between gap-2">
						<span className="text-primary">Weight:</span>{" "}
						<span>
							{order.packageInfo.items.reduce(
								(total, item) => item.weight + total,
								0
							)}{" "}
							(g)
						</span>
					</div>
					<div className="flex flex-row justify-between gap-2">
						<span className="text-primary">Package Type:</span>{" "}
						<span>{order.packageInfo.type}</span>
					</div>
					<div className="flex flex-row justify-between gap-2">
						<span className="text-primary">Properties:</span>
						<span>{order.packageInfo.properties.join(", ")}</span>
					</div>
				</div>
				<div>
					<Timeline timeline={order.timeline} />
				</div>
			</div>
		);

	return null;
}
