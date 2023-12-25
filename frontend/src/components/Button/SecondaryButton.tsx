export default function SecondaryButton({
	children,
	type = "button",
	handleClick = () => {},
	className = "",
	disabled = false,
}: {
	children: React.ReactNode | Array<React.ReactNode>;
	type: "button" | "submit" | "reset";
	handleClick?: () => void;
	className?: string;
	disabled?: boolean;
}) {
	return (
		<button
			type={type}
			className={`btn btn-outline text-base-100 btn-sm hover:border-base-100 hover:bg-base-100 hover:text-slate-300 ${className}`}
			onClick={() => handleClick()}
			disabled={disabled}
		>
			{children}
		</button>
	);
}
