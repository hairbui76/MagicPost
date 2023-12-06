"use client";

export default function Form({
	children,
	handleSubmit,
}: {
	children: React.ReactNode | Array<React.ReactNode>;
	handleSubmit: () => void;
}) {
	return (
		<form
			className="w-full flex flex-col gap-4"
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit();
			}}
		>
			{children}
		</form>
	);
}
