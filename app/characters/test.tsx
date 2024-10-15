"use client";

import A from "@/public/A_chars.svg";
import a from "@/public/characters/a.svg";
import hoplite_lvl0 from "@/public/characters/hoplite-lvl0.png";
import hoplite_lvl1 from "@/public/characters/hoplite-lvl1.png";
import hoplite_lvl2 from "@/public/characters/hoplite-lvl2.png";
import hippeis_lvl3 from "@/public/characters/hippeis-lvl3.png";
import polemarchos_lvl3 from "@/public/characters/polemarchos-lvl3.png";
import king_lvl3 from "@/public/characters/king-lvl3.png";
import bgs from "@/public/sphere.png";
import toleft from "@/public/characters/toleft.svg";
import toright from "@/public/characters/toright.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSDK } from "@metamask/sdk-react";
import { getCode } from "@/components/InviteSection/getCode";

const costs = [0, 100, 200, 400, 800, 1200, 2000, 3000, 4000, 8000];

const levels = [
  {
    level: 0,
    character: "Hoplite",
    image: hoplite_lvl0,
    description:
      "Hoplites were the heavily armed infantry soldiers. Aspis helped them to survive and block enemies attacks.",
  },
  {
    level: 1,
    character: "Hoplite",
    image: hoplite_lvl1,
    description: "Hoplite Level 1: Improved armor and combat skills.",
  },
  {
    level: 2,
    character: "Hoplite",
    image: hoplite_lvl2,
    description: "Hoplite Level 2: Elite warrior with advanced tactics.",
  },
  {
    level: 3,
    character: "Hippeis",
    image: hippeis_lvl3,
    description: "Hippeis: The cavalry unit, swift and powerful.",
  },
  {
    level: 4,
    character: "Hippeis",
    image: hippeis_lvl3,
    description: "Hippeis: The cavalry unit, swift and powerful.",
  },
  {
    level: 5,
    character: "Hippeis",
    image: hippeis_lvl3,
    description: "Hippeis: The cavalry unit, swift and powerful.",
  },
  {
    level: 6,
    character: "Polemarchos",
    image: polemarchos_lvl3,
    description: "Polemarchos: A high-ranking military commander.",
  },
  {
    level: 7,
    character: "Polemarchos",
    image: polemarchos_lvl3,
    description: "Polemarchos: A high-ranking military commander.",
  },
  {
    level: 8,
    character: "King",
    image: king_lvl3,
    description: "King: The supreme leader with unmatched authority.",
  },
  {
    level: 9,
    character: "King",
    image: king_lvl3,
    description: "King: The supreme leader with unmatched authority.",
  },
  // Добавьте уровни 6-9, если у вас есть соответствующие данные и изображения
];

