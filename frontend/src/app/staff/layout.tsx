import { Aside, Content, Header } from "./components";

export default function Layout({
	children,
}: {
	children: Array<React.ReactNode>;
}) {
	return (
		<>
			<div className="h-screen">
				<Header />
				<div className="flex h-screen pt-16">
					<Aside />
					<Content>{children}</Content>
				</div>
			</div>
		</>
	);
}
