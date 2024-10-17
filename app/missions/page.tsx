"use client";

import AllTasks from "@/components/missions/all";
import Ambassadors from "@/components/missions/ambassadors";
import DailyTasks from "@/components/missions/dailyTasks";
import GettingStarted from "@/components/missions/gettingStarted";
import SocialChallenges from "@/components/missions/socialChallenges";
import { useEffect, useState } from "react";
import bg from "@/public/missions.png";

import tstreak from "@/public/3streak.svg";
import wstreak from "@/public/7streak.svg";
import twstreak from "@/public/14streak.svg";
import mstreak from "@/public/monthStreak.svg";
import sphere from "@/public/scrollSphere.svg";
import Image from "next/image";

import { LoadingTasks } from "@/components/missions/loading";
import { useWindowSize } from "@/hooks/useWindowSize";
import PulseLogoLoader from "@/components/PulseLogo";
import { useUser } from "@/context/UserContext";

export const getPos = (value: number) => {
  const marks = [
    { value: 3, position: 10 },
    { value: 7, position: 33 },
    { value: 14, position: 66 },
    { value: 31, position: 99 },
  ];

  // if (value <= marks[0].value) return marks[0].position;

  if (value >= marks[marks.length - 1].value)
    return marks[marks.length - 1].position;

  for (let i = 0; i < marks.length - 1; i++) {
    const currentMark = marks[i];
    const nextMark = marks[i + 1];

    if (value >= currentMark.value && value <= nextMark.value) {
      const ratio =
        (value - currentMark.value) / (nextMark.value - currentMark.value);
      return (
        currentMark.position +
        ratio * (nextMark.position - currentMark.position)
      ).toFixed(2);
    }
  }
  return 0;
};

