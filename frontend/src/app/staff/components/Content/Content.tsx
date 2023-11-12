export default function Content({
	children,
}: {
	children: Array<React.ReactNode>;
}) {
	return (
		<div className="bg-[#FAFAFA] text-[#363635] md:col-end-[-1] md:col-start-2 flex flex-row items-center justify-center overflow-auto">
			{children}
		</div>
	);
}
