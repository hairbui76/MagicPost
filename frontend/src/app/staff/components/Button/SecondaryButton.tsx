export default function SecondaryButton({
	children,
	type = "button",
	handleClick = () => {},
}: {
	children: React.ReactNode | Array<React.ReactNode>;
	type: "button" | "submit" | "reset";
	handleClick?: () => void;
}) {
	return (
		<button
			type={type}
			className="btn btn-outline text-base-100 sm:btn-sm md:btn-md hover:border-base-100 hover:bg-base-100 hover:text-slate-300"
			onClick={() => handleClick()}
		>
			{children}
		</button>
	);
}
