import Content from "./components/Content/Content";
import Header from "./components/Header/Header";

export default function Layout({
	children,
}: {
	children: Array<React.ReactNode>;
}) {
	return (
		<div className="h-screen flex flex-col">
			<Header />
			<Content>{children}</Content>
		</div>
	);
}
