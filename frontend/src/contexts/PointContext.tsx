"use client";

import { PointProps } from "@/app/staff/utils/points";
import { Dispatch, SetStateAction, createContext, useState } from "react";

export type PointContextProps = {
	points: PointProps[];
	setPoints: Dispatch<SetStateAction<PointProps[]>>;
};

const PointContext = createContext<PointContextProps | null>(null);

const PointContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [points, setPoints] = useState<PointProps[]>([]);
	return (
		<PointContext.Provider value={{ points, setPoints }}>
			{children}
		</PointContext.Provider>
	);
};

export default PointContext;

export { PointContextProvider };
