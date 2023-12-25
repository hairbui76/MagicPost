export default function PrimaryButton({
	children,
	type = "button",
	handleClick = () => {},
	className = "",
	disabled = false,
}: {
	children: React.ReactNode | Array<React.ReactNode>;
	type?: "button" | "submit" | "reset";
	handleClick?: () => void;
	className?: string;
	disabled?: boolean;
}) {
	return (
		<button
			type={type}
			className={`btn btn-active bg-base-100 text-[#FCFCFC] btn-sm ${className}`}
			onClick={handleClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
}
