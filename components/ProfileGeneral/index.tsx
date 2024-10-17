"use client";

import Image from "next/image";
import pfp from "@/public/hoplite-lvl3.png";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { setRef } from "../InviteSection/getCode";
import { useSDK } from "@metamask/sdk-react";
import { CoolButton } from "../CoolButton";

import tstreak from "@/public/3streak.svg";
import wstreak from "@/public/7streak.svg";
import twstreak from "@/public/14streak.svg";
import mstreak from "@/public/monthStreak.svg";
import sphere from "@/public/scrollSphere.svg";
import a from "@/public/characters/a.svg";

import { getPos } from "@/app/missions/page";
import { useWindowSize } from "@/hooks/useWindowSize";
import axios from "axios";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import { shortenAddress } from "@/utils/shortenAddress";
import { charactersData } from "@/app/characters/page";
import { toast } from "react-toastify";
import { useUser } from "@/context/UserContext";

const formatCode = (input: string): string => {
  const upperCased = input.toUpperCase();
  const parts = upperCased.match(/.{1,2}/g);
  return parts ? parts.join("-") : "";
};
const CopyNotification = ({ copied }: { copied: boolean }) => {
  return (
    <span
      className={`ml-auto mb-2 h-fit w-fit px-2 text-center text-[#BCFE1E] bg-[#BCFE1E29] rounded-[10px] py-0 text-[10px] transition-opacity duration-200 ${copied ? "opacity-100" : "opacity-0"
        }`}
      style={{ cursor: "pointer" }}
    >
      copied
    </span>
  );
};

