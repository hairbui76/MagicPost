import Fieldset from "../../Form/Fieldset";
import { faBox } from "@fortawesome/free-solid-svg-icons";
import PackageTypeField, { PackageTypeProps } from "./PackageTypeField";
import PackageItemsField, { PackageItemsProps } from "./PackageItemsField";

export type PackageProps = {
	type: PackageTypeProps;
	items: PackageItemsProps;
};

export default function PackageFieldset({ type, items }: PackageProps) {
	return (
		<Fieldset legend="Package" icon={faBox}>
			<PackageTypeField {...type} />
			<hr className="border" />
			<PackageItemsField {...items} />
			<hr className="border" />
		</Fieldset>
	);
}
