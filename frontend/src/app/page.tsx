import Image from "next/image";
import Link from "next/link";
export default function Page(): React.ReactNode {
	return (
		<div className="hero min-h-screen bg-base-200 max-w-full p-4 md:p-12">
			<div className="hero-content flex-col md:flex-row lg:gap-10">
				<picture className="md:max-w-xs w-2/3">
					<source media="(max-width: 767px)" srcSet="/logo_horizon.png" />
					<Image
						src="/logo_no_char.png"
						width="0"
						height="0"
						className="w-full"
						alt="MagicPost logo"
					/>
				</picture>
				<div>
					<h1 className="md:text-4xl text-2xl font-bold">
						Your Go-to Delivery Service!
					</h1>
					<p className="py-6">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
						repellendus illum tempora illo, beatae vel, fugiat obcaecati nam
						aliquam sunt doloribus doloremque inventore, soluta deserunt! Sequi
						neque optio ratione. Voluptates.
					</p>
					<div className="flex w-full">
						<div className="w-1/2 flex flex-col place-items-center gap-4">
							If you are a customer
							<Link href="/customer">
								<button className="btn btn-active btn-primary btn-xs sm:btn-sm md:btn-md">
									See your order
								</button>
							</Link>
						</div>
						<div className="divider divider-horizontal">OR</div>
						<div className="w-1/2 flex flex-col place-items-center gap-4">
							An employee?
							<Link href="/login">
								<button className="btn btn-outline btn-primary btn-xs sm:btn-sm md:btn-md">
									Sign in
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