export function ProfileGeneral({ setActiveTab }: any) {
  const router = useRouter();
  const { user, setUser } = useUser()
  const [username, setUsername] = useState<string>("...");
  const [referralCode, setReferralCode] = useState<string>("...");
  const [referrees, setReferrees] = useState<number | string>("...");
  const [copied, setCopied] = useState<boolean>(false);

  const [referralLink, setReferralLink] = useState<any>('');
  const { account } = useSDK();
  const [isOpen, setIsOpen] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const onClose = () => setIsOpen(false);

  const setRefferal = async () => {
    toast.loading("Applying referral link...");
    if (!account) {
      toast.dismiss()
      toast.error("Please connect your wallet first");
      return
    }
    if (!referralLink) {
      toast.dismiss()
      toast.error("Please fill referall input first");
      return
    }

    const data = await setRef(referralLink.replace(/-/g, '').toLowerCase(), account).catch((e) => {
      toast.dismiss();
      console.log('error', e)
      toast.error("Error applying referral link");
      return { data: undefined };
    });

    if (data.message) {
      toast.dismiss();
      toast.success(data?.message);
      if (user) {
        setUser({ ...user, totalPoints: user?.totalPoints + 100 })
      }

      setReferralLink('')
      router.refresh()
    }
  };
  const changeUsername = async () => {
    await axios
      .post(`https://api-rewards.aspis.finance/v1/users/username/${account}`, {
        username: newUserName,
      })
      .then(() => {
        setUsername(newUserName);
        setIsOpen(false);
      })
      .catch((e) => console.log(e));
  };
  const [streak, setStreak] = useState(0);
  const [streakProgress, setStreakProgress] = useState<number>(5);

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
  };

  const [updateCount, setUpdateCount] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdateCount((prev) => prev + 1);
    }, 5000);

    // return () => clearInterval(interval);
  }, []);

  useEffect(() => {

    setUsername(user?.username || "...");
    setNewUserName(user?.username || "...");
    setReferralCode(formatCode(user?.referral || "..."));
    setReferrees(user?.regPoints || 0);
    setStreak(user?.strikeCount || 0);

    if (user?.charLvl) {
      const userChar = charactersData.find((c) =>
        c.levels.includes(user.charLvl)
      );

      if (!userChar) return;

      setUserChar(userChar);
      setImgIndex(
        userChar?.levels[0] === user.charLvl
          ? 0
          : userChar?.levels[1] === user.charLvl
            ? 1
            : 2
      );
    } else {
      setUserChar(0)
      setImgIndex(0)
    }

  }, [user])


  useEffect(() => {
    // setStreakProgress(`${getPos(streak)}%`);
    const result = getPos(streak);
    setStreakProgress(result !== 0 ? Number(result) : 3);
  }, [streak]);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const [userChar, setUserChar] = useState<any>(null);
  const [imgIndex, setImgIndex] = useState<any>(0);

  const { isMobile } = useWindowSize();

  return (
    <div className={`flex flex-col max-w-full h-full`}>
      <div
        className="flex my-10 max-w-full"
        style={
          isMobile
            ? {
              maxWidth: "90%",
              alignContent: "center",
              justifyContent: "center",
            }
            : {}
        }
      >
        <div
          className={`flex w-full relative bg-[#5F5F5F] rounded-full px-${isMobile ? 0 : 8
            } mb-4`}
          style={isMobile ? { marginLeft: "6%" } : {}}
        >
          <div
            className="bg-[#BCFE1E] h-0.5 rounded-full"
            style={{ width: `${streakProgress}%` }}
          >
            <Image
              src={sphere}
              alt=""
              width={28}
              height={28}
              style={{ left: `${streakProgress}%` }}
              className={`absolute left-[${String(
                streakProgress
              )}%] top-0 transform -translate-y-1/2 -translate-x-1/2`}
            />
          </div>

          <div className="absolute font-bold text-sm text-white top-4 opacity-0">
            nostreak
          </div>

          <Image
            src={tstreak}
            alt=""
            className="absolute -top-10 left-[10%] transform -translate-x-1/2"
          />
          <div
            className="absolute font-bold text-sm text-white top-4 left-[10%] transform -translate-x-1/2"
            style={isMobile ? { maxWidth: "50px", textAlign: "center" } : {}}
          >
            3-day streak
          </div>

          <Image
            src={wstreak}
            alt=""
            className="absolute -top-10 left-[33%] transform -translate-x-1/2"
          />
          <div
            className="absolute font-bold text-sm text-white top-4 left-[33%] transform -translate-x-1/2"
            style={isMobile ? { maxWidth: "50px", textAlign: "center" } : {}}
          >
            7-day streak
          </div>

          <Image
            src={twstreak}
            alt=""
            className="absolute -top-10 left-[66%] transform -translate-x-1/2"
          />
          <div
            className="absolute font-bold text-sm text-white top-4 left-[66%] transform -translate-x-1/2"
            style={isMobile ? { maxWidth: "70px", textAlign: "center" } : {}}
          >
            2-week streak
          </div>

          <Image
            src={mstreak}
            alt=""
            className="absolute -top-10 left-[100%] transform -translate-x-1/2"
          />
          <div
            className="absolute font-bold text-sm text-white top-4 left-[100%] transform -translate-x-1/2 w-40"
            style={isMobile ? { maxWidth: "80px", textAlign: "center" } : {}}
          >
            1-month streak
          </div>
        </div>
      </div>
      <br />
      {isMobile ? (
        <div
          className="flex"
          style={isMobile ? { flexDirection: "column" } : {}}
        >
          <div
            className={`grid grid-cols-2 grid-rows-2 gap-[10px] mt-auto mb-24 h-fit`}
          >
            <div className="bg-[#141020] rounded-[10px] h-full py-4 px-3 flex flex-col justify-between">
              <span className="text-white/[.5] text-sm">Character</span>
              <div className="self-start text-[white]">
                lvl_{user && user?.charLvl}
              </div>
            </div>

            <div className="bg-[#141020] rounded-[10px] h-full py-4 px-3 flex flex-col justify-between">
              <span className="text-white/[.5] text-sm">Total points</span>
              <div className="self-start flex">
                <Image src={a} alt="" className="mr-2" />
                <span className="my-auto text-[white]">
                  {user?.totalPoints ?? 0}
                </span>
              </div>
            </div>

            <div className="bg-[#141020] rounded-[10px] h-full py-4 px-3 flex flex-col justify-between">
              <span className="text-white/[.5] text-sm">
                Place in leaderboard
              </span>
              <div className="self-start text-[white]">{user?.place ?? 0}</div>
            </div>

            <div className="bg-[#141020] rounded-[10px] h-full py-4 px-3 flex flex-col justify-between">
              <span className="text-white/[.5] text-sm">Current streak</span>
              <div className="self-start text-[white]">
                {user && user?.strikeCount}-day
              </div>
            </div>
          </div>

          <div className="flex flex-row mr-auto w-1/3 h-full w-full min-h-[161px] gap-3">
            <div className="relative w-fit">
              <Image
                src={
                  userChar
                    ? userChar?.images[imgIndex]
                    : "/characters/hoplite-lvl3.png"
                }
                width={isMobile ? 137 : 256}
                height={isMobile ? 160 : 256}
                className="rounded-xl bg-[#4D0AB8]"
                alt=""
              />
            </div>

            <div className="text-white text-3xl mb-6 mt-3">
              <span className="text-anon">{`${account?.substring(
                0,
                6
              )}...${account?.substring(
                account.length - 6,
                account.length
              )}`}</span>
            </div>
          </div>
          <div
            className="relative flex flex-col justify-center w-full mb-24 mt-12 h-full p-8 rounded-3xl bg-cover bg-center cursor-pointer transition-opacity ease-in-out hover:opacity-80 "
            style={{ backgroundImage: `url('/linked.png')` }}
            onClick={() => setActiveTab("linked_accounts")}
          >
            <div className="text-left">
              <h1 className="text-anon text-4xl text-white mb-4">
                Linked accounts
              </h1>
              <p className="text-anon  text-sm text-white/[.58] mb-8">
                Link your socials, verify them to get trusted and get rewards
              </p>
            </div>
            <button className="flex items-center text-white font-bold text-sm ">
              Connect Wallet
              <span className="ml-2">→</span>
            </button>
          </div>

          <div
            className={`flex flex-col w-full gap-1.5`}
            style={isMobile ? {} : {}}
          >
            <div
              onClick={() => setIsOpen(true)}
              className="flex flex-col bg-[#141020] py-4 px-3 rounded-[10px] border-1 border-[#424242] text-white/[.5] text-sm"
            >
              <span>Username</span>
              <br />
              <span>{shortenAddress(account ?? "")}</span>
            </div>

            <div className="relative flex flex-col bg-[#141020] py-4 px-3 rounded-[10px] border-1 border-[#424242] text-white/[.5] text-sm">
              <div className="flex">
                <span>My referral code</span>
                <CopyNotification copied={copied} />
              </div>

              <span className="flex text-[#BCFE1E] text-lg">
                <span className="my-auto">{referralCode}</span>

                <div className="ml-auto">
                  <CoolButton text="Copy" onClick={copyCode} />
                </div>
              </span>
            </div>

            <div className="flex flex-col bg-[#141020] py-4 px-3 rounded-[10px] border-1 border-[#424242] text-white/[.5] text-sm">
              <span>My referrees</span>
              <br />
              <span className="text-white">{referrees ?? "-"}</span>
            </div>

            <div className="flex flex-col bg-[#141020] py-4 px-3 rounded-[10px] border-1 border-[#424242] text-white/[.5] text-sm">
              <span>Referral code*</span>

              <span className="flex">
                <input
                  type="text"
                  value={referralLink}
                  className="my-auto px-2 bg-transparent w-2/3 focus:outline-none"
                  placeholder="friend-code"
                  onChange={(e) => setReferralLink(e.target.value)}
                />
                <button
                  onClick={setRefferal}
                  className="font-bold rounded-lg py-[14px] px-[42px] bg-white/[.05] ml-auto"
                >
                  Apply
                </button>
              </span>
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      ) : (
        <div
          className="flex"
          style={isMobile ? { flexDirection: "column-reverse" } : {}}
        >
          <div className="flex flex-col mr-auto w-1/3 h-full">
            <div className="relative w-fit">
              <Image
                src={
                  userChar
                    ? userChar?.images[imgIndex]
                    : "/characters/hoplite-lvl3.png"
                }
                width={256}
                height={256}
                className="rounded-xl bg-[#4D0AB8]"
                alt=""
              />
            </div>

            <div className="text-white text-3xl mb-6 mt-3">
              <span className="text-anon">{account ? `${account?.substring(
                0,
                6
              )}...${account?.substring(
                username.length - 6,
                username.length
              )}` : '...'}</span>
            </div>

            <div
              className="relative flex flex-col justify-center w-full mb-24 mt-12 h-full p-8 rounded-3xl bg-cover bg-center cursor-pointer transition-opacity ease-in-out hover:opacity-80 "
              style={{ backgroundImage: `url('/linked.png')` }}
              onClick={() => setActiveTab("linked_accounts")}
            >
              <div className="text-left">
                <h1 className="text-anon text-4xl text-white mb-4">
                  Linked accounts
                </h1>
                <p className="text-anon  text-sm text-white/[.58] mb-8">
                  Link your socials, verify them to get trusted and get rewards
                </p>
              </div>
              <button className="flex items-center text-white font-bold text-sm ">
                Connect Wallet
                <span className="ml-2">→</span>
              </button>
            </div>
          </div>

          <div
            className={`flex flex-col ml-20 w-2/3 gap-1.5`}
            style={isMobile ? {} : {}}
          >
            <div
              // onClick={() => setIsOpen(true)}
              className="flex flex-col bg-[#141020] py-4 px-3 rounded-[10px] border-1 border-[#424242] text-white/[.5] text-sm"
            >
              <span>Wallet address</span>
              <br />
              <span>{shortenAddress(account ?? "")}</span>
            </div>

            <div className="relative flex flex-col bg-[#141020] py-4 px-3 rounded-[10px] border-1 border-[#424242] text-white/[.5] text-sm">
              <div className="flex">
                <span>My referral code</span>
                <CopyNotification copied={copied} />
              </div>

              <span className="flex text-[#BCFE1E] text-lg">
                <span className="my-auto">{referralCode}</span>

                <div className="ml-auto">
                  <CoolButton text="Copy" onClick={copyCode} />
                </div>
              </span>
            </div>

            <div className="flex flex-col bg-[#141020] py-4 px-3 rounded-[10px] border-1 border-[#424242] text-white/[.5] text-sm">
              <span>My referrees</span>
              <br />
              <span className="text-white">{referrees}</span>
            </div>

            <div className="flex flex-col bg-[#141020] py-4 px-3 rounded-[10px] border-1 border-[#424242] text-white/[.5] text-sm">
              <span>Referral code**</span>

              <span className="flex">
                <input
                  type="text"
                  value={referralLink}
                  className="my-auto px-2 bg-transparent w-2/3 focus:outline-none"
                  placeholder="friend-code"
                  onChange={(e) => setReferralLink(e.target.value)}
                />
                <button
                  onClick={setRefferal}
                  className="font-bold rounded-lg py-[14px] px-[42px] bg-white/[.05] ml-auto"
                >
                  Apply
                </button>
              </span>
            </div>

            <span className="text-[11px] text-white/[.58] mt-2 mb-4">
              *If you come from a friend and you have a referral code. You can
              specify it and get{" "}
              <span className="border-b font-bold text-[#BCFE1E] border-[#BCFE1E]">
                100 points{" "}
              </span>
              at once.
            </span>

            <div className="grid grid-cols-4 grid-rows-1 gap-[6px] mt-auto mb-24 h-fit">
              <div className="bg-[#141020] rounded-[10px] h-full py-4 px-3 flex flex-col justify-between">
                <span className="text-white/[.5] text-sm">Character</span>
                <div className="self-start text-[white]">
                  lvl_{user && user?.charLvl}
                </div>
              </div>

              <div className="bg-[#141020] rounded-[10px] h-full py-4 px-3 flex flex-col justify-between">
                <span className="text-white/[.5] text-sm">Total points</span>
                <div className="self-start flex">
                  <Image src={a} alt="" className="mr-2" />
                  <span className="my-auto text-[white]">
                    {user && user?.totalPoints}
                  </span>
                </div>
              </div>

              <div className="bg-[#141020] rounded-[10px] h-full py-4 px-3 flex flex-col justify-between">
                <span className="text-white/[.5] text-sm">
                  Place in leaderboard
                </span>
                <div className="self-start text-[white]">
                  {user && user?.place}
                </div>
              </div>

              <div className="bg-[#141020] rounded-[10px] h-full py-4 px-3 flex flex-col justify-between">
                <span className="text-white/[.5] text-sm">Current streak</span>
                <div className="self-start text-[white]">
                  {user && user?.strikeCount}-day
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          style={{
            maxWidth: isMobile ? "90%" : "",
            backgroundColor: "rgb(19 16 36 / 84%)",
          }}
        >
          <>
            <ModalBody>
              <div className="w-full flex items-center">
                <p className="mt-4 text-white text-[24px]">
                  {"Change your username"}
                </p>
              </div>
              <div className="text-xs mb-8 mr-12">
                <p className="text-white/[.58]">New Username</p>
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={newUserName}
                  placeholder=""
                  className="bg-[#322356] pb-2 pt-8 px-2 w-full rounded-[10px] focus:outline-none text-white/[.58]"
                  onChange={(e) => setNewUserName(e.target.value)}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <button
                className="relative flex items-center gap-[11px] rounded-lg bg-transparent bg-opacity-5 text-white font-bold py-[14px] group"
                onClick={changeUsername}
              >
                Save
              </button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </div>
  );
}
