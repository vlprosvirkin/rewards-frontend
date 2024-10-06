"use client";

export default function LeaderBoardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex h-full">
			<style>
				{`
					body {
						background: #0c0a1c;
					}
				`}
			</style>
			{children}
		</div>
	);
}
