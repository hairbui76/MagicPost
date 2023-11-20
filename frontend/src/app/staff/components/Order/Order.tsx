import PrimaryButton from "../Button/PrimaryButton";
import SecondaryButton from "../Button/SecondaryButton";
import Form from "../Form/Form";
import CustomerFieldset from "./Customer/CustomerFieldset";
import PackageTable from "./Package/PackageTable";

// import uniqid from "uniqid";

export type ItemProps = {
	id: string;
	name: string;
	quantity: number;
	value: number;
	note: string;
};

export default function Order({
	action,
}: {
	action: (formData: FormData) => void;
}) {
	// Note: The following testItems should only be used for testing,
	// as uniqid introduces randomness, making the pre-rendered
	// React tree different from the server and the React tree that was rendered
	// during the first render in the browser (hydration).

	// const testItems = [
	// 	{
	// 		id: uniqid(),
	// 		name: 'Phone',
	// 		quantity: 1,
	// 		value: 10000000,
	// 		note: '',
	// 	},
	// 	{
	// 		id: uniqid(),
	// 		name: 'Laptop',
	// 		quantity: 1,
	// 		value: 25000000,
	// 		note: 'Fragile',
	// 	},
	// 	{
	// 		id: uniqid(),
	// 		name: 'Document',
	// 		quantity: 2,
	// 		value: 0,
	// 		note: 'Very important',
	// 	},
	// 	{
	// 		id: uniqid(),
	// 		name: 'Toothbrush',
	// 		quantity: 1,
	// 		value: 10000,
	// 		note: '',
	// 	},
	// 	{
	// 		id: uniqid(),
	// 		name: 'Toothbrush',
	// 		quantity: 1,
	// 		value: 10000,
	// 		note: '',
	// 	},
	// 	{
	// 		id: uniqid(),
	// 		name: 'Toothbrush',
	// 		quantity: 1,
	// 		value: 10000,
	// 		note: '',
	// 	},
	// ] as Array<ItemProps>;
	return (
		<Form action={action}>
			<CustomerFieldset type="sender" />
			<CustomerFieldset type="receiver" />
			<PackageTable defaultItems={[]} />
			<div className="flex flex-row gap-4">
				<PrimaryButton type="submit">Confirm</PrimaryButton>
				<SecondaryButton type="reset">Reset</SecondaryButton>
			</div>
		</Form>
	);
}
