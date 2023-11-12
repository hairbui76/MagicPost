import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Avatar from "./Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import Toggle from "./Toggle";

export default function Header() {
	return (
		<header className="md:h-16 md:px-6 flex flex-row items-center gap-6 bg-[#272935] text-[#363635] z-[9999] fixed w-full">
			<Image
				src="/logo_horizon.png"
				alt=""
				width="0"
				height="0"
				className="w-32"
			/>
			<input
				type="text"
				placeholder="Search"
				className="input input-bordered input-sm w-1/2 md:max-w-sm ml-auto mr-auto"
			/>
			<FontAwesomeIcon icon={faBell} className=" ml-auto h-1/4" />
			<Avatar src="" />
			<button
				type="button"
				className="btn btn-outline btn-error btn-xs md:btn-sm "
			>
				Sign out
			</button>
		</header>
	);
}
