import CarouselItem from "./CarouselItem";

export default function Carousel() {
	const images = [
		"https://daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg",
		"https://daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg",
		"https://daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg",
		"https://daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg",
		"https://daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg",
	];
	return (
		<div className="carousel w-full">
			{images.map((img, index) => (
				<CarouselItem
					key={img}
					img={img}
					index={index}
					next={(index + 1) % images.length}
					prev={(index - 1 + images.length) % images.length}
				/>
			))}
		</div>
	);
}
