import AppContext, { AppContextProps } from "@/contexts/AppContext";
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
		<Row
			gutter={{ xs: 8, sm: 16, md: 24 }}
			style={{ width: "100%", padding: "0 1rem" }}
		>
			<Col>
				<Button
					type="text"
					size="large"
					onClick={() => setCollapsed(!collapsed)}
				>
					{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				</Button>
			</Col>
			<Col className="flex-1">
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
						<button
							className="btn btn-outline btn-error btn-xs sm:btn-sm md:btn-md"
							onClick={() => setUser(null)}
						>
							SIGN OUT
						</button>
					</Col>
				</>
			) : (
				<>
					<Col>
						<button
							className="btn btn-active btn-primary btn-xs sm:btn-sm "
							onClick={() => setUser({ fullName: "MrYasuo" })}
						>
							Login
						</button>
					</Col>
					<Col>
						<button
							className="btn btn-outline btn-primary btn-xs sm:btn-sm "
							onClick={() => setUser({ fullName: "MrYasuo" })}
						>
							Sign Up
						</button>
					</Col>
				</>
			)}
		</Row>
	);
}

export default AppHeader;
