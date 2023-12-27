export default function FilterConfirmButton({
	handleClick,
}: {
	handleClick: () => void;
}) {
	return (
		<button
			type="button"
			className="btn btn-outline text-custom-text-color absolute top-[0.375rem] right-6 btn-sm"
			onClick={() => handleClick()}
		>
			Filter
		</button>
	);
}
