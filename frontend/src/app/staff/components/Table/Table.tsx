export default function Table({
	columnHeadings,
	children,
}: {
	columnHeadings: Array<{ label: string; value: string }>;
	children: React.ReactNode[];
}) {
	return (
		<div className="flex flex-col gap-4 w-full overflow-x-auto">
			<table className="table table-sm overflow-x-auto bg-custom-white rounded-md shadow-md w-full">
				<thead className="text-custom-text-color">
					<tr className="border-b-2 border-custom-grey">
						{[{ label: "", value: "" }, ...columnHeadings].map(
							(header, index) => (
								<th className="text-center text-sm" key={index}>
									{header.label}
								</th>
							)
						)}
					</tr>
				</thead>
				<tbody>
					{children ? (
						children
					) : (
						<tr className="border-none">
							<td colSpan={100} className="text-center italic">
								Nothing to show!
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}
