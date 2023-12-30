import TableRow from "@/app/staff/components/Table/TableRow";
import { DeliveryHistoryProps } from "@/app/staff/utils/deliveries";
import { formatDate } from "@/utils/helper";
import {
	faCheck,
	faEye,
	faHourglassHalf,
	faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const destionationTypes: { [key: string]: string } = {
	GATHERING_POINT: "Gathering Point",
	TRANSACTION_POINT: "Transaction Point",
};

export default function HistoryItem({
	orderId,
	type,
	destination,
	time,
	status,
	reason,
	toUser,
}: DeliveryHistoryProps) {
	return (
		<TableRow>
			<td>
				<Link
					className="mx-auto block w-fit link text-black"
					href={`/staff/orders/status/${orderId}`}
				>
					<FontAwesomeIcon icon={faEye} />
				</Link>
			</td>
			<td>{type}</td>
			<td>{destination.pointName}</td>
			<td>{destination.address}</td>
			<td>{toUser ? "To User" : destionationTypes[destination.type]}</td>
			<td>{formatDate(time)}</td>
			<td>
				<StatusBadge status={status} />
			</td>
		</TableRow>
	);
}

function getStatusBadgeClassAndIcon(
	status: "confirmed" | "rejected" | "pending"
) {
	if (status === "confirmed")
		return {
			badgeClass: "badge-success",
			icon: faCheck,
		};
	if (status === "rejected")
		return {
			badgeClass: "badge-error",
			icon: faXmark,
		};
	return {
		badgeClass: "badge-info",
		icon: faHourglassHalf,
	};
}

function StatusBadge({
	status,
}: {
	status: "confirmed" | "rejected" | "pending";
}) {
	const { badgeClass, icon } = getStatusBadgeClassAndIcon(status);
	return (
		<div className={`badge ${badgeClass} flex flex-row gap-1`}>
			<FontAwesomeIcon icon={icon} />
			<div>{status}</div>
		</div>
	);
}
