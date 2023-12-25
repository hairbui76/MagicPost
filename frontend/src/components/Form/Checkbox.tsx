export default function Checkbox({
	name,
	label,
	value,
	checked,
	handleChange,
	className = "",
}: {
	name: string;
	label: string;
	value: string;
	checked: boolean;
	handleChange: (value: string) => void;
	className?: string;
}) {
	return (
		<label className={`flex flex-row gap-2 items-center ${className}`}>
			<div className="border-2 w-fit h-fit rounded-md">
				<input
					type="checkbox"
					{...{ name, value, checked }}
					onChange={(e) => handleChange(e.currentTarget.value)}
					className="checkbox checkbox-xs block"
				/>
			</div>
			<span>{label}</span>
		</label>
	);
}
