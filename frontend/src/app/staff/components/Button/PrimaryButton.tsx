export default function PrimaryButton({
	children,
	type = "button",
}: {
	children: React.ReactNode | Array<React.ReactNode>;
	type: "button" | "submit" | "reset";
}) {
	return (
		<button
			type={type}
			className="btn btn-active bg-base-100 text-[#FCFCFC] sm:btn-sm md:btn-md w-20"
		>
			{children}
		</button>
	);
}
