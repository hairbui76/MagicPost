import Image from "next/image";

export default function CarouselItem({
	index,
	img,
	next,
	prev,
}: {
	index: number;
	img: string;
	next: number;
	prev: number;
}) {
	return (
		<div id={`slide${index}`} className="carousel-item relative w-full">
			<Image src={img} className="w-full h-auto" width="0" height="0" alt="" />
			<div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
				<a href={`#slide${prev}`} className="btn btn-circle">
					❮
				</a>
				<a href={`#slide${next}`} className="btn btn-circle">
					❯
				</a>
			</div>
		</div>
	);
}
