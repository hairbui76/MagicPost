import { Dispatch, SetStateAction } from "react";

export default function TextArea({
	value,
	placeholder,
	handleChange,
}: {
	value: string;
	placeholder: string;
	handleChange: Dispatch<SetStateAction<string>>;
}) {
	return (
		<textarea
			placeholder={placeholder}
			className="textarea border-2 text-inherit border-custom-grey focus:border-current textarea-xs w-full bg-transparent"
			onChange={(e) => handleChange(e.currentTarget.value)}
			value={value}
		></textarea>
	);
}
