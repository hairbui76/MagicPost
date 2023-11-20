"use client";
import { faBell, faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import Avatar from "./Avatar";
import Toggle from "./Toggle";

export default function Header({ onToggle }: { onToggle: () => void }) {
	return (
		<header className="p-4 h-16 pr-6 md:gap-6 gap-4 flex flex-row items-center z-[9999] fixed w-full">
			<Toggle onToggle={onToggle} />
			<picture>
				<source media="(max-width: 767px)" srcSet="/logo_no_char.png" />
				<Image
					src="/logo_horizon.png"
					alt=""
					width="0"
					height="0"
					className="md:w-32 w-10"
				/>
			</picture>

			<input
				type="text"
				placeholder="Search"
				className="input input-bordered input-sm flex-1"
			/>
			<FontAwesomeIcon icon={faBell} className=" ml-auto h-4" />
			<Avatar src="/default_avatar.png" />
			<button>
				<Link href="/login">
					<FontAwesomeIcon icon={faDoorOpen} className="h-4" />
				</Link>
			</button>
		</header>
	);
}
