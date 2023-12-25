import Image from "next/image";
import LookUp from "./components/LookUp/LookUp";

export default function Page() {
	return (
		<div className="flex flex-col h-full flex-1">
			{/* <Carousel /> */}
			<div className="w-full">
				<Image
					width={0}
					height={0}
					className="w-full h-24 object-cover opacity-70"
					src="https://images2.alphacoders.com/133/1331863.png"
					alt="city-background"
				/>
				<div className="absolute top-0 w-full h-full flex justify-center items-center">
					<div>
						<p className="text-center text-white font-bold">
							WATCH YOUR ORDER TRIP
						</p>
						<p className="text-center text-white font-bold">Magic Post</p>
					</div>
				</div>
			</div>
			{/* <Stats /> */}
			<LookUp />
		</div>
	);
}
