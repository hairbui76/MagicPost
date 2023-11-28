import RadioInput from "../../Form/RadioInput";
import { PackageTypeProps } from "./PackageFieldset";

export default function PackageType({ value, handleChange }: PackageTypeProps) {
	const types = [
		{ label: "Parcel", value: "parcel" },
		{ label: "Document", value: "document" },
	];
	return (
		<div>
			<div className="text-lg font-medium mb-4">Package Type</div>
			<div className="flex flex-row gap-44">
				{types.map((type) => (
					<RadioInput
						key={type.value}
						label={type.label}
						value={type.value}
						name="package-type"
						checked={value === type.value}
						onChange={() => {
							if (value !== type.value)
								handleChange(type.value as "parcel" | "document");
						}}
					/>
				))}
			</div>
		</div>
	);
}
