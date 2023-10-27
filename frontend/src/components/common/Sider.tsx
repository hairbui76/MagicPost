import * as btn from "@/configs/buttons";
import { AppContext } from "@/contexts";
import { AppContextProps } from "@/contexts/AppContext";
import { Divider, Layout, Menu } from "antd";
import { useContext } from "react";

const { Sider } = Layout;

const getItem = (
	label: React.ReactNode | string,
	key: React.Key,
	Icon?: React.ElementType | null,
	type?: string,
	children?: Array<{ label: string; key: string; icon?: React.ReactNode }>
) => {
	if (Icon)
		return {
			label,
			key,
			icon: <Icon />,
			type,
			children,
		};
	return {
		label,
		key,
		type,
		children,
	};
};

const RenderIcon = (Icon: React.ElementType) => <Icon />;

const AppSider = () => {
	const { collapsed, menuKey, setMenuKey } = useContext(
		AppContext
	) as AppContextProps;
	const menuItems = [
		getItem("Home", "home", btn.MENU_BUTTONS["home"].Icon),
		getItem(
			collapsed ? <Divider style={{ margin: "5px 0" }} /> : "MENU",
			"menu",
			null,
			"group",
			Object.entries(btn.MENU_BUTTONS)
				.filter(([key, _value]) => key !== "home")
				.map(([key, value]) => ({
					label: value.label,
					icon: RenderIcon(value.Icon),
					key,
				}))
		),
	];
	const categoryItems = [
		getItem(
			collapsed ? (
				<Divider style={{ margin: 0 }} />
			) : (
				btn.MENU_BUTTONS[menuKey]["children"].label
			),
			"category",
			null,
			"group",
			btn.MENU_BUTTONS[menuKey]["children"]?.items.map(({ key, ...args }) => ({
				label: args.label,
				icon: RenderIcon(args.Icon),
				key,
			}))
		),
	];
	return (
		<Sider
			collapsible
			trigger={null}
			collapsed={collapsed}
			className="custom-sider"
		>
			<Menu
				theme="dark"
				defaultSelectedKeys={[menuKey]}
				// @ts-ignore
				onClick={(e) => setMenuKey(e.key)}
				style={{ padding: "1rem", paddingBottom: 0 }}
				items={menuItems}
			/>
			<Menu theme="dark" style={{ padding: "0 1rem" }} items={categoryItems} />
		</Sider>
	);
};

export default AppSider;
