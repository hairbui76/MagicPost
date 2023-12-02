import { AppContextProvider } from "@/contexts/AppContext";
import withAuth from "@/utils/withAuth";
import { Metadata } from "next/types";
import "./globals.css";

export const metadata: Metadata = {
	title: "Magic Post",
	description: "Developed by Hai and Son Tung MTP",
};

function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning={true} data-theme="dracula">
			<body suppressHydrationWarning={true}>
				<AppContextProvider>{children}</AppContextProvider>
			</body>
		</html>
	);
}

export default withAuth(Layout);
