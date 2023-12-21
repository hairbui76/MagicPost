"use client";
import PrimaryButton from "@/app/staff/components/Button/PrimaryButton";
import SecondaryButton from "@/app/staff/components/Button/SecondaryButton";
import Fieldset from "@/app/staff/components/Form/Fieldset";
import { faList, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";

export default function Actions({
	selectAll,
	onSelectAll,
	selected,
	onConfirm,
	onReject,
	rejectReason,
	setRejectReason,
}: {
	selectAll: boolean;
	onSelectAll: () => void;
	selected: boolean;
	onConfirm: () => void;
	onReject: () => void;
	rejectReason: string;
	setRejectReason: Dispatch<SetStateAction<string>>;
}) {
	return (
		<Fieldset legend="Actions" icon={faList}>
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
					disabled={!selected || !rejectReason}
					handleClick={() => onReject()}
				>
					Reject
				</SecondaryButton>
				<input
					type="text"
					className="custom-input disabled:bg-[#B7B6C1]"
					placeholder="Reason for reject"
					disabled={!selected}
					onChange={(e) => setRejectReason(e.currentTarget.value)}
				/>
				<button type="button">
					<FontAwesomeIcon icon={faRotateRight} className="w-full" />
				</button>
			</div>
		</Fieldset>
	);
}
