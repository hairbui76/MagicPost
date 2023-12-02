import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Fieldset({
	legend,
	className = "",
	children,
	icon,
}: {
	legend: string;
	className?: string;
	children: React.ReactNode;
	icon: any;
}) {
	return (
		<fieldset
			className={`flex flex-col gap-4 justify-between min-w-0 ${className} bg-[#FFFFFC] px-6 pt-14 pb-4 relative rounded-md shadow-md`}
		>
			<legend className="font-medium text-lg absolute top-0 border-b-2 w-full px-6 left-0 py-2">
				{<FontAwesomeIcon className="mr-2" icon={icon} />}
				{legend}
			</legend>
			{children}
		</fieldset>
	);
}
