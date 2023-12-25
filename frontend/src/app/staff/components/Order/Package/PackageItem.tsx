import { ItemProps } from "@/app/staff/types/Order/package";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch } from "react";
import NumberInput from "../../../../../components/Form/NumberInput";
import TextInput from "../../../../../components/Form/TextInput";

export default function PackageItem({
	index,
	id,
	name,
	value,
	weight,
	quantity,
	handleChange,
}: ItemProps & {
	index: number;
	handleChange: Dispatch<{
		type: "item_changed" | "item_added" | "item_removed";
		item?: ItemProps;
	}>;
}) {
	return (
		<div className="border-2 px-4 py-2 rounded-lg relative">
			<div className="font-medium mb-2">#{index + 1}</div>
			<div className="sm:grid sm:grid-cols-2 sm:gap-2 flex flex-col">
				<TextInput
					name="item-name"
					label={`Name`}
					placeholder="Item name"
					required={true}
					value={name}
					handleChange={(name: string) =>
						handleChange({
							type: "item_changed",
							item: { id, name, quantity, weight, value },
						})
					}
					className="text-xs"
				/>
				<NumberInput
					name="item-quantity"
					label="Quantity"
					placeholder="Quantity"
					required={true}
					value={quantity}
					handleChange={(quantity: number) =>
						handleChange({
							type: "item_changed",
							item: { id, name, quantity, weight, value },
						})
					}
					minValue={1}
					className="text-xs"
				/>
				<NumberInput
					name="item-weight"
					label="Weight"
					placeholder="Weight"
					required={true}
					value={weight}
					handleChange={(weight: number) =>
						handleChange({
							type: "item_changed",
							item: { id, name, quantity, weight, value },
						})
					}
					numberType="float"
					className="text-xs"
				/>
				<NumberInput
					name="item-value"
					label="Value"
					placeholder="Value"
					value={value}
					handleChange={(value: number) =>
						handleChange({
							type: "item_changed",
							item: { id, name, quantity, weight, value },
						})
					}
					className="text-xs"
				/>
			</div>
			<button
				type="button"
				className="absolute top-4 right-4"
				onClick={() =>
					handleChange({
						type: "item_removed",
						item: { id, name, quantity, weight, value },
					})
				}
			>
				<FontAwesomeIcon icon={faCircleXmark} />
			</button>
		</div>
	);
}
