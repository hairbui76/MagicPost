export default function Content({
	children,
}: {
	children: Array<React.ReactNode>;
}) {
	return (
		<div className="bg-[#FCFCFC] text-[#363635] w-full overflow-auto p-4 text-justify md:px-12">
			{children}
		</div>
	);
}
