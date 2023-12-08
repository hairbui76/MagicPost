"use client";

import { useState } from "react";
import InputContainer from "./InputContainer";

export default function Select({
	label = "",
	name,
	required = false,
	className = "",
	options,
	value = "",
	handleChange,
}: {
	label: string;
	name: string;
	required?: boolean;
	className?: string;
	options: Array<{ value: string; label: string }>;
	value: string;
	handleChange: (value: string) => void;
}) {
	const [focused, setFocused] = useState(false);
	return (
		<InputContainer {...{ label, required, className }}>
			<select
				name={name}
				className={`custom-input appearance-none ${
					focused && value === "" ? "custom-input-invalid" : ""
				} w-full`}
				onChange={(e) => handleChange(e.currentTarget.value)}
				onFocus={() => setFocused(true)}
				value={value}
			>
				<option value="" disabled hidden>
					--Select one--
				</option>
				{options.map((option, index) => (
					<option key={index} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</InputContainer>
	);
}
