import Fieldset from "../../Form/Fieldset";
import { faBox } from "@fortawesome/free-solid-svg-icons";
import PackageType from "./PackageType";
import { Dispatch, SetStateAction } from "react";

export type PackageTypeProps = {
	value: "parcel" | "document";
	handleChange: Dispatch<SetStateAction<"parcel" | "document">>;
};

export type PackageProps = {
	type: PackageTypeProps;
};

export default function Package({ type }: PackageProps) {
	return (
		<Fieldset legend="Package" icon={faBox}>
			<PackageType {...type} />
		</Fieldset>
	);
}
