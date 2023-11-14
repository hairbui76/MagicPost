import Image from "next/image";

export default function Avatar({ src }) {
	return (
		<>
			<div className="avatar">
				<div className="h-8 rounded-full ">
					<Image src={src} alt="" width="0" height="0" className="w-full" />
				</div>
			</div>
		</>
	);
}
