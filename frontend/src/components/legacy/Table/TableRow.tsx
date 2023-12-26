export default function TableRow({
	children,
}: {
	children: Array<React.ReactNode>;
}) {
	return <tr className="border-custom-grey">{children}</tr>;
}
