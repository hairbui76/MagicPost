import { Button, Typography } from "antd";
import Link from "next/link";

import {
	BookFilled,
	FileTextFilled,
	HomeFilled,
	LockFilled,
	QuestionCircleFilled,
	ReadFilled,
	TeamOutlined,
	YoutubeFilled,
} from "@ant-design/icons";

import AppContext, { AppContextProps } from "@/contexts/AppContext";
import React, { useContext } from "react";
import {
	AccountEditCustomIcon,
	DocumentCustomIcon,
	MusicCustomIcon,
	NewspaperCustomIcon,
	PodcastCustomIcon,
	UserCustomIcon,
} from "./icons";

type CustomButtonLinkProps = {
	label: string;
	Icon: React.ElementType;
	link: string;
};

type ButtonListProps = {
	label: string;
	key: string;
	Icon: React.ElementType;
	link: string;
};

const CustomButtonLink = ({ label, Icon, link }: CustomButtonLinkProps) => {
	const { collapsed } = useContext(AppContext) as AppContextProps;
	if (collapsed)
		return (
			<Link href={link}>
				<Button
					type="text"
					size="large"
					icon={<Icon />}
					style={{
						padding: 0,
						color: "white",
						display: "flex",
						alignItems: "center",
						opacity: "0.65",
					}}
				/>
			</Link>
		);
	return (
		<Link href={link}>
			<Button
				type="text"
				size="large"
				icon={<Icon />}
				style={{
					padding: 0,
					color: "white",
					display: "flex",
					alignItems: "center",
					opacity: "0.65",
				}}
			>
				<Typography.Text style={{ color: "white" }}>{label}</Typography.Text>
			</Button>
		</Link>
	);
};

const FORUM_BUTTONS = [
	{
		label: "Videos",
		key: "videos",
		Icon: YoutubeFilled,
		link: "/videos",
	},
	{
		label: "Articles",
		key: "articles",
		Icon: FileTextFilled,
		link: "/articles",
	},
	{
		label: "Asks",
		key: "asks",
		Icon: QuestionCircleFilled,
		link: "/asks",
	},
];

const RESOURCES_BUTTONS = [
	{
		label: "Books",
		key: "books",
		Icon: BookFilled,
		link: "/books",
	},
	{
		label: "Magazines",
		key: "magazines",
		Icon: NewspaperCustomIcon,
		link: "/magazines",
	},
	{
		label: "Podcasts",
		key: "podcasts",
		Icon: PodcastCustomIcon,
		link: "/podcasts",
	},
	{
		label: "Musics",
		key: "musics",
		Icon: MusicCustomIcon,
		link: "/musics",
	},
	{
		label: "Documents",
		key: "documents",
		Icon: DocumentCustomIcon,
		link: "/documents",
	},
];

const ACCOUNT_BUTTONS = [
	{
		label: "Profile",
		key: "profile",
		Icon: UserCustomIcon,
		link: "/profile",
	},
	{
		label: "Edit",
		key: "edit",
		Icon: AccountEditCustomIcon,
		link: "/edit",
	},
	{
		label: "Password",
		key: "password",
		Icon: LockFilled,
		link: "/password",
	},
];

const resolveLinkBtn = (
	buttonsList: Array<ButtonListProps>,
	parentLink: string
) => buttonsList.map((btn) => ({ ...btn, link: `${parentLink}${btn.link}` }));

type ButtonProps = {
	label: string;
	Icon: React.ElementType;
	link: string;
	children: {
		label: string;
		items: ButtonListProps[];
	};
};

type HomeButtonProps = ButtonProps;
type ForumButtonProps = ButtonProps;
type ResourcesButtonProps = ButtonProps;
type AccountButtonProps = ButtonProps;

const MENU_BUTTONS: {
	home: HomeButtonProps;
	forum: ForumButtonProps;
	resources: ResourcesButtonProps;
	account: AccountButtonProps;
} = {
	home: {
		label: "Home",
		Icon: HomeFilled,
		link: "/",
		children: {
			label: "CATEGORY",
			items: resolveLinkBtn(FORUM_BUTTONS, "/"),
		},
	},
	forum: {
		label: "Forum",
		Icon: TeamOutlined,
		link: "/forum",
		children: {
			label: "CATEGORY",
			items: resolveLinkBtn(FORUM_BUTTONS, "/forum"),
		},
	},
	resources: {
		label: "Resources",
		Icon: ReadFilled,
		link: "/resources",
		children: {
			label: "CATEGORY",
			items: resolveLinkBtn(RESOURCES_BUTTONS, "/resources"),
		},
	},
	account: {
		label: "Account",
		Icon: UserCustomIcon,
		link: "/account",
		children: {
			label: "ACTIONS",
			items: resolveLinkBtn(ACCOUNT_BUTTONS, "/account"),
		},
	},
};

export { CustomButtonLink, MENU_BUTTONS };
