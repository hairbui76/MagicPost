import { Dispatch, SetStateAction, useState } from "react";
import { Address } from "./orders";

export type StaffProps = {
	id?: string;
	role: string;
	name: string;
	username: string;
	email: string;
	phoneNumber: string;
	pointId: string;
	createdAt?: string;
};

export interface CreateStaffProps extends StaffProps {
	address: Address;
}

export const emptyStaff: StaffProps = {
	id: "",
	role: "",
	name: "",
	username: "",
	email: "",
	phoneNumber: "",
	pointId: "",
	createdAt: "",
};

export const emptyCreateStaff: CreateStaffProps = {
	role: "",
	name: "",
	username: "",
	email: "",
	phoneNumber: "",
	pointId: "",
	address: {
		province: "",
		district: "",
		ward: "",
	},
};

export type StaffStateProps = {
	id?: string;
	role: {
		value: string;
		handleChange: Dispatch<SetStateAction<string>>;
	};
	name: {
		value: string;
		handleChange: Dispatch<SetStateAction<string>>;
	};
	username: {
		value: string;
		handleChange: Dispatch<SetStateAction<string>>;
	};
	email: {
		value: string;
		handleChange: Dispatch<SetStateAction<string>>;
	};
	phoneNumber: {
		value: string;
		handleChange: Dispatch<SetStateAction<string>>;
	};
	pointId: {
		value: string;
		handleChange: Dispatch<SetStateAction<string>>;
	};
	createdAt?: string;
	resetStaff: () => void;
};

export interface CreateStaffStateProps extends StaffStateProps {
	address: {
		value: Address;
		handleChange: Dispatch<SetStateAction<Address>>;
	};
}

export function useStaffState(staff: StaffProps): StaffStateProps {
	const [role, setRole] = useState(staff.role);
	const [name, setName] = useState(staff.name);
	const [username, setUsername] = useState(staff.username);
	const [email, setEmail] = useState(staff.email);
	const [phoneNumber, setPhoneNumber] = useState(staff.phoneNumber);
	const [pointId, setPointId] = useState(staff.pointId);

	const resetStaff = () => {
		setRole(emptyStaff.role);
		setName(emptyStaff.name);
		setUsername(emptyStaff.username);
		setEmail(emptyStaff.email);
		setPhoneNumber(emptyStaff.phoneNumber);
		setPointId(emptyStaff.pointId);
	};

	return {
		id: staff.id,
		role: {
			value: role,
			handleChange: setRole,
		},
		name: {
			value: name,
			handleChange: setName,
		},
		username: {
			value: username,
			handleChange: setUsername,
		},
		email: {
			value: email,
			handleChange: setEmail,
		},
		phoneNumber: {
			value: phoneNumber,
			handleChange: setPhoneNumber,
		},
		pointId: {
			value: pointId,
			handleChange: setPointId,
		},
		createdAt: staff.createdAt,
		resetStaff,
	};
}

export function useCreateStaffState(
	staff: CreateStaffProps
): CreateStaffStateProps {
	const [role, setRole] = useState(staff.role);
	const [name, setName] = useState(staff.name);
	const [username, setUsername] = useState(staff.username);
	const [email, setEmail] = useState(staff.email);
	const [phoneNumber, setPhoneNumber] = useState(staff.phoneNumber);
	const [pointId, setPointId] = useState(staff.pointId);
	const [address, setAddress] = useState(staff.address);

	const resetStaff = () => {
		setRole(emptyCreateStaff.role);
		setName(emptyCreateStaff.name);
		setUsername(emptyCreateStaff.username);
		setEmail(emptyCreateStaff.email);
		setPhoneNumber(emptyCreateStaff.phoneNumber);
		setPointId(emptyCreateStaff.pointId);
		setAddress(emptyCreateStaff.address);
	};

	return {
		id: staff.id,
		role: {
			value: role,
			handleChange: setRole,
		},
		name: {
			value: name,
			handleChange: setName,
		},
		username: {
			value: username,
			handleChange: setUsername,
		},
		email: {
			value: email,
			handleChange: setEmail,
		},
		phoneNumber: {
			value: phoneNumber,
			handleChange: setPhoneNumber,
		},
		pointId: {
			value: pointId,
			handleChange: setPointId,
		},
		address: {
			value: address,
			handleChange: setAddress,
		},
		createdAt: staff.createdAt,
		resetStaff,
	};
}

export async function getStaffs() {
	return fetch(`${process.env.NEXT_PUBLIC_USER_ENDPOINT}/get`, {
		credentials: "include",
	}).then(async (res) => {
		if (res.status !== 200) {
			const json = await res.json();
			throw new Error(json.message);
		}
		return res.json();
	});
}
