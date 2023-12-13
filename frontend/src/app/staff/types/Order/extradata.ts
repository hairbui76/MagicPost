import { Dispatch, SetStateAction } from "react";

export type ExtraDataProps = {
	cod: CODProps;
	payer: PayerProps;
	note: NoteProps;
	packageValue: number;
	disabled: boolean;
};

export type CODProps = {
	value: number;
	handleChange: Dispatch<SetStateAction<number>>;
};

export type PayerProps = {
	value: "sender" | "receiver";
	handleChange: Dispatch<SetStateAction<"sender" | "receiver">>;
};

export type NoteProps = {
	value: string;
	handleChange: Dispatch<SetStateAction<string>>;
};
