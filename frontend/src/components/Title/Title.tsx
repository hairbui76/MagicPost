export default function Title({
	children,
}: {
	children: Array<React.ReactNode> | React.ReactNode;
}) {
	return (
		<div className="text-2xl font-medium mb-4 text-left overflow-ellipsis whitespace-nowrap overflow-hidden">
			{children}
		</div>
	);
}
