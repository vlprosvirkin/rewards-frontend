"use client";

export default function LeaderBoardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
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
