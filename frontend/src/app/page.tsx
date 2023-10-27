import { Sider as AppSider } from "@/components";
import { Layout } from "antd";

const { Header, Content } = Layout;

const MyContent = () => {
	return (
		<Layout>
			<AppSider />
			<Layout>
				<Content
					style={{
						margin: "24px 16px",
						padding: 24,
						minHeight: 800,
						background: "#ffffff",
					}}
				></Content>
			</Layout>
		</Layout>
	);
};

export default function Home() {
	return <h1>Hello</h1>;
}