export default function Characters() {
  const { account } = useSDK();
  const [charLvl, setCharLvl] = useState(0); // Уровень персонажа с сервера
  const [selectedCharLvl, setSelectedCharLvl] = useState(0); // Отображаемый уровень персонажа
  const [pointsNeeded, setPointsNeeded] = useState<any>(0);
  const [totalPoints, setTotalPoints] = useState<any>(0);
  const [exists, setExists] = useState(true);

  useEffect(() => {
    const doAsync = async () => {
      if (!account) return;
      const data = await getCode(account);
      setCharLvl(data.charLvl);
      setSelectedCharLvl(data.charLvl);
      setTotalPoints(data.totalPoints);
    };
    doAsync();
  }, [account]);

  useEffect(() => {
    setExists(selectedCharLvl === charLvl);
  }, [selectedCharLvl, charLvl]);

  useEffect(() => {
    if (charLvl < costs.length - 1) {
      const res = costs[charLvl + 1] - totalPoints;
      if (res > 0) {
        setPointsNeeded(res);
      } else {
        setPointsNeeded(0);
      }
    } else {
      // Достигнут максимальный уровень
      setPointsNeeded(0);
    }
  }, [totalPoints, charLvl]);

  const rotateCharacterLvl = (num: number) => {
    setSelectedCharLvl((prev) => {
      let newLvl = prev + num;
      if (newLvl < 0) {
        newLvl = 0;
      } else if (newLvl >= levels.length) {
        newLvl = levels.length - 1;
      }
      return newLvl;
    });
  };

  const canUpgrade =
    charLvl < costs.length - 1 && totalPoints >= costs[charLvl + 1];
  const isMaxLevel = charLvl >= costs.length - 1;

  return (
    <>
      <main className="flex w-full h-full justify-between items-center z-10">
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
                src={levels?.[selectedCharLvl]?.image}
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
                onClick={() => rotateCharacterLvl(-1)}
                disabled={selectedCharLvl <= 0}
                className={`mr-auto bg-white/[.05] py-4 pl-5 pr-6 rounded-full border-white ${
                  selectedCharLvl <= 0 && "opacity-50"
                }`}
              >
                <Image src={toleft} alt="" />
              </button>
              <span className="mx-auto text-white text-anon text-center text-5xl leading-[54px]">
                {levels[selectedCharLvl].character}
              </span>
              <button
                onClick={() => rotateCharacterLvl(1)}
                disabled={selectedCharLvl >= levels.length - 1}
                className={`ml-auto bg-white/[.05] py-4 pl-6 pr-5 rounded-full border-white ${
                  selectedCharLvl >= levels.length - 1 && "opacity-50"
                }`}
              >
                <Image src={toright} alt="" />
              </button>
            </div>

            <div className="flex max-w-80 min-w-fit mb-7">
              <span className="w-full  justify-center text-center text-white">
                {levels[selectedCharLvl].description}
              </span>
            </div>

            {!isMaxLevel && (
              <div className="flex mx-auto items-center">
                <button
                  className={`py-[14px] px-[42px] font-bold text-white ${
                    !canUpgrade && "opacity-50"
                  } bg-white/[.05] rounded-xl w-fit mr-3 `}
                  onClick={lvlUp}
                  disabled={!canUpgrade}
                >
                  Upgrade
                </button>

                {pointsNeeded > 0 && (
                  <span className="gap-2 flex">
                    <Image src={a} alt="" />
                    <span className="text-[13px] text-white">
                      {pointsNeeded} needed
                    </span>
                  </span>
                )}
              </div>
            )}

            {isMaxLevel && (
              <div className="flex mx-auto items-center">
                <span className="text-white">Max Level Reached</span>
              </div>
            )}
          </div>
        </div>

        {/* Дополнительные персонажи (если необходимо) */}
        <div className="flex flex-col mb-auto mt-32 gap-12 ml-auto">
          <div className="flex w-1/2 h-1/2 gap-10 mb-12">
            {levels.slice(1).map((level) => (
              <div
                key={level.level}
                className={`relative ${
                  charLvl >= level.level ? "opacity-100" : "opacity-50"
                }`}
              >
                <Image src={A} alt="" />
                <Image
                  src={level.image}
                  alt=""
                  className="absolute bottom-0 left-0"
                />
                <div className="absolute -bottom-4 -translate-x-1/2 translate-y-full  left-1/2 text-2xl text-white">
                  <div className="relative">
                    <span className="absolute left-1/2 -translate-x-1/2 text-anon">
                      {level.character}
                    </span>
                    <span className="flex pt-8 text-[13px] justify-center">
                      <Image src={a} alt="" height={13} className="mr-1" />
                      <span className="my-auto">
                        {costs[level.level] || "N/A"}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <div className="overflow-hidden fixed flex left-0 top-0 z-0 w-1/2 h-full mix-blend-overlay">
        <Image
          src={bgs}
          alt=""
          className="overflow-hidden rotate-[-35deg] z-0 w-fit h-fit opacity-40 mix-blend-overlay"
        />
      </div>
    </>
  );
}
