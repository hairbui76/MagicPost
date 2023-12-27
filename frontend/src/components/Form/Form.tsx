export default function Form({
	children,
	handleSubmit,
	className = "",
}: {
	children: React.ReactNode | Array<React.ReactNode>;
	handleSubmit: () => void;
	className?: string;
}) {
	return (
		<form
			className={`${className}`}
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit();
			}}
		>
			{children}
		</form>
	);
}
