"use client";

import { AppContext } from "@/contexts";
import { AppContextProps } from "@/contexts/AppContext";
import Link from "next/link";
import { useContext, useState } from "react";

export default function SearchBar() {
	const [inputValue, setInputValue] = useState("");
	const { user } = useContext(AppContext) as AppContextProps;
	console.log(user);
	return (
		<div className="dropdown w-1/2 mx-auto">
			<input
				tabIndex={0}
				type="text"
				placeholder="Search"
				className="input input-bordered input-sm w-full"
				value={inputValue}
				onChange={(e) => setInputValue(e.currentTarget.value)}
			/>
			{inputValue ? (
				<ul
					tabIndex={0}
					className="dropdown-content z-[1] menu p-2 shadow bg-custom-white text-custom-text-color rounded-box w-full"
				>
					<li>
						<Link
							className="hover:text-custom-text-color"
							href={"/staff/orders/status/" + inputValue}
							onClick={() => setInputValue("")}
						>
							Order: <span className="text-[#256EFF]">{inputValue}</span>
						</Link>
					</li>
					{user?.role.endsWith("STAFF") ? null : (
						<li>
							<Link
								className="hover:text-custom-text-color"
								href={"/staff/management/staffs/" + inputValue}
								onClick={() => setInputValue("")}
							>
								Staff: <span className="text-[#256EFF]">{inputValue}</span>
							</Link>
						</li>
					)}
					{user?.role !== "COMPANY_ADMINISTRATOR" ? null : (
						<li>
							<Link
								className="hover:text-custom-text-color"
								href={"/staff/management/points/" + inputValue}
								onClick={() => setInputValue("")}
							>
								Point: <span className="text-[#256EFF]">{inputValue}</span>
							</Link>
						</li>
					)}
				</ul>
			) : null}
		</div>
	);
}
