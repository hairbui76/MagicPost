import { PackageItemsProps } from "@/app/staff/types/Order/package";
import PrimaryButton from "../../../../../components/Button/PrimaryButton";
import PackageItem from "./PackageItem";

export default function PackageItemsField({
	value,
	handleChange,
	disabled = false,
}: PackageItemsProps) {
	return (
		<div className="flex flex-col gap-4">
			<div className="font-medium text-md">Items</div>
			<div className="max-h-96 overflow-auto flex flex-col gap-4">
				{value.length ? (
					value.map((item, index) => (
						<PackageItem key={item.id} {...{ ...item, index, handleChange }} />
					))
				) : (
					<span className="text-center italic  text-sm">Nothing to show!</span>
				)}
			</div>
			{disabled ? null : (
				<PrimaryButton
					type="button"
					handleClick={() => handleChange({ type: "item_added" })}
					className="mx-auto block text-xs"
				>
					Add an item
				</PrimaryButton>
			)}
			<hr className="border" />
			<div className="flex flex-col gap-4 sm:flex-row sm:w-full sm:gap-44 text-sm">
				<div className="flex flex-row w-full sm:w-1/2">
					Total weight:{" "}
					<span className="ml-auto font-medium">
						{value.reduce((totalWeight, item) => totalWeight + item.weight, 0)}{" "}
						g
					</span>
				</div>
				<div className="flex flex-row w-full sm:w-1/2">
					Total value:{" "}
					<span className="ml-auto font-medium">
						{value.reduce((totalWeight, item) => totalWeight + item.value, 0)}{" "}
						VND
					</span>
				</div>
			</div>
		</div>
	);
}
