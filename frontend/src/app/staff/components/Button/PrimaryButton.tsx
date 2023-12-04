export default function PrimaryButton({
	children,
	type = "button",
	onClick = () => {},
	className = "",
}: {
	children: React.ReactNode | Array<React.ReactNode>;
	type: "button" | "submit" | "reset";
	onClick?: () => void;
	className?: string;
}) {
	return (
		<button
			type={type}
			className={`btn btn-active bg-base-100 text-[#FCFCFC] sm:btn-sm md:btn-md ${className}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
