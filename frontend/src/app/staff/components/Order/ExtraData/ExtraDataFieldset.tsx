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
		<Fieldset legend="Extra information" icon={faPenToSquare}>
			<div className="sm:grid sm:grid-cols-2 md:grid-cols-3 flex flex-col gap-6 md:gap-8 lg:gap-12">
				<CODField {...cod} packageValue={packageValue} />
				<PayerField {...payer} />
				<NoteField {...note} />
			</div>
		</Fieldset>
	);
}
