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
	flexDirection = "col",
	disabled = false,
}: {
	label: string;
	name: string;
	required?: boolean;
	className?: string;
	options: Array<{ value?: string; label?: string }>;
	value?: string;
	handleChange: (value: string) => void;
	flexDirection?: "row" | "col";
	disabled?: boolean;
}) {
	const [focused, setFocused] = useState(false);
	return (
		<InputContainer {...{ label, required, className, flexDirection }}>
			<select
				name={name}
				className={`custom-input appearance-none ${
					focused && required && value === "" ? "custom-input-invalid" : ""
				} w-full`}
				onChange={(e) => handleChange(e.currentTarget.value)}
				onFocus={() => setFocused(true)}
				value={value}
				disabled={disabled}
			>
				<option value="" disabled hidden>
					--None--
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
