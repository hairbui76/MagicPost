"use client";
import { ChangeEvent, useState } from "react";

export default function PackageItemInput({
	label = "",
	placeholder,
	name,
	value = "",
	type = "text",
	required = false,
	className = "",
	onChange,
}: {
	label?: string;
	placeholder: string;
	name: string;
	value?: string | number;
	type?: string;
	required?: boolean;
	className?: string;
	onChange: (e: ChangeEvent<HTMLElement>) => void;
}) {
	const [focused, setFocused] = useState(false);
	return (
		<label className="text-left flex flex-col gap-1">
			<span className="font-medium">{label}</span>
			<input
				type={type}
				placeholder={placeholder}
				className={`input input-xs bg-transparent text-inherit focus:border-base-100 relative overflow-ellipsis px-0 focus:px-2 w-auto min-w-0 ${
					focused ? "invalid:border-[#FF5154] invalid:text-[#FF5154]" : ""
				} ${className}`}
				name={name}
				onFocus={() => setFocused(true)}
				required={required}
				value={value}
				onChange={onChange}
			/>
		</label>
	);
}
