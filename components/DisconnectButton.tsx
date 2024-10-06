"use client";

import Image from "next/image";

import x from "@/public/red_x.svg";

interface Props {
	disconnect: () => void;
}

export const DisconnectButton: React.FC<Props> = ({ disconnect }) => {
	return (
		<button
			className="py-[14px] px-[42px] bg-white/[.05] rounded-lg font-bold text-sm flex items-center ease-in-out duration-200 hover:bg-opacity-0 hover:outline"
			onClick={disconnect}
		>
			<span className="mr-2 text-white">Disconnect</span>
			<Image src={x} alt="" />
		</button>
	);
};
