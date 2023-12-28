"use client";
import { faBell, faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Avatar from "./Avatar";
import Toggle from "./Toggle";
import SearchBar from "./SearchBar";

export default function Header({ onToggle }: { onToggle: () => void }) {
	const router = useRouter();
	const handleLogout = async () => {
		const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/logout`, {
			credentials: "include",
			method: "POST",
		});
		const response = await res.json();
		if (res.status === 200) {
			toast.success(response.message);
			router.replace("/login");
		} else {
			toast.error(response.message);
		}
	};
	return (
		<header className="p-4 h-16 pr-6 md:gap-6 gap-4 flex flex-row items-center z-[30] fixed w-full bg-custom-theme">
			<Toggle onToggle={onToggle} />
			<picture>
				<source media="(max-width: 767px)" srcSet="/logo_no_char.png" />
				<Image
					src="/logo_horizon.png"
					alt=""
					width="0"
					height="0"
					className="md:w-32 w-10 h-auto"
				/>
			</picture>
			<SearchBar />
			<Avatar src="/default_avatar.png" />
			<button onClick={handleLogout}>
				<FontAwesomeIcon icon={faDoorOpen} className="h-4" />
			</button>
		</header>
	);
}
