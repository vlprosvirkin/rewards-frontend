import logo from "@/public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ConnectWalletButton from "@/components/connectWalletButton";
import a from "@/public/characters/a.svg";
import { useEffect, useState } from "react";
import { useSDK } from "@metamask/sdk-react";
import { getCode } from "../InviteSection/getCode";

export const DesktopHeader: React.FC = () => {
  const [points, setPoints] = useState<any>();
  const { account } = useSDK();
  const doAsync = async () => {
    if (!account) return;
    const data = await getCode(account);
    console.log(data);
    setPoints(Number(data?.totalPoints));
  };

  useEffect(() => {
    doAsync();
  }, [account]);

  const currentPath = usePathname();

  return (
    <header className="flex relative py-5 px-7 items-center z-200">
      <Link href="/" className="mr-auto">
        <Image src={logo} alt="Aspis Logo" />
      </Link>

      <div
        className="flex gap-[52px] mr-auto text-center items-center"
        style={{ position: "relative", zIndex: 200 }}
      >
        <Link
          href="/"
          className={`${
            currentPath == "/" ? "text-white" : "text-[#ADADAD]"
          } text-sm flex items-center`}
        >
          Story
        </Link>
        <Link
          href="/missions"
          className={`${
            currentPath == "/missions" ? "text-white" : "text-[#ADADAD]"
          } text-sm flex items-center`}
        >
          Missions Hub
        </Link>
        <Link
          href="/leaderboard"
          className={`${
            currentPath == "/leaderboard" ? "text-white" : "text-[#ADADAD]"
          } text-sm flex items-center`}
        >
          Leaderboard
        </Link>
        <Link
          href="/characters"
          className={`${
            currentPath == "/characters" ? "text-white" : "text-[#ADADAD]"
          } text-sm flex items-center`}
        >
          Characters
        </Link>
        <Link
          href="https://app.aspis.finance/"
          target="_blank"
          className={`${
            currentPath == "/app" ? "text-white" : "text-[#ADADAD]"
          } text-sm flex items-center`}
        >
          App
        </Link>
        <Link
          href="/profile"
          className={`${
            currentPath == "/profile" ? "text-white" : "text-[#ADADAD]"
          } text-sm flex items-center`}
        >
          Profile
        </Link>
      </div>

      {
        <div className="flex text-white">
          <Image src={a} alt="" className="my-auto" />
          <span className="ml-1 my-auto mr-6">{points ?? "-"}</span>
        </div>
      }
      <ConnectWalletButton />
    </header>
  );
};
