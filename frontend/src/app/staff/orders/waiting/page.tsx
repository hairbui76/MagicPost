import Title from "@/components/Title/Title";
import WaitingOrderTable from "./components/WaitingOrdersTable";

export default function Page() {
	return (
		<div>
			<Title>Waiting For Receiver</Title>
			<WaitingOrderTable />
		</div>
	);
}
