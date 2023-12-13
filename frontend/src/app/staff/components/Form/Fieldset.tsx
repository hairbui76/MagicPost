import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Fieldset({
	legend,
	className = "",
	children,
	icon,
	disabled = false,
}: {
	legend: string;
	className?: string;
	children: React.ReactNode;
	icon: any;
	disabled?: boolean;
}) {
	return (
		<fieldset
			className={`flex flex-col gap-4 justify-between min-w-0 ${className} bg-custom-white px-6 pt-14 pb-4 relative rounded-md shadow-md`}
		>
			{disabled ? (
				<div className="absolute top-0 left-0 w-full h-full bg-[#D1D5DE] opacity-40 z-20 cursor-not-allowed rounded-md"></div>
			) : null}
			<legend className="font-medium text-lg absolute top-0 border-b-2 w-full px-6 left-0 py-2">
				{<FontAwesomeIcon className="mr-2" icon={icon} />}
				{legend}
			</legend>
			{children}
		</fieldset>
	);
}
