"use client";
import { useState } from "react";

export default function Input({
	label = "",
	placeholder,
	name,
	defaultValue = "",
	type = "text",
	required = false,
	className = "",
}: {
	label?: string;
	placeholder: string;
	name: string;
	defaultValue?: string | number;
	type?: string;
	required?: boolean;
	className?: string;
}) {
	const [focused, setFocused] = useState(false);
	return (
		<label className="text-left flex flex-1 flex-col gap-1 relative">
			<span className="font-medium">{label}</span>
			<input
				type={type}
				placeholder={placeholder}
				className={`input input-sm bg-transparent text-inherit focus:border-base-100 relative overflow-ellipsis border-slate-300 ${
					focused ? "invalid:border-[#FF5154] invalid:text-[#FF5154]" : ""
				} ${className}`}
				name={name}
				onFocus={() => setFocused(true)}
				required={required}
				defaultValue={defaultValue}
			/>
			{required ? (
				<span className="absolute top-2 right-0 text-xs">required</span>
			) : null}
		</label>
	);
}
