"use client";

import Link from "next/link";
import { useState } from "react";

export default function SearchBar() {
	const [inputValue, setInputValue] = useState("");
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
							href={"/orders/status/" + inputValue}
							onClick={() => setInputValue("")}
						>
							Order: <span className="text-[#256EFF]">{inputValue}</span>
						</Link>
					</li>
				</ul>
			) : null}
		</div>
	);
}
