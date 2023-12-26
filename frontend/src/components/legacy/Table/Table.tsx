export default function Table({
	columnHeadings,
	children,
}: {
	columnHeadings: Array<string>;
	children: React.ReactNode[] | React.ReactNode;
}) {
	return (
		<table className="table table-sm overflow-x-auto bg-custom-white rounded-md shadow-md w-full">
			<thead className="text-custom-text-color">
				<tr className="border-b-2 border-custom-grey">
					{columnHeadings.map((header, index) => (
						<th className="text-center text-sm" key={index}>
							{header}
						</th>
					))}
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
	);
}
