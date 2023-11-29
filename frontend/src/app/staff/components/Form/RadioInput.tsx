export default function RadioInput({
	label,
	name,
	value,
	checked = false,
	onChange,
}: {
	label: string;
	value: string;
	name: string;
	checked?: boolean;
	onChange: () => void;
}) {
	return (
		<label>
			<input
				type="radio"
				value={value}
				name={name}
				checked={checked}
				onChange={onChange}
				className="mr-3 "
			/>
			<span className="text-sm">{label}</span>
		</label>
	);
}
