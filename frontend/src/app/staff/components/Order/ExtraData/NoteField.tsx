import { NoteProps } from "@/app/staff/types/Order/extradata";
import TextArea from "../../Form/TextArea";

export default function NoteField({ value, handleChange }: NoteProps) {
	return (
		<div className="sm:col-span-2 md:col-span-1 flex flex-col gap-2">
			<div className="font-medium">Note</div>
			<TextArea
				placeholder="Note"
				value={value}
				handleChange={(value) => handleChange(value)}
			/>
		</div>
	);
}
