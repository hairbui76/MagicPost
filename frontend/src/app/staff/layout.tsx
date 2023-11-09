import { Content } from "./components";

export default function Layout({ children }: { children: React.ReactNode }) {
	return <Content>{children}</Content>;
}
