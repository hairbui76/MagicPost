import AppContext, { AppContextProps } from "@/contexts/AppContext";
import { Layout, Menu } from "antd";
import { useContext } from "react";
import {
	FormOutlined,
	LineChartOutlined,
	FileDoneOutlined,
	ImportOutlined,
	ExportOutlined,
	TeamOutlined,
	ApartmentOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTruckFast,
	faBoxArchive,
	faBuilding,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

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
					src="/logo_magicpost_trans.png"
					alt=""
					width="0"
					height="0"
					className="w-full h-auto p-3 pt-6"
					quality={100}
				/>
			) : (
				<Image
					src="/logo_magicpost_horizon.png"
					alt=""
					width="0"
					height="0"
					className="w-full h-auto p-6"
					quality={100}
				/>
			)}
			<Menu
				theme="dark"
				defaultSelectedKeys={[menuKey]}
				onClick={(e) => setMenuKey(e.key)}
				items={items}
				inlineCollapsed={collapsed}
				mode="inline"
			/>
		</Sider>
	);
};

export default AppSider;
