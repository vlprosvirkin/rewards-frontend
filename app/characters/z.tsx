"use client";

import A from "@/public/A_chars.svg";
import a from "@/public/characters/a.svg";
import hoplite_lvl0 from "@/public/characters/hoplite-lvl3.png";
import hoplite_lvl1 from "@/public/characters/hoplite-lvl1.png";
import hoplite_lvl2 from "@/public/characters/hoplite-lvl2.png";
import bgs from "@/public/sphere.png";

import hippeis_lvl3 from "@/public/characters/hippeis-lvl3.png";
import polemarchos_lvl3 from "@/public/characters/polemarchos-lvl3.png";
import king_lvl3 from "@/public/characters/king-lvl3.png";

import Image from "next/image";
import { useEffect, useState } from "react";

import toleft from "@/public/characters/toleft.svg";
import toright from "@/public/characters/toright.svg";
import { CoolButton } from "@/components";
import { upgradeChar } from "@/components/InviteSection/getCode";
import { useSDK } from "@metamask/sdk-react";
import { useWindowSize } from "@/hooks/useWindowSize";
import { toast } from "react-toastify";
import { useUser } from "@/context/UserContext";

const costs = [0, 100, 200, 400, 800, 1200, 2000, 3000, 4000, 8000];

export default function Characters() {
  let selectedCharLvl = 0;
  const { user } = useUser()
  const { account } = useSDK();

  const [charLvl, setCharLvl] = useState(0);
  const [pointsNeeded, setPointsNeeded] = useState<any>(0);

  const [canMint, setCanMint] = useState(true);
  const [totalPoints, setTotalPoints] = useState<any>(0);

  const [exists, setExists] = useState(true);

  const [character, setCharacter] = useState("Hoplite");
  const rotateCharacterLvl = (num: number) => {
    if (selectedCharLvl - num < 0 || selectedCharLvl + num > 0) {
      return;
    } else {
      selectedCharLvl += num;
    }
  };

  const calc = () => {
    if (totalPoints > pointsNeeded) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (user) {
      setCharLvl(user.charLvl);
      setTotalPoints(user.totalPoints);
    } else {
      setCharLvl(0);
      setTotalPoints(0);
    }
  }, [user])

  useEffect(() => {
    const res = costs[Number(charLvl) + 1] - totalPoints;
    if (res > 0) {
      setPointsNeeded(costs[Number(charLvl) + 1] - totalPoints);
    } else {
      setPointsNeeded("");
    }
  }, [totalPoints]);

  const { isMobile } = useWindowSize();

  return (
    <>
      <main
        className="flex w-full h-full justify-between items-center z-10"
        style={{ flexDirection: isMobile ? "column" : "row" }}
      >
        <style>
          {`
				body {
				background: linear-gradient(86.29deg, #080813 7.22%, #29006B 50.1%, #090914 92.99%);
}
				`}
        </style>
        <div className="flex flex-col ml-auto">
          <div className="flex relative">
            <div className="">
              <Image src={A} alt="" />
              <Image
                src={hoplite_lvl0}
                alt=""
                className="absolute bottom-0 left-0"
              />
            </div>
          </div>
          {exists && (
            <span className="my-2 py-px px-2 rounded-[30px] bg-[#BCFE1E29]/[.16] text-[#BCFE1E] mx-auto">
              you
            </span>
          )}

          <div className="flex flex-col -mx-12">
            <div className="flex mb-6">
              <button
                className={`mr-auto bg-white/[.05] py-4 pl-5 pr-6 rounded-full border-white ${selectedCharLvl <= 0 && "opacity-50"
                  }`}
              >
                <Image src={toleft} alt="" />
              </button>
              <span className="mx-auto text-white text-anon text-center text-5xl leading-[54px]">
                {character}
              </span>
              <button
                className={`ml-auto bg-white/[.05] py-4 pl-6 pr-5 rounded-full border-white ${selectedCharLvl >= 3 && "opacity-50"
                  }`}
              >
                <Image src={toright} alt="" />
              </button>
            </div>

            <div className="flex justify-around mx-12 mb-7">
              <button
                className={`font-bold tracking-[0.3rem] text-[13px] ${charLvl !== 0 ? "text-white/[.5]" : "text-[#BCFE1E]"
                  }`}
                onClick={() => setCharLvl(0)}
              >
                LEVEL 0
              </button>
              <button
                className={`font-bold tracking-[0.3rem] text-[13px] ${charLvl !== 1 ? "text-white/[.5]" : "text-[#BCFE1E]"
                  }`}
                onClick={() => setCharLvl(1)}
              >
                LEVEL 1
              </button>
              <button
                className={`font-bold tracking-[0.3rem] text-[13px] ${charLvl !== 2 ? "text-white/[.5]" : "text-[#BCFE1E]"
                  }`}
                onClick={() => setCharLvl(2)}
              >
                LEVEL 2
              </button>
            </div>

            <div className="flex max-w-80 min-w-fit mb-7">
              <span className="w-full  justify-center text-center text-white">
                Hoplites were the heavily armed infantry soldiers. Aspis helped
                them to survive and block enemies attacks.
              </span>
            </div>

            <div className="flex mx-auto items-center">
              <button
                disabled={!account}
                className={`py-[14px] px-[42px] font-bold text-white ${!canMint && "opacity-50"
                  } bg-white/[.05] rounded-xl w-fit mr-3 `}
                onClick={
                  account
                    ? () =>
                      upgradeChar(account)
                        .then((res) => {
                          console.log("res", res);
                          if (res) {
                            toast.success("Character upgraded");
                          }
                        })
                        .catch((err) => {
                          console.log("err", err);
                          toast.error("Error upgrading character");
                        })
                    : () => toast.info("Connect your wallet")
                }
              >
                Upgrade
              </button>

              {pointsNeeded && (
                <span className="gap-2 flex">
                  <Image src={a} alt="" />
                  <span className="text-[13px] text-white">
                    {pointsNeeded} needed
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col mb-auto mt-32 gap-12 ml-auto">
          <div className="flex w-1/2 h-1/2 gap-10 mb-12">
            <div className="relative opacity-50">
              <Image src={A} alt="" />
              <Image
                src={hoplite_lvl2}
                alt=""
                className="absolute bottom-0 left-0"
              />
              <span className="absolute -bottom-4 -translate-x-1/2 translate-y-full  left-1/2 overflow-hidden text-anon text-2xl text-white">
                Hoplite
              </span>
            </div>

            <div className="relative">
              <Image src={A} alt="" />
              <Image
                src={hippeis_lvl3}
                alt=""
                className="absolute bottom-0 left-0"
              />

              <div className="absolute -bottom-4  -translate-x-1/2 translate-y-full  left-1/2  text-2xl text-white">
                <div className="relative">
                  <span className="absolute left-1/2 -translate-x-1/2 text-anon">
                    Hippeis
                  </span>
                  <span className="flex pt-8 text-[13px] justify-center">
                    <Image src={a} alt="" height={13} className="mr-1" />
                    <span className="my-auto">8000</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-1/2 h-1/2 gap-10">
            <div className="relative">
              <Image src={A} alt="" />
              <Image
                src={polemarchos_lvl3}
                alt=""
                className="absolute bottom-0 left-0"
              />
              <div className="absolute -bottom-4  -translate-x-1/2 translate-y-full  left-1/2  text-2xl text-white">
                <div className="relative">
                  <span className="absolute left-1/2 -translate-x-1/2 text-anon">
                    Polemarchos
                  </span>
                  <span className="flex pt-8 text-[13px] justify-center">
                    <Image src={a} alt="" height={13} className="mr-1" />
                    <span className="my-auto">2000</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image src={A} alt="" />
              <Image
                src={king_lvl3}
                alt=""
                className="absolute bottom-0 left-0"
              />

              <div className="absolute -bottom-4  -translate-x-1/2 translate-y-full  left-1/2  text-2xl text-white">
                <div className="relative">
                  <span className="absolute left-1/2 -translate-x-1/2 text-anon">
                    King
                  </span>
                  <span className="flex pt-8 text-[13px] justify-center">
                    <Image src={a} alt="" height={13} className="mr-1" />
                    <span className="my-auto">8000</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="overflow-hidden fixed flex left-0 top-0 z-0 w-1/2 h-full mix-blend-overlay">
        <Image
          src={bgs}
          alt=""
          className="overflow-hidden rotate-[-35deg] z-0 w-fit h-fit opacity-40 mix-blend-overlay"
          style={{ pointerEvents: "none", userSelect: "none", zIndex: -1 }}
        />
      </div>
    </>
  );
}
