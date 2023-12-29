import Title from "@/components/Title/Title";
import OrdersSummaryTable from "../../components/Order/OrderSummaryTable/OrdersSummaryTable";
import {
	confirmOutGoingOrders,
	filterOutGoingOrders,
} from "../../utils/orders";

export default function Page() {
	return (
		<div>
			<Title>Outgoing Orders</Title>
			<OrdersSummaryTable
				filterOrders={filterOutGoingOrders}
				action={confirmOutGoingOrders}
			/>
		</div>
	);
}
