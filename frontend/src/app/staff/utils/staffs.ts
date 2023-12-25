import { Dispatch, SetStateAction, useState } from "react";

export type StaffProps = {
	id?: string;
	name: string;
	username: string;
	email: string;
	phoneNumber: string;
	createdAt?: string;
};

export const emptyStaff: StaffProps = {
	id: "",
	name: "",
	username: "",
	email: "",
	phoneNumber: "",
	createdAt: "",
};

export type StaffStateProps = {
	id?: string;
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
	createdAt?: string;
	resetStaff: () => void;
};

export function useStaffState(staff: StaffProps): StaffStateProps {
	const [name, setName] = useState(staff.name);
	const [username, setUsername] = useState(staff.username);
	const [email, setEmail] = useState(staff.email);
	const [phoneNumber, setPhoneNumber] = useState(staff.phoneNumber);

	const resetStaff = () => {
		setName(emptyStaff.name);
		setUsername(emptyStaff.username);
		setEmail(emptyStaff.email);
		setPhoneNumber(emptyStaff.phoneNumber);
	};

	return {
		id: staff.id,
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
