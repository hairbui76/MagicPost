import { Address } from "../../utils/orders";
import { ItemProps, PackageProperties } from "./package";

export type CustomerProps = {
	name: string;
	address: Address;
	phone: string;
};

export type OrderProps = {
	status?: string;
	createdAt?: string | null;
	id?: string;
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
