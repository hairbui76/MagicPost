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

export default async function Home() {
	let data = await fetch("http://localhost:3000/api");
	data = await data.json();
	console.log(data);
	return <h1>Hello</h1>;
}
