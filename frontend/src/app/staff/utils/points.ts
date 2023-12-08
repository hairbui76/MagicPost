import { Dispatch, SetStateAction, useState } from "react";

export type PointProps = {
	id?: string;
	type: string;
	pointName: string;
	address: string;
	email: string;
	phone: string;
	lat: number;
	long: number;
};

export const emptyPoint: PointProps = {
	id: "",
	type: "",
	pointName: "",
	address: "",
	email: "",
	phone: "",
	lat: 0,
	long: 0,
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
		value: string;
		handleChange: Dispatch<SetStateAction<string>>;
	};
	email: {
		value: string;
		handleChange: Dispatch<SetStateAction<string>>;
	};
	phone: {
		value: string;
		handleChange: Dispatch<SetStateAction<string>>;
	};
	lat: {
		value: number;
		handleChange: Dispatch<SetStateAction<number>>;
	};
	long: {
		value: number;
		handleChange: Dispatch<SetStateAction<number>>;
	};
};

export function usePointState(point: PointProps): PointStateProps {
	const [type, setType] = useState(point.type);
	const [pointName, setPointName] = useState(point.pointName);
	const [address, setAddress] = useState(point.address);
	const [phone, setPhone] = useState(point.phone);
	const [email, setEmail] = useState(point.email);
	const [lat, setLat] = useState(point.lat);
	const [long, setLong] = useState(point.long);

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
		lat: {
			value: lat,
			handleChange: setLat,
		},
		long: {
			value: long,
			handleChange: setLong,
		},
	};
}
