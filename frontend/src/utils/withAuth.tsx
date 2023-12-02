"use client";
import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from "@tanstack/react-query";
import { getUser } from ".";

const queryClient = new QueryClient();

function withAuth(Component: (props: any) => JSX.Element) {
	function AuthComponent(props: any) {
		const { isPending, error, data } = useQuery({
			queryKey: ["data"],
			queryFn: getUser,
		});

		if (isPending) return "Loading...";

		if (error) return "An error has occurred: " + error.message;

		console.log(data);

		return <Component {...props} />;
	}
	return function AuthProvider() {
		return (
			<QueryClientProvider client={queryClient}>
				<AuthComponent />
			</QueryClientProvider>
		);
	};
}

export default withAuth;
