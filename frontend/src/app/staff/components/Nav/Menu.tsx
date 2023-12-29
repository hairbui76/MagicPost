"use client";
import SubMenu from "./SubMenu";
import MenuItem from "./MenuItem";
import {
	faFolderPlus,
	faListCheck,
	faArrowRightFromBracket,
	faArrowRightToBracket,
	faUserGroup,
	faBuilding,
	IconDefinition,
	faClockRotateLeft,
	faHourglassStart,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { AppContext } from "@/contexts";
import { AppContextProps } from "@/contexts/AppContext";

export default function Menu() {
	const getMenuItemProps = (
		label: string,
		path: string,
		icon: IconDefinition | null = null
	): { label: string; path: string; icon: IconDefinition | null } => {
		return { label, path, icon };
	};
	const { user } = useContext(AppContext) as AppContextProps;
	const orderItems = [
		getMenuItemProps("Create", "/staff/orders/create", faFolderPlus),
		getMenuItemProps("Status", "/staff/orders/status", faListCheck),
		getMenuItemProps("Waiting", "/staff/orders/waiting", faHourglassStart),
	].map((props) => <MenuItem {...props} key={props.path} />);

	const deliveryItems = [
		getMenuItemProps(
			"Incoming",
			"/staff/deliveries/incoming",
			faArrowRightToBracket
		),
		getMenuItemProps(
			"Outgoing",
			"/staff/deliveries/outgoing",
			faArrowRightFromBracket
		),
		getMenuItemProps("History", "/staff/deliveries/history", faClockRotateLeft),
	].map((props) => <MenuItem {...props} key={props.path} />);
	const managementItems = [
		getMenuItemProps("Staffs", "/staff/management/staffs", faUserGroup),
		getMenuItemProps("Points", "/staff/management/points", faBuilding),
	].map((props) => <MenuItem {...props} key={props.path} />);

	return user ? (
		<ul className="menu w-full rounded-box">
			<MenuItem label="Dashboard" path="/staff" />
			<SubMenu label="Orders">{orderItems}</SubMenu>
			<SubMenu label="Deliveries">{deliveryItems}</SubMenu>
			{!user.role.endsWith("STAFF") ? (
				<SubMenu label="Management">
					{user.role === "COMPANY_ADMINISTRATOR"
						? managementItems
						: managementItems.slice(0, 1)}
				</SubMenu>
			) : null}
		</ul>
	) : null;
}
