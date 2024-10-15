"use client";
import { useEffect, useState } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";
import PulseLogoLoader from "@/components/PulseLogo";
import { useSDK } from "@metamask/sdk-react";
import { getLeaderboard } from "@/components/InviteSection/getCode";

interface Item {
  place: number;
  address: string;
  boost: string;
  level: number;
  points: number;
  id: number;
  lastAccess: string;
  hasStrike: boolean;
  createdAt: string;
  updatedAt: string;
  completedQuests: any;
  connectionLogs: any;
  canMint: boolean;
  monthPoints: number;
  weekPoints: number;
  totalPoints: number;
  bonusRate: number;
  regPoints: number;
  referral: string;
  strikeCount: number;
  charLvl: number;
}

interface Props {
  user: Item;
}

interface LeaderboardItem {
  id: number;
  address: string;
  lastAccess: string;
  hasStrike: boolean;
  createdAt: string;
  updatedAt: string;
  completedQuests: any;
  connectionLogs: any;
  canMint: boolean;
  monthPoints: number;
  weekPoints: number;
  totalPoints: number;
  bonusRate: number;
  regPoints: number;
  referral: string;
  strikeCount: number;
  charLvl: number;
}

interface Leaderboard {
  data: LeaderboardItem;
}

export default function Leaderboard() {
  const [data, setData] = useState<any>(null);
  const { isMobile, windowSize } = useWindowSize();
  const [user, setUser] = useState<Item>();
  const { account } = useSDK();

  useEffect(() => {
    const doAsync = async () => {
      console.log("RRR");
      const res = await getLeaderboard();
      setData(res?.filter((item: Item) => item.address !== account));
      const user = res?.find((item: Item) => item.address === account);
      user && setUser(user);
      console.log("user", user);
    };

    doAsync();
  }, [account]);

  if (!windowSize?.width) return <PulseLogoLoader />;

  return (
    <main
      className={`flex flex-col w-full h-full${isMobile ? " mt-28" : ""}`}
      style={{ padding: isMobile ? "0% 0%" : "0% 10%" }}
    >
      <br />
      <br />
      <br />
      <div
        className={`relative flex flex-col mx-${
          isMobile ? 5 : 48
        } bg-[#171225] p-6 rounded-2xl`}
      >
        {data?.length > 10 && (
          <button className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 font-bold text-sm text-center py-[14px] px-[42px] bg-[#191728] rounded-lg text-white">
            Load more
          </button>
        )}
        <div className="flex justify-between text-[10px] text-white/[.58] mb-5">
          <p className="w-1/5 text-left">Place</p>
          <p className="w-1/5 text-center">User</p>
          <p className="w-1/5 text-center">Boost</p>
          <p className="w-1/5 text-center">Level</p>
          <p className="w-1/5 text-right">Points</p>
        </div>
        <div className="flex flex-col space-y-2 mb-5">
          {user && (
            <div
              key={`user-leaderboard`}
              className={
                "flex justify-between text-white" +
                (isMobile ? " text-[12px]" : "")
              }
            >
              <p className="w-1/5 text-left pl-2">{user.place}</p>
              <p className="w-1/5 text-center h-12">
                <span className="w-1/5 text-center h-12">
                  {user.address.slice(0, isMobile ? 4 : 7) +
                    "..." +
                    user.address.slice(isMobile ? -3 : -4)}
                </span>
                <span
                  style={{
                    maxWidth: isMobile ? "35px" : 60,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className="flex my-2 py-px px-2 rounded-[30px] bg-[#BCFE1E29]/[.16] text-[#BCFE1E] mx-auto"
                >
                  you
                </span>
              </p>
              <p className="w-1/5 text-center">{user.bonusRate + "x"}</p>
              <p className="w-1/5 text-center">{user.level || 0}</p>
              <p className="w-1/5 text-end pr-2">{user.totalPoints}</p>
            </div>
          )}
        </div>
        <div className="flex flex-col space-y-2 mb-5">
          {data &&
            data?.map((item: any, index: number) => (
              <div
                key={`test_${index}`}
                className={
                  "flex justify-between text-white" +
                  (isMobile ? " text-[12px]" : "")
                }
              >
                <p className="w-1/5 text-left pl-2">{item.place}</p>
                <p className="w-1/5 text-center h-12">
                  {item.address.slice(0, isMobile ? 4 : 7) +
                    "..." +
                    item.address.slice(isMobile ? -3 : -4)}
                </p>
                <p className="w-1/5 text-center">{item.bonusRate + "x"}</p>
                <p className="w-1/5 text-center">{item.level || 0}</p>
                <p className="w-1/5 text-end pr-2">{item.totalPoints}</p>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
