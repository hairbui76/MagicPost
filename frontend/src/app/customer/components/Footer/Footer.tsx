import Image from "next/image";

export default function Footer() {
	return (
		<footer className="flex flex-col md:flex-row flex-grow p-4 md:px-32 justify-between gap-4 text-custom-white bg-custom-theme text-sm">
			<div>
				<Image
					src="/logo_no_char.png"
					width="0"
					height="0"
					className="w-16 h-auto"
					alt=""
				/>
				<div className="text-lg font-bold">MAGIC POST.Inc</div>
				<div>Since 2023</div>
			</div>
			<div className="flex flex-col">
				<header className="footer-title">Services</header>
				<a className="link link-hover">Branding</a>
				<a className="link link-hover">Design</a>
				<a className="link link-hover">Marketing</a>
				<a className="link link-hover">Advertisement</a>
			</div>
			<div className="flex flex-col">
				<header className="footer-title">Company</header>
				<a className="link link-hover">About us</a>
				<a className="link link-hover">Contact</a>
				<a className="link link-hover">Jobs</a>
				<a className="link link-hover">Press kit</a>
			</div>
			<div className="flex flex-col">
				<header className="footer-title">Legal</header>
				<a className="link link-hover">Terms of use</a>
				<a className="link link-hover">Privacy policy</a>
				<a className="link link-hover">Cookie policy</a>
			</div>
		</footer>
	);
}
