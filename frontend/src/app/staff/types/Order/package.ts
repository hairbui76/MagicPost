import { Dispatch, SetStateAction } from "react";

export type PackageProps = {
	type: PackageTypeProps;
	items: PackageItemsProps;
	properties: PackagePropertiesProps;
	disabled?: boolean;
};

export type ItemProps = {
	id: string;
	name: string;
	quantity: number;
	weight: number;
	value: number;
};

export type PackageItemsProps = {
	value: Array<ItemProps>;
	handleChange: Dispatch<{
		type: "item_changed" | "item_added" | "item_removed";
		item?: ItemProps;
	}>;
	disabled?: boolean;
};

export const PACKAGE_PROPERTIES = [
	"High value",
	"Fragile",
	"Bulk",
	"Out of Gauge",
	"Liquid",
	"Magnetic",
	"Thermal Sensitive",
] as const;

export const PACKAGE_PROPERTIES_VI = [
	"Giá trị cao",
	"Dễ vỡ",
	"Tải trọng lớn",
	"Hàng quá khổ",
	"Chất lỏng",
	"Chứa từ tính",
	"Nhạy cảm với nhiệt",
] as const;

export type PackageProperties = (typeof PACKAGE_PROPERTIES)[number];

export type PackagePropertiesProps = {
	value: Array<PackageProperties>;
	handleChange: Dispatch<SetStateAction<Array<PackageProperties>>>;
};

export type PackageTypeProps = {
	value: "parcel" | "document";
	handleChange: Dispatch<SetStateAction<"parcel" | "document">>;
};
