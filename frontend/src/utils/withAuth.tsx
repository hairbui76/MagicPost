"use client";
import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from "@tanstack/react-query";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { getUser } from ".";

const queryClient = new QueryClient();

// Receive a component as parameter
function withAuth(Component: (props: any) => JSX.Element) {
	function AuthComponent(props: any) {
		const router = useRouter();
		const { isPending, error, data } = useQuery({
			queryKey: ["data"],
			queryFn: getUser,
		});
		const pathname = usePathname();

		useEffect(() => {
			if (!isPending && (!data || !data.user)) {
				router.push("/login");
				return;
			}
		}, [isPending, data, router, pathname]);

		if (isPending) return <div>Loading...</div>;

		if (error) return <div>{"An error has occurred: " + error.message}</div>;

		if (!data || !data.user) return <></>;

		return <Component {...props} />;
	}
	// If don't have props here, the Component passed in will not have props too
	return function AuthProvider(props: any) {
		return (
			<QueryClientProvider client={queryClient}>
				<AuthComponent {...props} />
			</QueryClientProvider>
		);
	};
}

export default withAuth;
