import { MyContent } from "@/components";
import { AppContextProvider } from "@/contexts/AppContext";
import { Metadata } from "next/types";
import "./globals.css";

export const metadata: Metadata = {
	title: "Magic Post",
	description: "Developed by Hai and Son Tung MTP",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning={true}>
			<body suppressHydrationWarning={true}>
				<AppContextProvider>
					<MyContent>{children}</MyContent>
				</AppContextProvider>
			</body>
		</html>
	);
}
