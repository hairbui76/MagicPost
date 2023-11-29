"use client";
import { useState } from "react";
import InputContainer from "./InputContainer";

export default function NumberInput({
	label = "",
	placeholder,
	name,
	required = false,
	className = "",
	value,
	handleChange,
	numberType = "int",
	minValue = 0,
}: {
	label: string;
	placeholder: string;
	name: string;
	required?: boolean;
	className?: string;
	value: number;
	handleChange: (value: number) => void;
	numberType?: "int" | "float";
	minValue?: number;
}) {
	const [focused, setFocused] = useState(false);
	return (
		<InputContainer {...{ label, required }}>
			<input
				type="number"
				placeholder={placeholder}
				className={`custom-input ${
					focused ? "invalid:border-custom-red" : ""
				} ${className}`}
				name={name}
				onFocus={() => setFocused(true)}
				required={required}
				value={value}
				onChange={(e) =>
					handleChange(
						numberType === "int"
							? parseInt(e.currentTarget.value)
							: parseFloat(e.currentTarget.value)
					)
				}
				min={minValue}
				step={numberType === "int" ? 1 : 0.1}
			/>
		</InputContainer>
	);
}
