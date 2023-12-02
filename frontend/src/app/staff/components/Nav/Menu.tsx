import SubMenu from "./SubMenu";
import MenuItem from "./MenuItem";
import {
	faFolderPlus,
	faListCheck,
	faLineChart,
	faArrowRightFromBracket,
	faArrowRightToBracket,
	faUserGroup,
	faBuilding,
	IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

export default function Menu() {
	const getMenuItemProps = (
		label: string,
		path: string,
		icon: IconDefinition | null = null
	): { label: string; path: string; icon: IconDefinition | null } => {
		return { label, path, icon };
	};
	const orderItems = [
		getMenuItemProps("Create", "/staff/orders/create", faFolderPlus),
		getMenuItemProps("Status", "/staff/orders/status", faListCheck),
		getMenuItemProps("Statistics", "/staff/orders/statistics", faLineChart),
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
	].map((props) => <MenuItem {...props} key={props.path} />);
	const managementItems = [
		getMenuItemProps("Staffs", "/staff/management/staffs", faUserGroup),
		getMenuItemProps("Points", "/staff/management/points", faBuilding),
	].map((props) => <MenuItem {...props} key={props.path} />);

	return (
		<ul className="menu w-full rounded-box">
			<MenuItem label="Home" path="/staff" />
			<SubMenu label="Orders">{orderItems}</SubMenu>
			<SubMenu label="Deliveries">{deliveryItems}</SubMenu>
			<SubMenu label="Management">{managementItems}</SubMenu>
		</ul>
	);
}
