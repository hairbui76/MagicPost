import AppContext, { AppContextProps } from "@/contexts/AppContext";
import {
	ApartmentOutlined,
	ExportOutlined,
	FileDoneOutlined,
	FormOutlined,
	ImportOutlined,
	LineChartOutlined,
	TeamOutlined,
} from "@ant-design/icons";
import {
	faBoxArchive,
	faBuilding,
	faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout, Menu } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

const { Sider } = Layout;

const getItem = (
	label: React.ReactNode | string,
	key: React.Key,
	children?: Array<{
		label: React.ReactNode | string;
		key: React.Key;
		icon?: React.ReactNode | null;
	}>
) => {
	return {
		label,
		key,
		children,
	};
};

const getSubMenu = (
	label: React.ReactNode | string,
	key: React.Key,
	icon: React.ReactNode,
	children: Array<{
		label: React.ReactNode | string;
		key: React.Key;
		icon?: React.ReactNode | null;
	}>
) => {
	return {
		label,
		key,
		icon,
		children,
	};
};

const getLink = (
	label: string,
	path: string,
	icon: React.ReactNode | null = null
) => (
	<Link className="flex gap-2" href={path}>
		{icon}
		{label}
	</Link>
);

const AppSider = () => {
	const { collapsed, menuKey, setMenuKey } = useContext(
		AppContext
	) as AppContextProps;
	const items = [
		getSubMenu("Orders", "orders", <FontAwesomeIcon icon={faBoxArchive} />, [
			getItem(
				getLink("Create", "/staff/orders/create", <FormOutlined />),
				"create"
			),
			getItem(
				getLink("Status", "/staff/orders/status", <FileDoneOutlined />),
				"status"
			),
			getItem(
				getLink(
					"Statistics",
					"/staff/orders/statistics",
					<LineChartOutlined />
				),
				"statistics"
			),
		]),
		getSubMenu(
			"Deliveries",
			"deliveries",
			<FontAwesomeIcon icon={faTruckFast} />,
			[
				getItem(
					getLink("Incoming", "/staff/deliveries/incoming", <ImportOutlined />),
					"incoming"
				),
				getItem(
					getLink("Outgoing", "/staff/deliveries/outgoing", <ExportOutlined />),
					"outgoing"
				),
			]
		),
		getSubMenu(
			"Management",
			"management",
			<FontAwesomeIcon icon={faBuilding} />,
			[
				getItem(
					getLink("Staffs", "/staff/management/staffs", <TeamOutlined />),
					"staffs"
				),
				getItem(
					getLink("Points", "/staff/management/points", <ApartmentOutlined />),
					"points"
				),
			]
		),
	];
	return (
		<Sider collapsible trigger={null} collapsed={collapsed} breakpoint="lg">
			{collapsed ? (
				<Image
					src="/logo_no_char.png"
					alt=""
					width="0"
					height={50}
					className="w-full h-auto p-3 pt-6"
					quality={100}
				/>
			) : (
				<Image
					src="/logo_white_char.png"
					alt=""
					width="0"
					height={50}
					className="w-full h-auto p-6"
					quality={100}
				/>
			)}
			<Menu
				theme="dark"
				defaultSelectedKeys={[menuKey]}
				// @ts-ignore
				onClick={(e) => setMenuKey(e.key)}
				items={items}
				inlineCollapsed={collapsed}
				mode="inline"
			/>
		</Sider>
	);
};

export default AppSider;
