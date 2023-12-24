import Link from "next/link";

export default function OrderLink({ id }: { id: string }) {
	return (
		<Link
			className="mx-auto block w-fit link text-[#007FFF]"
			href={`/staff/orders/status/${id}`}
		>
			{id}
		</Link>
	);
}
