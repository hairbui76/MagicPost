import Fieldset from "@/components/Form/Fieldset";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import FilterConfirmButton from "./FilterConfirmButton";

export default function FilterFieldset({
	children,
	className = "",
	handleConfirm,
}: {
	children: Array<React.ReactNode> | React.ReactNode;
	className?: string;
	handleConfirm: () => void;
}) {
	return (
		<Fieldset
			icon={faFilter}
			legend="Filter"
			className={
				className
					? className
					: "self-start grid grid-cols-2 w-full md:flex-row md:grid-cols-4"
			}
		>
			{children}
			<FilterConfirmButton handleClick={handleConfirm} />
		</Fieldset>
	);
}
