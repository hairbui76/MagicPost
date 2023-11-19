import Order from "../../components/Order/Order";
export default function Page() {
	async function action(formData: FormData) {
		"use server";
		console.log(formData);
		console.log(formData.getAll("item_name[]"));
	}
	return <Order action={action} />;
}
