"use client";

import PackageTableRow from "./PackageTableRow";
import Fieldset from "../../Form/Fieldset";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useReducer } from "react";
import uniqid from "uniqid";
import { ItemProps } from "../Order";

export default function Package({
	defaultItems = [],
}: {
	defaultItems: Array<ItemProps> | [];
}) {
	const [items, dispatch] = useReducer(
		itemsReducer,
		structuredClone(defaultItems)
	);
	function itemsReducer(
		items: Array<ItemProps>,
		action: {
			type: "added" | "removed" | "modified";
			item?: ItemProps;
		}
	): Array<ItemProps> | [] {
		switch (action.type) {
			case "added": {
				const newItem = {
					id: uniqid(),
					name: "",
					quantity: 0,
					value: 0,
					note: "",
				};
				return [...items, newItem];
			}
			case "modified": {
				const i = items.findIndex((item) => item.id === action.item?.id);
				const before = items.slice(0, i);
				const after = items.slice(i + 1);
				if (action.item) {
					return [...before, action.item, ...after];
				}
				throw new Error(`Action\'s item is ${action.item}!`);
			}
			case "removed": {
				if (action.item) {
					return [...items.filter((item) => item.id !== action.item?.id)];
				}
				throw new Error(`Action\'s item is ${action.item}!`);
			}
			default: {
				throw new Error(`Invalid action type: ${action.type}`);
			}
		}
	}
	function addItem(): void {
		dispatch({ type: "added" });
	}
	return (
		<Fieldset legend="3. Package">
			<div className="overflow-x-auto max-h-80 md:max-h-80 w-full">
				<table className="table">
					<thead className="text-inherit ">
						<tr>
							<th></th>
							<th>Name</th>
							<th>Quantity</th>
							<th>Value</th>
							<th>Note</th>
						</tr>
					</thead>
					<tbody>
						{/* TODO: Replace key with some id */}
						{items.length ? (
							items?.map((item, index) => (
								<PackageTableRow
									{...item}
									key={item.id}
									index={index + 1}
									dispatch={dispatch}
								/>
							))
						) : (
							<tr>
								<td colSpan={5} className="text-center italic">
									Nothing to show!
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
			<button
				type="button"
				onClick={addItem}
				className="absolute top-[-1.55rem] left-[6rem]"
			>
				<FontAwesomeIcon icon={faPlus} className="w-10" />
			</button>
		</Fieldset>
	);
}
