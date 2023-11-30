export default function Checkbox({
	name,
	label,
	value,
	checked,
	handleChange,
}: {
	name: string;
	label: string;
	value: string;
	checked: boolean;
	handleChange: (value: string) => void;
}) {
	return (
		<label>
			<input
				type="checkbox"
				{...{ name, value, checked }}
				onChange={(e) => handleChange(e.currentTarget.value)}
			/>
			<span>{label}</span>
		</label>
	);
}
