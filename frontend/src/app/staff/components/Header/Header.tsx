import { AppContext } from "@/contexts";
import { AppContextProps } from "@/contexts/AppContext";
import {
	BellFilled,
	MailFilled,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	SearchOutlined,
} from "@ant-design/icons";
import { Button, Col, Input, Row, Typography } from "antd";
import { useContext } from "react";

function AppHeader() {
	const { collapsed, setCollapsed, user, setUser } = useContext(
		AppContext
	) as AppContextProps;
	return (
		<Row gutter={16} style={{ width: "100%", padding: "0 1rem" }}>
			<Col>
				<Button
					type="text"
					size="large"
					onClick={() => setCollapsed(!collapsed)}
				>
					{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				</Button>
			</Col>
			<Col style={{ flex: 1 }}>
				<Input
					size="large"
					placeholder="Search for anything..."
					prefix={<SearchOutlined className="search-icon" />}
				/>
			</Col>
			<Col>
				<Button type="text">
					<MailFilled />
				</Button>
			</Col>
			<Col>
				<Button type="text">
					<BellFilled />
				</Button>
			</Col>
			{user ? (
				<>
					<Col style={{ display: "flex", alignItems: "center" }}>
						<Typography.Title level={5} style={{ margin: 0 }}>
							Hello, {user.fullName}
						</Typography.Title>
					</Col>
					<Col>
						<Button
							className="button"
							type="primary"
							size="large"
							danger
							onClick={() => setUser(null)}
						>
							Logout
						</Button>
					</Col>
				</>
			) : (
				<>
					<Col>
						<Button
							className="button"
							type="primary"
							size="large"
							onClick={() => setUser({ fullName: "MrYasuo" })}
						>
							Login
						</Button>
					</Col>
					<Col>
						<Button
							className="button"
							type="primary"
							size="large"
							onClick={() => setUser({ fullName: "MrYasuo" })}
						>
							Sign Up
						</Button>
					</Col>
				</>
			)}
		</Row>
	);
}

export default AppHeader;
