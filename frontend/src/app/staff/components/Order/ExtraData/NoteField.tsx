import { NoteProps } from "@/app/staff/types/Order/extradata";
import TextArea from "../../../../../components/Form/TextArea";

export default function NoteField({ value, handleChange }: NoteProps) {
	return (
		<div className="col-span-2 flex flex-col gap-2">
			<div className="font-medium">Note</div>
			<TextArea
				placeholder="Note"
				value={value}
				handleChange={(value) => handleChange(value)}
			/>
		</div>
	);
}
