import { AppContextProvider } from "@/contexts/AppContext";
import { Metadata } from "next/types";
import "./globals.css";

export const metadata: Metadata = {
	title: "Magic Post",
	description: "Developed by Hai and Son Tung MTP",
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning={true} data-theme="dracula">
			<body suppressHydrationWarning={true}>
				<AppContextProvider>{children}</AppContextProvider>
			</body>
		</html>
	);
}