export default function MissionsHub() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [streak, setStreak] = useState(0);
  const [streakProgress, setStreakProgress] = useState<string>("3%");
  const [loading, setLoading] = useState(true);
  const { isMobile, windowSize } = useWindowSize();
  const { user } = useUser()


  useEffect(() => {
    if (user) {
      setStreak(user.strikeCount);
    } else {
      setStreak(0)
    }
  }, [user])

  useEffect(() => {
    // setStreakProgress(`${getPos(streak)}%`);
    const result = getPos(streak);
    if (result) {
      console.log("getpos:", result);
      setStreakProgress(`${result ?? 3}%`);
    }
  }, [streak]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 4);
  }, []);

  if (loading) {
    return null;
  }

  const tabStyle = `py-${isMobile ? 1 : 3}  text-[${isMobile ? 11 : 16
    }px] rounded-[27px] px-${isMobile ? 2 : 4}`;

  const isTabActive = (tab: string) => {
    return activeTab == tab
      ? " text-white border-[0.5px] bg-[#6C6C6C]"
      : " bg-[#252335]";
  };

  const textSm = isMobile ? " text-xs" : " text-sm";
  const replaceValue = (mob: string | number, desc: string | number) => {
    return isMobile ? mob : desc;
  };

  if (!windowSize?.width) return <PulseLogoLoader />;

  return (
    <main
      className={"flex flex-col w-full" + (isMobile ? " mt-28" : "") + (isMobile ? " pb-[150px]" : "")}
      style={isMobile ? undefined : { padding: "0% 10%" }}
    >
      <div
        className={`flex w-full mt-12 mb-9`}
        style={{
          justifyContent: isMobile ? "center" : "start",
          position: isMobile ? "sticky" : "relative",
          top: 0,
        }}
      >
        <div
          className={`flex text-[#595959] gap-[${isMobile ? 10 : 20
            }px] mb-8 mx-11`}
        >
          <button
            className={tabStyle + isTabActive("all")}
            onClick={() => setActiveTab("all")}
          >
            All
          </button>
          <button
            className={tabStyle + isTabActive("getting_started")}
            onClick={() => setActiveTab("getting_started")}
          >
            Getting Started
          </button>
          <button
            className={tabStyle + isTabActive("daily_tasks")}
            onClick={() => setActiveTab("daily_tasks")}
          >
            Daily Tasks
          </button>
          <button
            className={tabStyle + isTabActive("social_challenges")}
            onClick={() => setActiveTab("social_challenges")}
          >
            Social Challenges
          </button>
          <button
            className={tabStyle + isTabActive("ambassadors")}
            onClick={() => setActiveTab("ambassadors")}
          >
            Ambassadors
          </button>
        </div>

        {!isMobile && (
          <div className="flex h-fit text-xs text-white ml-auto mr-8">
            <span
              className={`py-2 px-${replaceValue(
                1,
                2
              )} group bg-[#252335] rounded-[27px] relative`}
            >
              <span
                className={`text-[10px] font-bold bg-[#252335] w-max py-2 px-[${replaceValue(
                  5,
                  10
                )}px] rounded-[27px] absolute bottom-0 -left-1/2 transform -translate-x-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                style={{ pointerEvents: "none" }}
              >
                Get streaks by daily wallet check-ins or completing specially
                marked tasks. Receive boosts and special prizes!
              </span>
              ?
            </span>
          </div>
        )}
      </div>
      <div
        style={isMobile ? { marginRight: "5%" } : {}}
        className={`flex flex-col px-${replaceValue(6, 24)} mt-8`}
      >
        <div
          className={`flex relative bg-[#5F5F5F] rounded-full h-px mx-${replaceValue(
            5,
            12
          )} mb-4`}
        >
          <div
            className="bg-[#BCFE1E] h-0.5 rounded-full"
            style={{ width: `${streakProgress}` }}
          >
            <Image
              src={sphere}
              alt=""
              width={28}
              height={28}
              style={{ left: streakProgress }}
              className={`absolute left-[${streakProgress}] top-0 transform -translate-y-1/2 -translate-x-1/2`}
            />
          </div>

          <div
            className={"absolute font-bold text-white top-4 opacity-0" + textSm}
          >
            nostreak
          </div>

          <Image
            src={tstreak}
            alt=""
            className="absolute -top-10 left-[10%] transform -translate-x-1/2"
          />
          <div
            className={
              "absolute font-bold text-white top-4 left-[10%] transform -translate-x-1/2" +
              textSm
            }
            style={
              isMobile
                ? {
                  display: "flex",
                  maxWidth: 60,
                  justifyContent: "center",
                  textAlign: "center",
                }
                : {}
            }
          >
            3-day streak
          </div>

          <Image
            src={wstreak}
            alt=""
            className="absolute -top-10 left-[33%] transform -translate-x-1/2"
          />
          <div
            className={
              "absolute font-bold text-white top-4 left-[33%] transform -translate-x-1/2" +
              textSm
            }
            style={isMobile ? { maxWidth: 60 } : {}}
          >
            7-day streak
          </div>

          <Image
            src={twstreak}
            alt=""
            className="absolute -top-10 left-[66%] transform -translate-x-1/2"
          />
          <div
            className={
              "absolute font-bold text-white top-4 left-[66%] transform -translate-x-1/2" +
              textSm
            }
            style={isMobile ? { maxWidth: 60 } : {}}
          >
            2-week streak
          </div>

          <Image
            src={mstreak}
            alt=""
            className="absolute -top-10 left-[100%] transform -translate-x-1/2"
          />
          <div
            className={
              "absolute font-bold text-white top-4 left-[100%] transform -translate-x-1/2 w-40" +
              textSm
            }
            style={isMobile ? { maxWidth: 60 } : {}}
          >
            1-month streak
          </div>
        </div>

        <div
          className="flex text-white text-[13px] mb-[30px] mx-auto mt-12"
          style={{
            padding: 10,
            borderRadius: 10,
            // backgroundColor: "#252335",
            border: "1px solid #BCFE1E",
          }}
        >
          <p className="mr-2">Current Streak: </p>
          <p className="font-bold">{streak}-day</p>
        </div>
      </div>
      <div className={`flex justify-center mx-${replaceValue(5, 18)}`}>
        <AllTasks category={activeTab} />
      </div>
    </main>
  );
}

{
  /*
                    {activeTab === 'all' ? <AllTasks /> : null}
                {activeTab === 'getting_started' ? <GettingStarted /> : null}
                {activeTab === 'daily_tasks' ? <DailyTasks /> : null}
                {activeTab === 'social_challenges' ? (
                    <SocialChallenges />
                ) : null}
                {activeTab === 'ambassadors' ? <Ambassadors /> : null}    
*/
}
