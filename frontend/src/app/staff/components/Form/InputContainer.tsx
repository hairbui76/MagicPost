export default function InputContainer({
	label,
	children,
	required,
	className = "",
	flexDirection = "col",
}: {
	label: string;
	children: Array<React.ReactNode> | React.ReactNode;
	required: boolean;
	className?: string;
	flexDirection?: "col" | "row";
}) {
	return (
		<label
			className={`text-left flex flex-1 gap-1 flex-${flexDirection} ${className}`}
		>
			<span className="font-medium text-sm">
				{label}
				{required ? <span className="text-custom-red ml-1">*</span> : null}
			</span>
			{children}
		</label>
	);
}
