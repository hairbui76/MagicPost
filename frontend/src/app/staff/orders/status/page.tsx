import Title from "@/components/Title/Title";
import OrdersSummaryTable from "../../components/Order/OrderSummaryTable/OrdersSummaryTable";
import { filterOrders } from "../../utils/orders";

function Page() {
	return (
		<div>
			<Title>Order Status</Title>
			<OrdersSummaryTable filterOrders={filterOrders} />
		</div>
	);
}

export default Page;
