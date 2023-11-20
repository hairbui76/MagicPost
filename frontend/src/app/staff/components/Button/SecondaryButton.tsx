export default function SecondaryButton({
	children,
	type = "button",
}: {
	children: React.ReactNode | Array<React.ReactNode>;
	type: "button" | "submit" | "reset";
}) {
	return (
		<button
			type={type}
			className="btn btn-outline text-base-100 sm:btn-sm md:btn-md w-20 hover:border-base-100 hover:bg-base-100 hover:text-slate-300"
		>
			{children}
		</button>
	);
}
