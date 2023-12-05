export default function RadioInput({
	label,
	name,
	value,
	checked = false,
	handleChange,
}: {
	label: string;
	value: string;
	name: string;
	checked?: boolean;
	handleChange: (value: string) => void;
}) {
	return (
		<label className="flex items-center">
			<input
				type="radio"
				value={value}
				name={name}
				checked={checked}
				onChange={(e) => handleChange(e.currentTarget.value)}
				className="radio radio-xs mr-3 border-gray-500"
			/>
			<span className="text-sm">{label}</span>
		</label>
	);
}
