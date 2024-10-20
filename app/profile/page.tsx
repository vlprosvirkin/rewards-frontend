"use client";

import { ProfileGeneral } from "@/components";
import { LinkedAccounts } from "@/components/LinkedAccounts";
import { useState } from "react";
import tstreak from "@/public/3streak.svg";
import wstreak from "@/public/7streak.svg";
import twstreak from "@/public/14streak.svg";
import mstreak from "@/public/monthStreak.svg";
import sphere from "@/public/scrollSphere.svg";

import Image from "next/image";
import { useWindowSize } from "@/hooks/useWindowSize";
import PulseLogoLoader from "@/components/PulseLogo";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("general");
  const { isMobile, windowSize } = useWindowSize();
  if (!windowSize?.width) return <PulseLogoLoader />;

  return (
    <main
      className={
        "flex flex-col min-w-full h-full text-white" + isMobile
          ? ""
          : " pt-6 px-6"
      }
      style={{
        maxWidth: "100%",
        padding: isMobile ? "0% 5%" : "50px 10%",
        margin: isMobile ? "140px auto" : "0px auto",
      }}
    >
      {" "}
      {isMobile && (
        <>
          <div
            className="flex w-full justify-evenly"
            style={{
              color: "white",
              position: "relative",
              // top: 168,
              // zIndex: 100,
              zIndex: 0,
            }}
          >
            <span
              onClick={() => setActiveTab("general")}
              style={{
                cursor: "pointer",
                opacity: activeTab !== "general" ? 0.5 : 1,
                position: "relative",
                zIndex: 100,
                borderBottom:
                  activeTab === "general" ? "2px solid #BCFE1E" : "none",
                padding: "10px",
              }}
            >
              General
            </span>
            <span
              onClick={() => setActiveTab("linked_accounts")}
              style={{
                cursor: "pointer",
                position: "relative",
                zIndex: 100,
                opacity: activeTab !== "linked_accounts" ? 0.8 : 1,
                borderBottom:
                  activeTab === "linked_accounts"
                    ? "2px solid #BCFE1E"
                    : "none",
                padding: "10px",
              }}
            >
              Linked Accounts
            </span>
          </div>
          <br />
          <br />
        </>
      )}
      <div className={`flex flex-col ${isMobile ? "" : "h-full"} ${isMobile ? "pb-[150px]" : ""}`}>
        {/*
				<div className="flex border-b border-white/[.5] w-fit mx-auto gap-[18px] font-bold mb-8">
					<button
						className={`ml-auto text-white/[.5] ${
							activeTab == "general"
								? "border-b border-[#BCFE1E] text-white/[1]"
								: null
						}`}
						onClick={() => setActiveTab("general")}
					>
						General
					</button>
					<button
						className={`mr-auto text-white/[.5] ${
							activeTab == "linked_accounts"
								? "border-b border-[#BCFE1E] text-white/[1]"
								: null
						}`}
						onClick={() => setActiveTab("linked_accounts")}
					>
						Linked Accounts
					</button>
				</div>
				*/}

        {activeTab === "general" && (
          <ProfileGeneral setActiveTab={setActiveTab} />
        )}
        {activeTab === "linked_accounts" && (
          <LinkedAccounts setActiveTab={setActiveTab} />
        )}
      </div>
    </main>
  );
}
