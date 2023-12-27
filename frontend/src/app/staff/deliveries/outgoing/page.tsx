"use client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Title from "../../../../components/Title/Title";
import { OrderProps } from "../../types/Order/orders";
import { getOutgoingOrders } from "../../utils/deliveries";
import OutgoingOrderTable from "./components/OutgoingOrderTable";

export default function Page() {
	return (
		<div>
			<Title>Outgoing Orders</Title>
			<OutgoingOrderTable />
		</div>
	);
}
