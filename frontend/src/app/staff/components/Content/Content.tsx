export default function Content({
	children,
}: {
	children: Array<React.ReactNode>;
}) {
	return (
		<div className="bg-[#F4F4ED] text-[#363635] flex flex-row flex-grow overflow-auto p-4 text-justify">
			{children}
		</div>
	);
}
