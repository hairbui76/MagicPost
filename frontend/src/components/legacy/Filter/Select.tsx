"use client";

import InputContainer from "@/components/Form/InputContainer";
import { useState } from "react";

export default function Select({
	label = "",
	name,
	required = false,
	className = "",
	options,
	value = "",
	handleChange,
	flexDirection = "col",
}: {
	label: string;
	name: string;
	required?: boolean;
	className?: string;
	options: Array<{ value: string; label: string }>;
	value?: string;
	handleChange: (value: string) => void;
	flexDirection?: "row" | "col";
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
