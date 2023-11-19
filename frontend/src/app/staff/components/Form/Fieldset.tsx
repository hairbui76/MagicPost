export default function Fieldset({
	legend,
	className = "",
	children,
}: {
	legend: string;
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<fieldset className={`flex flex-row justify-between min-w-0 ${className}`}>
			<legend className="font-medium text-xl">{legend}</legend>
			{children}
		</fieldset>
	);
}
