"use client";

import { useState } from "react";
import Pagination from "../Pagination/Pagination";

export default function Table({
	columnHeadings,
	children,
}: {
	columnHeadings: Array<string>;
	children: React.ReactNode[];
}) {
	const [pageNumber, setPageNumber] = useState(1);
	return (
		<div className="flex flex-col gap-4 w-full">
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
						children.slice((pageNumber - 1) * 20, pageNumber * 20)
					) : (
						<tr className="border-none">
							<td colSpan={100} className="text-center italic">
								Nothing to show!
							</td>
						</tr>
					)}
				</tbody>
			</table>
			<Pagination
				pageNumber={pageNumber}
				numberOfPages={Math.floor(children.length / 20) + 1}
				setPageNumber={setPageNumber}
			/>
		</div>
	);
}
