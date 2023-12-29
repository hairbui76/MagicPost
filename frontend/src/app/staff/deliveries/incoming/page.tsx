import Title from "@/components/Title/Title";
import OrdersSummaryTable from "../../components/Order/OrderSummaryTable/OrdersSummaryTable";
import {
	confirmIncomingOrders,
	filterIncomingOrders,
} from "../../utils/orders";

export default function Page() {
	return (
		<div>
			<Title>Incoming Orders</Title>
			<OrdersSummaryTable
				filterOrders={filterIncomingOrders}
				action={confirmIncomingOrders}
			/>
		</div>
	);
}
