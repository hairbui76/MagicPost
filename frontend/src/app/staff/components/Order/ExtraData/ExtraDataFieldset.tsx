import { ExtraDataProps } from "@/app/staff/types/Order/extradata";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Fieldset from "../../../../../components/Form/Fieldset";
import CODField from "./CODField";
import NoteField from "./NoteField";
import { PayerField } from "./PayerField";

export default function ExtraDataFieldset({
	cod,
	payer,
	note,
	packageValue,
	disabled,
}: ExtraDataProps) {
	return (
		<Fieldset
			legend="Extra information"
			icon={faPenToSquare}
			className="sm:grid sm:grid-cols-2  flex flex-col gap-6 self-start w-full"
			disabled={disabled}
		>
			<CODField {...cod} packageValue={packageValue} />
			<PayerField {...payer} />
			<NoteField {...note} />
		</Fieldset>
	);
}
