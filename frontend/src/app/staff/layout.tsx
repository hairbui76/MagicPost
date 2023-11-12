import { Header, Aside, Content, Footer } from "./components";

export default function Layout({
	children,
}: {
	children: Array<React.ReactNode>;
}) {
	return (
		<>
			<div className="flex flex-col h-screen fixed">
				<Header />
				<div className="grid md:grid-cols-6 flex-grow">
					<Aside />
					<Content>{children}</Content>
				</div>
			</div>
		</>
	);
}
