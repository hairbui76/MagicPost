import PrimaryButton from "@/components/Button/PrimaryButton";
import SecondaryButton from "@/components/Button/SecondaryButton";
import Fieldset from "@/components/Form/Fieldset";
import { faList, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Dispatch, SetStateAction } from "react";

export default function Actions({
	selectAll,
	onSelectAll,
	selected,
	onConfirm,
	onReject,
	reason,
	setReason,
	onRefresh,
}: {
	selectAll: boolean;
	onSelectAll: () => void;
	selected: boolean;
	onConfirm: () => void;
	onReject: () => void;
	reason: string;
	setReason: Dispatch<SetStateAction<string>>;
	onRefresh: () => void;
}) {
	return (
		<Fieldset legend="Actions" icon={faList} className="w-full">
			<div className="w-full flex flex-row gap-4">
				<SecondaryButton
					type="button"
					className="mr-auto"
					handleClick={() => onSelectAll()}
				>
					{!selectAll ? "Select All" : "Cancel"}
				</SecondaryButton>
				<PrimaryButton
					type="button"
					className="btn-sm disabled:bg-[#444054]"
					disabled={!selected}
					handleClick={() => onConfirm()}
				>
					Confirm Selected
				</PrimaryButton>
				<SecondaryButton
					type="button"
					className="btn-error disabled:bg-[#EF959D]"
					disabled={!selected || !reason}
					handleClick={() => onReject()}
				>
					Reject
				</SecondaryButton>
				<input
					type="text"
					className="custom-input disabled:bg-[#B7B6C1]"
					placeholder="Reason for reject"
					disabled={!selected}
					onChange={(e) => setReason(e.currentTarget.value)}
				/>
				<button type="button" onClick={onRefresh}>
					<FontAwesomeIcon icon={faRotateRight} className="w-full" />
				</button>
			</div>
		</Fieldset>
	);
}
