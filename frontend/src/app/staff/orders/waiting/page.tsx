import Title from "@/components/Title/Title";
import OrdersSummaryTable from "../../components/Order/OrderSummaryTable/OrdersSummaryTable";
import { confirmWaitingOrders, filterWaitingOrder } from "../../utils/orders";

export default function Page() {
	return (
		<div>
			<Title>Waiting For Receiver</Title>
			<OrdersSummaryTable
				filterOrders={filterWaitingOrder}
				action={confirmWaitingOrders}
			/>
		</div>
	);
}
