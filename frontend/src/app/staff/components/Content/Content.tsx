export default function Content({
	children,
}: {
	children: Array<React.ReactNode>;
}) {
	return (
		<div className="bg-[#FAFAFA] text-[#363635] flex flex-row overflow-auto p-4 text-justify">
			{children}
		</div>
	);
}
