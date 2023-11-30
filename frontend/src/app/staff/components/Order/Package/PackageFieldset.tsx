import Fieldset from "../../Form/Fieldset";
import { faBox } from "@fortawesome/free-solid-svg-icons";
import PackageTypeField from "./PackageTypeField";
import PackageItemsField from "./PackageItemsField";
import PackagePropertiesField from "./PackagePropertiesField";
import { PackageProps } from "@/app/staff/types/Order/package";

export default function PackageFieldset({
	type,
	items,
	properties,
}: PackageProps) {
	return (
		<Fieldset legend="Package" icon={faBox}>
			<PackageTypeField {...type} />
			<hr className="border" />
			<PackageItemsField {...items} />
			<hr className="border" />
			<PackagePropertiesField {...properties} />
		</Fieldset>
	);
}
