"use client";

import { OrderProps } from "@/app/staff/types/Order/orders";
import {
	PACKAGE_PROPERTIES,
	PACKAGE_PROPERTIES_VI,
} from "@/app/staff/types/Order/package";
import { useQuery } from "@tanstack/react-query";
import { QRCode, Skeleton } from "antd";
import { format } from "date-fns";
import Image from "next/image";
import { toast } from "react-toastify";
import "./style.css";

function calculateDistance(x1: number, y1: number, x2: number, y2: number) {
	return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

async function fetchOrder(orderId: string) {
	return await fetch(
		`${process.env.NEXT_PUBLIC_ORDER_ENDPOINT}/get/${orderId}`,
		{ credentials: "include" }
	).then(async (response) => {
		if (response.status !== 200) {
			const message = await Promise.resolve(response.json()).then(
				(json) => json.message
			);
			throw new Error(message);
		}
		return response.json();
	});
}

export default function Page({ params }: { params: { orderId: string } }) {
	const { orderId } = params;
	const { isPending, error, data } = useQuery({
		queryKey: ["order-by-id", orderId],
		queryFn: () => fetchOrder(orderId),
	});

	if (isPending) return <Skeleton active />;

	if (error) toast.error(error.message);

	if (data) {
		const order: OrderProps = data.data;

		return (
			order && (
				<div className="flex flex-col border-cl">
					<div className="flex items-center border-cl p-8">
						<QRCode value={orderId} />
						<div className="flex-1">
							<h1 className="text-center">
								<b>PHIẾU GỬI</b>
							</h1>
							<h2 className="text-center">
								<b>BILL OF CONSIGNMENT</b>
							</h2>
						</div>
						<div className="">
							<Image
								src="/logo_magicpost_horizon.png"
								width="0"
								height="0"
								className="w-64 object-contain"
								alt="MagicPost logo"
							/>
						</div>
					</div>
					<div className="flex border-cl">
						<div className="flex flex-col border-cl flex-1">
							<div className="flex flex-col border-cl p-2">
								<div className="flex">
									<b>Người gửi</b>
									<p className="flex-1 text-right">{order.sender.name}</p>
								</div>
								<div className="flex">
									<b>Địa chỉ</b>
									<p className="flex-1 text-right">
										{order.sender.address.name}
									</p>
								</div>
								<div className="flex">
									<b>Điện thoại</b>
									<p className="flex-1 text-right">{order.sender.phone}</p>
								</div>
							</div>
							<div className="flex flex-col border-cl p-2">
								<div className="flex">
									<b>Người nhận</b>
									<p className="flex-1 text-right">{order.receiver.name}</p>
								</div>
								<div className="flex">
									<b>Địa chỉ</b>
									<p className="flex-1 text-right">
										{order.receiver.address.name}
									</p>
								</div>
								<div className="flex">
									<b>Điện thoại</b>
									<p className="flex-1 text-right">{order.receiver.phone}</p>
								</div>
							</div>
							<div className="flex flex-col border-cl flex-1 p-2">
								<b>Nội dung hàng hóa</b>
								<table className="border-2 border-black">
									<tr className="border-2 border-black">
										<th className="border-2 border-black">Tên</th>
										<th className="border-2 border-black">Số lượng</th>
										<th className="border-2 border-black">Cân nặng</th>
										<th className="border-2 border-black">Giá trị</th>
									</tr>
									{order.packageInfo.items.map((item) => (
										<tr key={item.id} className="border-2 border-black">
											<td className="border-2 border-black">{item.name}</td>
											<td className="border-2 border-black">{item.quantity}</td>
											<td className="border-2 border-black">{item.weight}</td>
											<td className="border-2 border-black">{item.value}</td>
										</tr>
									))}
								</table>
							</div>
						</div>
						<div className="flex flex-col border-cl">
							<div className="flex flex-col border-cl p-2">
								<div className="flex">
									<b>Địa chỉ</b>
									<p className="flex-1 text-right">
										{order.receiver.address.name}
									</p>
								</div>
								<div className="flex">
									<i>Tỉnh/TP</i>
									<p className="flex-1 text-right">
										{order.receiver.address.province}
									</p>
								</div>
								<div className="flex">
									<i>Quận/Huyện</i>
									<p className="flex-1 text-right">
										{order.receiver.address.district}
									</p>
								</div>
								<div className="flex">
									<i>Phường/Xã</i>
									<p className="flex-1 text-right">
										{order.receiver.address.ward}
									</p>
								</div>
							</div>
							<div className="flex">
								<div className="flex flex-col border-cl p-2">
									<b>Loại hàng hóa</b>
									<p className="flex-1 text-right">
										{order.packageInfo.properties
											.map(
												(item) =>
													PACKAGE_PROPERTIES_VI[
														PACKAGE_PROPERTIES.indexOf(item)
													]
											)
											.join(" - ")}
									</p>
								</div>
								<div className="flex flex-col border-cl flex-1 p-2">
									<div className="flex">
										<b>Cước phí</b>
										<p className="flex-1 text-right">
											{Math.round(
												calculateDistance(
													order.sender.address.lat!,
													order.sender.address.long!,
													order.receiver.address.lat!,
													order.receiver.address.long!
												) * 100000
											)}{" "}
											VND
										</p>
									</div>
									<div className="flex">
										<b>Trọng lượng</b>
										<p className="flex-1 text-right">
											{order.packageInfo.items.reduce(
												(prev, item) => prev + item.weight,
												0
											)}{" "}
											g
										</p>
									</div>
									<div className="flex">
										<b>Tổng cước thu</b>
										<p className="flex-1 text-right">
											{order.packageInfo.items.reduce(
												(prev, item) => prev + item.value,
												0
											)}{" "}
											VND
										</p>
									</div>
									<div className="flex">
										<b>Số tiền phải thu</b>
										<p className="flex-1 text-right">
											{Math.round(
												calculateDistance(
													order.sender.address.lat!,
													order.sender.address.long!,
													order.receiver.address.lat!,
													order.receiver.address.long!
												) * 100000
											) +
												order.packageInfo.items.reduce(
													(prev, item) => prev + item.value,
													0
												)}{" "}
											VND
										</p>
									</div>
								</div>
							</div>
							<div className="flex flex-col border-cl p-2">
								<div className="flex">
									<b>Ngày, giờ gửi</b>
									<p className="flex-1 text-right">
										{format(new Date(order.createdAt!), "hh:mm dd/MM/yyyy")}
									</p>
								</div>
								<div className="flex">
									<b>Họ tên, chữ ký người gửi</b>
									<p className="flex-1 text-right"></p>
								</div>
							</div>
							<div className="flex flex-col border-cl p-2">
								<b>Ngày, giờ nhận</b>
								<b>Họ tên, chữ ký người nhận</b>
							</div>
						</div>
					</div>
				</div>
			)
		);
	}
	return "Not found";
}
