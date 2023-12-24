"use client";

import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function HoverNote({ note }: { note: string }) {
	const [showNote, setShowNote] = useState(false);
	return (
		<>
			<button
				type="button"
				className="relative"
				onClick={() => setShowNote(true)}
			>
				<FontAwesomeIcon icon={faClipboard} className="h-4" />
			</button>
			<div
				className={`bg-custom-text-color bg-opacity-70 fixed w-screen h-screen z-[9999] flex items-center justify-center top-0 left-0 ${
					showNote ? "" : "hidden"
				}`}
			>
				<div className="bg-custom-white p-10 relative rounded-lg">
					<button
						className="btn btn-square absolute top-2 right-2 text-custom-text-color btn-xs bg-transparent border-none hover:bg-primary"
						onClick={() => {
							console.log(showNote);
							setShowNote(false);
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
					{note}
				</div>
			</div>
		</>
	);
}
