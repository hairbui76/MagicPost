"use client";
import { StaffProps } from "@/app/staff/types/Order/staffs";
import { Dispatch, SetStateAction, createContext, useState } from "react";

export type StaffContextProps = {
	staffs: StaffProps[];
	setStaffs: Dispatch<SetStateAction<StaffProps[]>>;
};

const StaffContext = createContext<StaffContextProps | null>(null);

const StaffContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [staffs, setStaffs] = useState<StaffProps[]>([]);
	return (
		<StaffContext.Provider value={{ staffs, setStaffs }}>
			{children}
		</StaffContext.Provider>
	);
};

export default StaffContext;

export { StaffContextProvider };
