import Checkbox from "../../Form/Checkbox";
import {
	PackagePropertiesProps,
	PACKAGE_PROPERTIES,
} from "@/app/staff/types/orders";

export default function PackagePropertiesField({
	value,
	handleChange,
}: PackagePropertiesProps) {
	return (
		<div>
			<div className="font-medium mb-4">Package Properties</div>
			<div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2">
				{PACKAGE_PROPERTIES.map((property) => (
					<Checkbox
						key={property}
						label={property}
						value={property}
						handleChange={() => {
							if (value.includes(property)) {
								handleChange(value.filter((prop) => prop !== property));
							} else {
								handleChange([...value, property]);
							}
						}}
						checked={value.includes(property)}
						name="package-property"
					/>
				))}
			</div>
		</div>
	);
}
