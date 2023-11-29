import { Dispatch } from "react";
import PrimaryButton from "../../Button/PrimaryButton";
import PackageItem, { ItemProps } from "./PackageItem";

export type PackageItemsProps = {
	value: Array<ItemProps>;
	handleChange: Dispatch<{
		type: "item_changed" | "item_added" | "item_removed";
		item?: ItemProps;
	}>;
};

export default function PackageItemsField({
	value,
	handleChange,
}: PackageItemsProps) {
	return (
		<div>
			<div className="font-medium text-md mb-4">Items</div>
			{value.map((item, index) => (
				<PackageItem key={item.id} {...{ ...item, index, handleChange }} />
			))}
			<PrimaryButton
				type="button"
				onClick={() => handleChange({ type: "item_added" })}
				className="mx-auto block"
			>
				Add an item
			</PrimaryButton>
		</div>
	);
}
