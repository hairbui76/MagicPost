import { ExtraDataProps } from "@/app/staff/types/Order/extradata";
import Fieldset from "../../Form/Fieldset";
import CODField from "./CODField";
import NoteField from "./NoteField";
import { PayerField } from "./PayerField";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default function ExtraDataFieldset({
	cod,
	payer,
	note,
	packageValue,
}: ExtraDataProps) {
	return (
		<Fieldset
			legend="Extra information"
			icon={faPenToSquare}
			className="sm:grid sm:grid-cols-2  flex flex-col gap-6 self-start w-full"
		>
			<CODField {...cod} packageValue={packageValue} />
			<PayerField {...payer} />
			<NoteField {...note} />
		</Fieldset>
	);
}
