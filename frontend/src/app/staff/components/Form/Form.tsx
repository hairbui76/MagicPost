export default function Form({
	children,
	action,
}: {
	children: React.ReactNode;
	action: (formData: FormData) => void;
}) {
	return (
		<form className="w-full flex flex-col gap-4" action={action}>
			{children}
		</form>
	);
}
