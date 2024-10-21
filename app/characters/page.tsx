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
import { upgradeChar } from "@/components/InviteSection/getCode";
import { useSDK } from "@metamask/sdk-react";
import { useWindowSize } from "@/hooks/useWindowSize";
import PulseLogoLoader from "@/components/PulseLogo";
import { toast } from "react-toastify";
import { useUser } from "@/context/UserContext";

const costs = [0, 100, 200, 400, 800, 1200, 2000, 3000, 4000, 8000];

export const charactersData = [
  {
    name: "Hoplite",
    levels: [0, 1, 2],
    images: [hoplite_lvl0, hoplite_lvl1, hoplite_lvl2],
    description:
      "Hoplites were the heavily armed infantry soldiers. Aspis helped them to survive and block enemies attacks.",
    gridImage: hoplite_lvl2,
    cost: 0,
  },
  {
    name: "Hippeis",
    levels: [3, 4, 5],
    images: [hippeis_lvl3, hippeis_lvl3, hippeis_lvl3],
    description: "Hippeis were the elite cavalry of ancient Greece.",
    gridImage: hippeis_lvl3,
    cost: 400,
  },
  {
    name: "Polemarchos",
    levels: [6, 7, 8],
    images: [polemarchos_lvl3, polemarchos_lvl3],
    description: "Polemarchos were the warlords or military commanders.",
    gridImage: polemarchos_lvl3,
    cost: 2000,
  },
  {
    name: "King",
    levels: [9],
    images: [king_lvl3, king_lvl3],
    description: "Kings ruled the city-states in ancient Greece.",
    gridImage: king_lvl3,
    cost: 8000,
  },
];
export default function Characters() {
  const { account } = useSDK();
  const { user } = useUser()
  const [charLvl, setCharLvl] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [pointsNeeded, setPointsNeeded] = useState<any>(0);
  const [exists, setExists] = useState(true);

  const [selectedCharacterIndex, setSelectedCharacterIndex] = useState(0);
  const [selectedLevelIndex, setSelectedLevelIndex] = useState(0);

  const getCharacterAndLevel = (charLvl: number) => {
    for (let i = 0; i < charactersData.length; i++) {
      const character = charactersData[i];
      if (
        charLvl >= character.levels[0] &&
        charLvl <= character.levels[character.levels.length - 1]
      ) {
        const levelIndex = charLvl - character.levels[0];
        return { characterIndex: i, levelIndex };
      }
    }
    return { characterIndex: 0, levelIndex: 0 };
  };

  useEffect(() => {
    if (user?.id) {
      setTotalPoints(user.totalPoints)
      setCharLvl(user.charLvl)
    } else {
      setCharLvl(0)
      setTotalPoints(0)
      setSelectedCharacterIndex(0)
      setSelectedLevelIndex(0)
    }
  }, [user]);

  useEffect(() => {
    if (!charLvl) {
      return
    }
    const { characterIndex, levelIndex } = getCharacterAndLevel(charLvl);
    setSelectedCharacterIndex(characterIndex);
    setSelectedLevelIndex(levelIndex);
  }, [charLvl])

  const selectedLevel =
    charactersData[selectedCharacterIndex].levels[selectedLevelIndex];

  useEffect(() => {
    const computeCostToUpgrade = (selectedLevel: number) => {
      return costs[selectedLevel];
    };

    const costToUpgrade = computeCostToUpgrade(selectedLevel);

    if (costToUpgrade > 0) {
      setPointsNeeded(costToUpgrade);
    } else {
      setPointsNeeded(0);
    }
  }, [totalPoints, charLvl, selectedLevel]);

  const handleLeftClick = () => {
    if (selectedCharacterIndex > 0) {
      setSelectedCharacterIndex(selectedCharacterIndex - 1);
      setSelectedLevelIndex(0);
    }
  };

  const handleRightClick = () => {
    if (selectedCharacterIndex < charactersData.length - 1) {
      setSelectedCharacterIndex(selectedCharacterIndex + 1);
      setSelectedLevelIndex(0);
    }
  };

  const handleGridCharacterClick = (index: number) => {
    setSelectedCharacterIndex(index);
    const character = charactersData[index];
    const levelIndex =
      charLvl >= character.levels[0]
        ? Math.min(charLvl - character.levels[0], character.levels.length - 1)
        : 0;
    setSelectedLevelIndex(levelIndex);
  };
  const { isMobile, windowSize } = useWindowSize();

  if (!windowSize?.width) return <PulseLogoLoader />;
  const lvlUp = async () => {
    if (!account) return toast.error("Please connect your wallet first.");

    toast.loading("Upgrading character...");
    await upgradeChar(account)
      .then((res) => {
        console.log(res);
        toast.dismiss();
        toast.success("Character upgraded successfully!");
        setCharLvl(selectedLevel);
      })
      .catch((err) => {
        console.log(err);
        toast.dismiss();
        toast.error(
          "Error upgrading character! " + (err?.response?.data?.message ?? err)
        );
      });
  };

  return (
    <>
      <main
        className={`flex w-full ${isMobile ? "" : "h-full"} justify-between items-center z-50 ${isMobile ? "pb-[150px]" : ""}`}
        style={{
          flexDirection: isMobile ? "column" : "row",
          marginTop: isMobile ? 140 : 0,
        }}
      >
        {!isMobile && (
          <style>
            {`
					body {
						background: linear-gradient(86.29deg, #080813 7.22%, #29006B 50.1%, #090914 92.99%);
					}
					`}
          </style>
        )}
        <div
          className={"flex flex-col ml-auto z-50" + isMobile ? " mx-auto" : ""}
          style={isMobile ? { minHeight: 570 } : {}}
        >
          {isMobile && (
            <>
              <br />
            </>
          )}
          <div className="flex relative">
            <div className={isMobile ? "w-[215px]" : ""}>
              <Image src={A} alt="" />
              <Image
                src={
                  charactersData[selectedCharacterIndex].images[
                  selectedLevelIndex
                  ]
                }
                alt=""
                className="absolute bottom-0 left-0"
              />
            </div>
          </div>

          <div className="flex flex-col -mx-12">
            <div className="flex mb-6">
              <button
                onClick={handleLeftClick}
                className={`mr-auto bg-white/[.05] py-4 pl-5 pr-6 rounded-full border-white ${selectedCharacterIndex <= 0 && "opacity-50"
                  }`}
                style={isMobile ? { translate: "-20px -130px" } : undefined}
              >
                <Image src={toleft} alt="" />
              </button>
              <span
                className={`mx-auto text-white text-anon text-center text-${isMobile ? 3 : 5
                  }xl leading-[54px]`}
              >
                {charactersData[selectedCharacterIndex].name}
              </span>
              {selectedLevel == charLvl && (
                <span
                  style={{ alignItems: "center" }}
                  className="flex my-2 py-px px-2 rounded-[30px] bg-[#BCFE1E29]/[.16] text-[#BCFE1E] mx-auto"
                >
                  you
                </span>
              )}
              <button
                onClick={handleRightClick}
                className={`ml-auto bg-white/[.05] py-4 pl-6 pr-5 rounded-full border-white ${selectedCharacterIndex >= charactersData.length - 1 &&
                  "opacity-50"
                  }`}
                style={isMobile ? { translate: "20px -130px" } : undefined}
              >
                <Image src={toright} alt="" />
              </button>
            </div>

            <div className={`flex justify-around mx-${isMobile ? 2 : 12} mb-7`}>
              {charactersData[selectedCharacterIndex].levels.map(
                (level, index) => (
                  <button
                    key={level}
                    className={`font-bold tracking-[0.3rem] text-[${isMobile ? 12 : 13
                      }px] ${selectedLevelIndex !== index
                        ? "text-white/[.5]"
                        : "text-[#BCFE1E]"
                      } ${level > charLvl ? "opacity-50" : ""}`}
                    onClick={() => {
                      setSelectedLevelIndex(index);
                    }}
                  >
                    LEVEL {level}
                  </button>
                )
              )}
              {Array(3 - charactersData[selectedCharacterIndex].levels.length)
                .fill(null)
                .map((_, idx) => (
                  <button
                    key={`empty-${idx}`}
                    className="font-bold tracking-[0.3rem] text-[13px] text-transparent"
                    disabled
                  >
                    LEVEL
                  </button>
                ))}
            </div>

            <div className="flex max-w-80 min-w-fit mb-7">
              <span className="w-full justify-center text-center text-white">
                {charactersData[selectedCharacterIndex].description}
              </span>
            </div>

            <div className="flex mx-auto items-center">
              <button
                className={`py-[14px] px-[42px] font-bold text-white ${pointsNeeded > 0 ? "opacity-50" : ""
                  } bg-white/[.05] rounded-xl w-fit mr-3`}
                onClick={() => lvlUp()}
                disabled={
                  !account ||
                  pointsNeeded > totalPoints ||
                  charLvl >= selectedLevel
                }
              >
                Upgrade
              </button>

              {(pointsNeeded > 0 && selectedLevel > charLvl) && (
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
        <div
          className={`flex flex-${isMobile ? "row" : "col"} mb-auto mt-10 gap-${isMobile ? 2 : 12
            } ml-auto`}
        >
          <div className={`flex w-1/2 h-1/2 gap-${isMobile ? 2 : 10} mb-12`}>
            {charactersData.slice(0, 2).map((character, index) => {
              const isUnlocked = charLvl >= character.levels[0];
              return (
                <div
                  key={character.name}
                  className={`relative ${!isUnlocked && "opacity-50"
                    } cursor-pointer`}
                  onClick={() => handleGridCharacterClick(index)}
                >
                  <Image
                    src={A}
                    alt=""
                    className={isMobile ? "relative bottom-[52%]" : ""}
                  />
                  <Image
                    src={character.gridImage}
                    alt=""
                    className="absolute bottom-0 left-0"
                  />
                  <div className="absolute -bottom-4 -translate-x-1/2 translate-y-full left-1/2 text-2xl text-white">
                    <div className="relative">
                      <span
                        className={
                          "absolute left-1/2 -translate-x-1/2 text-anon" +
                            isMobile
                            ? " text-[14px]"
                            : ""
                        }
                      >
                        {character.name}
                      </span>
                      {character.cost > 0 && (
                        <span className="flex text-[13px] justify-center">
                          <Image src={a} alt="" height={13} className="mr-1" />
                          <span className="my-auto">{character.cost}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={`flex w-1/2 h-1/2 gap-${isMobile ? 2 : 10}`}>
            {charactersData.slice(2, 4).map((character, index) => {
              const isUnlocked = charLvl >= character.levels[0];
              return (
                <div
                  key={character.name}
                  className={`relative ${!isUnlocked && "opacity-50"
                    } cursor-pointer`}
                  onClick={() => handleGridCharacterClick(index + 2)}
                >
                  <Image
                    src={A}
                    alt=""
                    className={isMobile ? "relative bottom-[55%]" : ""}
                  />
                  <Image
                    src={character.gridImage}
                    alt=""
                    className="absolute bottom-0 left-0"
                  />
                  <div className="absolute -bottom-4 -translate-x-1/2 translate-y-full left-1/2 text-2xl text-white">
                    <div className="relative">
                      <span
                        className={
                          "absolute left-1/2 -translate-x-1/2 text-anon" +
                            isMobile
                            ? " text-[14px]"
                            : ""
                        }
                      >
                        {character.name}
                      </span>
                      {character.cost > 0 && (
                        <span className="flex text-[13px] justify-center">
                          <Image src={a} alt="" height={13} className="mr-1" />
                          <span className="my-auto">{character.cost}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {isMobile && <></>}
        </div>
      </main>
      {!isMobile && (
        <div className="overflow-hidden fixed flex left-0 top-0 z-0 w-1/2 h-full mix-blend-overlay">
          <Image
            src={bgs}
            alt=""
            className="overflow-hidden rotate-[-35deg] -z-50 w-fit h-fit opacity-40 mix-blend-overlay"
            style={{ pointerEvents: "none", userSelect: "none" }}
          />
        </div>
      )}
    </>
  );
}
