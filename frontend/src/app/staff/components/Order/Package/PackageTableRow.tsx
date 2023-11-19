import { ChangeEvent, Dispatch } from "react";
import PackageItemInput from "./PackageItemInput";
import { ItemProps } from "../Order";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type PackageTableRowProps = {
	name: string;
	quantity: number;
	value: number;
	note: string;
	index: number;
	id: string;
	dispatch: Dispatch<{
		type: "added" | "removed" | "modified";
		item?: ItemProps;
	}>;
};

export default function PackageTableRow({
	id,
	name,
	quantity,
	value,
	note,
	index,
	dispatch,
}: PackageTableRowProps) {
	function handleChange(
		e: ChangeEvent<HTMLElement>,
		attribute: "name" | "quantity" | "value" | "note"
	): void {
		const item = { id, name, quantity, value, note };
		const input = e.currentTarget as HTMLInputElement;
		// TODO: get rid of the TypeScript problem below
		if (["quantity", "value"].includes(attribute)) {
			item[attribute] = parseFloat(input?.value);
		} else {
			item[attribute] = input?.value;
		}
		dispatch({ type: "modified", item });
	}

	function handleRemove(): void {
		const item = { id, name, quantity, value, note };
		dispatch({ type: "removed", item });
	}
	const cellProps = [
		{
			placeholder: "Item",
			name: "item_name[]",
			value: name,
			onChange: (e: ChangeEvent<HTMLElement>) => handleChange(e, "name"),
		},
		{
			placeholder: "Quantity",
			name: "item_quantity[]",
			value: quantity,
			onChange: (e: ChangeEvent<HTMLElement>) => handleChange(e, "quantity"),
		},
		{
			placeholder: "Value",
			name: "item_value[]",
			value: value,
			onChange: (e: ChangeEvent<HTMLElement>) => handleChange(e, "value"),
		},
		{
			placeholder: "Note",
			name: "item_note[]",
			value: note,
			onChange: (e: ChangeEvent<HTMLElement>) => handleChange(e, "note"),
		},
	];

	return (
		<tr className="even:bg-[#EADEDA]">
			<td>{index}</td>
			{cellProps.map((cellProp, index) => (
				<td key={index}>
					<PackageItemInput {...cellProp} />
				</td>
			))}
			<button type="button" onClick={handleRemove}>
				<FontAwesomeIcon icon={faCircleXmark} className="mt-5 mr-2" />
			</button>
		</tr>
	);
}
