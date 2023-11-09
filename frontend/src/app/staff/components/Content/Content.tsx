"use client";
import {
	Footer as AppFooter,
	Header as AppHeader,
	Sider as AppSider,
} from "..";
import { ConfigProvider, Layout } from "antd";

const { Header, Footer, Content } = Layout;

const MyContent = ({ children }: { children: React.ReactNode }) => {
	return (
		<ConfigProvider
			theme={{
				components: {
					Layout: {
						headerBg: "#ffffff",
						headerPadding: 0,
					},
				},
			}}
		>
			<Layout>
				<AppSider />
				<Layout>
					<Header>
						<AppHeader />
					</Header>

					<Content
						style={{
							margin: "24px 16px",
							padding: 24,
							minHeight: 800,
							background: "#ffffff",
						}}
					>
						{children}
					</Content>

					<Footer>
						<AppFooter />
					</Footer>
				</Layout>
			</Layout>
		</ConfigProvider>
	);
};

export default MyContent;
