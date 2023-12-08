import Breadcrumps from "./Breadcrump";

export default function Content({
	children,
}: {
	children: Array<React.ReactNode>;
}) {
	return (
		<main className="bg-[#E8EEF2] text-[#363635] w-full overflow-auto p-4 pt-0 text-justify md:px-12 mt-16">
			<Breadcrumps />
			{children}
		</main>
	);
}
