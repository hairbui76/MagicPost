import { faFilter } from "@fortawesome/free-solid-svg-icons";
import Fieldset from "../../../../../components/Form/Fieldset";

export default function FilterFieldset({
	children,
}: {
	children: Array<React.ReactNode>;
}) {
	return (
		<Fieldset
			icon={faFilter}
			legend="Filter"
			className="self-start grid grid-cols-2 w-full md:flex-row md:grid-cols-4"
		>
			{children}
		</Fieldset>
	);
}
