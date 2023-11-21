export default function SubMenu({
	label,
	children,
}: {
	label: string;
	children: Array<React.ReactNode>;
}) {
	return (
		<li>
			<details open>
				<summary>{label}</summary>
				<ul>{children}</ul>
			</details>
		</li>
	);
}
