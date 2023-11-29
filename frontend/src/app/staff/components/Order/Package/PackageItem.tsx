import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import NumberInput from "../../Form/NumberInput";
import TextInput from "../../Form/TextInput";
import { Dispatch } from "react";

export type ItemProps = {
	id: string;
	name: string;
	quantity: number;
	weight: number;
	value: number;
};

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
		<div key={id} className="border-2 p-4 rounded-lg mb-4 relative">
			<div className="font-medium mb-2">#{index + 1}</div>
			<div className="sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-2 flex flex-col">
				<TextInput
					name="name"
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
				/>
				<NumberInput
					name="quantity"
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
				/>
				<NumberInput
					name="weight"
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
				/>
				<NumberInput
					name="value"
					label="Value"
					placeholder="Value"
					value={value}
					handleChange={(value: number) =>
						handleChange({
							type: "item_changed",
							item: { id, name, quantity, weight, value },
						})
					}
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
