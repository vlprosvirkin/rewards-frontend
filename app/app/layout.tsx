import { Metadata } from "next";

export const metadata: Metadata = {
	title: "App",
};

export default function LeaderBoardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
