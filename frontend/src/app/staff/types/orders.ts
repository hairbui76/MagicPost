import { Dispatch, SetStateAction } from "react";

export type CustomerProps = {
	name: string;
	address: string;
	phone: string;
};

export type PackageOrderProps = {
	sender: CustomerProps;
	receiver: CustomerProps;
	packageInfo: {
		type: "parcel" | "document";
		items: Array<ItemProps>;
		properties: Array<PackageProperties>;
	};
};

export type PackageProps = {
	type: PackageTypeProps;
	items: PackageItemsProps;
	properties: PackagePropertiesProps;
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

export type PackageProperties = (typeof PACKAGE_PROPERTIES)[number];

export type PackagePropertiesProps = {
	value: Array<PackageProperties>;
	handleChange: Dispatch<SetStateAction<Array<PackageProperties>>>;
};

export type PackageTypeProps = {
	value: "parcel" | "document";
	handleChange: Dispatch<SetStateAction<"parcel" | "document">>;
};
