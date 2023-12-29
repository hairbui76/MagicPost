"use client";

import { AppContext } from "@/contexts";
import { AppContextProps } from "@/contexts/AppContext";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { getUser } from ".";

function Error({ message }: { message: string }) {
	return (
		<div role="alert" className="alert alert-error">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="stroke-current shrink-0 h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			<span>{message}</span>
		</div>
	);
}

function withAuth(
	Component: (props: any) => JSX.Element,
	shouldOverride: boolean = false
) {
	function CheckAuthComponent(props: any) {
		const { setUser } = useContext(AppContext) as AppContextProps;
		const router = useRouter();
		const { isPending, error, data } = useQuery({
			queryKey: ["data"],
			queryFn: getUser,
		});
		const pathname = usePathname();

		useEffect(() => {
			if (!isPending && (!data || !data.user)) {
				toast.error("You must login first before performing this action");
				router.push("/login");
			} else if (data && data.user) {
				setUser(data.user);
				const role = data.user.role;
				if (
					(pathname.includes("staffs") && role.endsWith("STAFF")) ||
					(pathname.includes("points") && role !== "COMPANY_ADMINISTRATOR")
				) {
					toast.warning(
						"You do not have the permission for this functionality!"
					);
					router.push("/staff");
				} else {
					toast.success(data.message);
				}
			}
		}, [isPending, data, router, pathname, setUser]);

		if (isPending) return <Skeleton active />;

		if (error)
			return <Error message={`An error has occurred: ${error.message}`} />;

		if (!data || !data.user) return <></>;

		return <Component {...props} />;
	}
	function AuthComponent({ withAuth, ...props }: { withAuth: boolean }) {
		const { user } = useContext(AppContext) as AppContextProps;
		if (shouldOverride && withAuth) return <Component {...props} />;
		if (user) return <Component {...props} />;
		return <CheckAuthComponent {...props} />;
	}
	// If don't have props here, the Component passed in will not have props too
	return function AuthProvider(props: any) {
		return <AuthComponent {...props} withAuth={true} />;
	};
}

export default withAuth;
