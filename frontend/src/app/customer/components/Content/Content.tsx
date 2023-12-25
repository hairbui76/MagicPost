export default function Content({ children }: { children: React.ReactNode }) {
	return (
		<main className="bg-[#E8EEF2] text-[#363635] w-full flex-1 overflow-auto text-justify pt-16 flex flex-col">
			{children}
		</main>
	);
}
