import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

export default function Layout({
	children,
}: {
	children: Array<React.ReactNode>;
}) {
	return (
		<div className="min-h-screen flex flex-col">
			<Header />
			<Content>{children}</Content>
			<Footer />
		</div>
	);
}
