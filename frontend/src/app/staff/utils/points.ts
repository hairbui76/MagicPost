import { Dispatch, SetStateAction, useState } from "react";
import { Address } from "./orders";

export type PointProps = {
	id?: string;
	type: string;
	pointName: string;
	address: Address;
	email: string;
	phone: string;
};

export const emptyPoint: PointProps = {
	id: "",
	type: "",
	pointName: "",
	address: {
		id: "",
		name: "",
		lat: null,
		long: null,
		province: "",
		district: "",
		ward: "",
	},
	email: "",
	phone: "",
};

export type PointStateProps = {
	id?: string;
	type: {
		value: string;
		handleChange: Dispatch<SetStateAction<string>>;
	};
	pointName: {
		value: string;
		handleChange: Dispatch<SetStateAction<string>>;
	};
	address: {
		value: Address;
		handleChange: Dispatch<SetStateAction<Address>>;
	};
	email: {
		value: string;
		handleChange: Dispatch<SetStateAction<string>>;
	};
	phone: {
		value: string;
		handleChange: Dispatch<SetStateAction<string>>;
	};
	resetPoint: () => void;
};

export function usePointState(point: PointProps): PointStateProps {
	const [type, setType] = useState(point.type);
	const [pointName, setPointName] = useState(point.pointName);
	const [address, setAddress] = useState(point.address);
	const [phone, setPhone] = useState(point.phone);
	const [email, setEmail] = useState(point.email);

	function resetPoint() {
		setType(emptyPoint.type);
		setPointName(emptyPoint.pointName);
		setAddress(emptyPoint.address);
		setPhone(emptyPoint.phone);
		setEmail(emptyPoint.email);
	}

	return {
		id: point.id,
		type: {
			value: type,
			handleChange: setType,
		},
		pointName: {
			value: pointName,
			handleChange: setPointName,
		},
		address: {
			value: address,
			handleChange: setAddress,
		},
		phone: {
			value: phone,
			handleChange: setPhone,
		},
		email: {
			value: email,
			handleChange: setEmail,
		},
		resetPoint,
	};
}
