import { Dispatch, SetStateAction } from "react";
import { ItemProps, PackageProperties } from "./package";

export type CustomerProps = {
	name: string;
	address: string;
	phone: string;
};

export type OrderProps = {
	sender: CustomerProps;
	receiver: CustomerProps;
	packageInfo: {
		type: "parcel" | "document";
		items: Array<ItemProps>;
		properties: Array<PackageProperties>;
	};
	extraData: {
		cod: number;
		payer: "sender" | "receiver";
		note: string;
	};
};
