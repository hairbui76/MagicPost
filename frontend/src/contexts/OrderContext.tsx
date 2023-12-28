"use client";

import { OrderProps } from "@/app/staff/types/Order/orders";
import { Dispatch, SetStateAction, createContext, useState } from "react";

export type OrderContextProps = {
	orders: OrderProps[];
	setOrders: Dispatch<SetStateAction<OrderProps[]>>;
	order: OrderProps | null;
	setOrder: Dispatch<SetStateAction<OrderProps | null>>;
};

const OrderContext = createContext<OrderContextProps | null>(null);

const OrderContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [orders, setOrders] = useState<OrderProps[]>([]);
	const [order, setOrder] = useState<OrderProps | null>(null);
	return (
		<OrderContext.Provider value={{ orders, setOrders, order, setOrder }}>
			{children}
		</OrderContext.Provider>
	);
};

export default OrderContext;

export { OrderContextProvider };
