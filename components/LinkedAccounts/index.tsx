"use client";

import { signIn } from "@/auth";
import { loginTwitter } from "@/helpers";
import { useEffect, useState } from "react";
// import {
// 	signInWithDiscord,
// 	signInWithTwitter,
// } from "@/components/SignInTwitter/sign-in";
import { config } from "@/config";
import { useSession } from "next-auth/react";
import { useSDK } from "@metamask/sdk-react";
import { linkTgAccount } from "@/app/profile/link";
import { CoolButton } from "../CoolButton";
import { signInWithTwitter } from "../SignInTwitter/sign-in";
import { useWindowSize } from "@/hooks/useWindowSize";
import XLogo from "@/public/images/X_logo.png";
import TelegramLogo from "@/public/images/telegram-logo.png";
import Image from "next/image";

export function LinkedAccounts({ setActiveTab }: any) {
  const [tgAccount, setTgAccount] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const session = useSession();
  const sdk = useSDK();

  useEffect(() => {
    tgAccount ? console.log(tgAccount) : null;
  }, [tgAccount]);

  const test = async (id: number) => {
    console.log("Linking this tg account: ", id);

    linkTgAccount({ address: sdk?.account, tgId: id });
  };
  // 6819890766
  const connectTgAccount = () => {
    // window.Telegram.Login.auth({ bot_id: bot_id }, (data: any) => {
    //   if (data) {
    //     test(data?.id);
    //   }
    // });
    window.Telegram.Login.auth({ bot_id: 6819890766 }, (data: any) => {
      if (data) {
        console.log(data);
        // do whatever you want with login data
      }
    });
  };

  const { windowSize, isMobile } = useWindowSize();
  return (
    <div className="flex flex-col min-w-full">
      <b
        className={
          isMobile
            ? "text-xl text-[white] pb-1 px-3"
            : "text-xl text-[white] pb-4 px-3"
        }
      >
        Link your socials, verify them to get trusted and get rewards
      </b>
      <br />
      <div
        className={
          isMobile
            ? "flex flex-col mx-auto gap-1.5 w-[90%]"
            : "flex flex-col mx-auto gap-3 w-[100%]"
        }
      >
        {!isMobile && (
          <CoolButton onClick={() => setActiveTab("general")} text="Back" />
        )}
        <div
          className={`flex flex-col bg-[#141020] py-4 px-3 rounded-[10px] border-1 border-[#424242] text-white/[.5] text-sm`}
        >
          <span className="flex gap-2">
            <Image src={XLogo} alt="" /> X (twitter account)
          </span>
          <br />
          <span className="flex font-bold gap-16">
            <span className="text-lg my-auto">Not connected</span>

            <form className="ml-auto" action={signInWithTwitter}>
              <button
                type="submit"
                className="bg-white/[.05] ease-in-out duration-200 hover:bg-white/[.2] text-white py-[14px] px-[42px] rounded-lg font-bold text-sm w-fit"
              >
                Connect
              </button>
            </form>

            {/* <SignInTwitter /> */}
          </span>
        </div>
        <div className="flex flex-col bg-[#141020] py-4 px-3 rounded-[10px] border-1 border-[#424242] text-white/[.5] text-sm">
          <span className="flex gap-2">
            <Image src={TelegramLogo} alt="tg-logo" /> Telegram account
          </span>
          <br />
          <span className="flex font-bold gap-16">
            <span className="text-lg my-auto">
              {tgAccount ? "Connected" : "Not Connected"}
            </span>
            {/*
						<button
							className="rounded-lg my-auto py-[14px] px-[42px] text-white bg-white/[.05] ml-auto"
							onClick={connectTgAccount}
						>
							Connect
						</button>
						*/}
            <div className="ml-auto">
              <CoolButton text="Connect" onClick={connectTgAccount} />
            </div>
          </span>
        </div>
      </div>
      <br />
      {isMobile && (
        <CoolButton
          color="none"
          onClick={() => setActiveTab("general")}
          text="< Back"
        />
      )}
    </div>
  );
}
