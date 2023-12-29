"use client";

import { useQuery } from "@tanstack/react-query";
import { QRCode, Skeleton } from "antd";
import { format } from "date-fns";
import Image from "next/image";
import { toast } from "react-toastify";
import "./style.css";

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
		const order = data.data;

		return (
			order && (
				<div className="flex flex-col border-cl">
					<div className="flex items-center border-cl p-8">
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
							</div>
						</div>
						<div className="flex flex-col border-cl">
							<div className="flex flex-col border-cl p-2">
								<b>Địa chỉ</b>
								<i>Tỉnh/TP</i>
								<i>Quận/Huyện</i>
								<i>Phường/Xã</i>
							</div>
							<div className="flex">
								<div className="flex flex-col border-cl p-2">
									<b>Dịch vụ cộng thêm</b>
								</div>
								<div className="flex flex-col border-cl flex-1 p-2">
									<b>Cước phí</b>
									<b>Trọng lượng</b>
									<b>Kích thước</b>
									<b>Tổng cước</b>
									<b>Thanh toán cước</b>
									<b>Số tiền phải thu</b>
								</div>
							</div>
							<div className="flex">
								<div className="border-cl">
									<QRCode value={orderId} />
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
								div{" "}
							</div>
						</div>
					</div>
				</div>
			)
		);
	}
	return "Not found";
}
