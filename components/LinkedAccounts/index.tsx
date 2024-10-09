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
// import { linkTgAccount } from "@/app/profile/link";
import { CoolButton } from "../CoolButton";
import { signInWithTwitter } from "../SignInTwitter/sign-in";
import { useWindowSize } from "@/hooks/useWindowSize";
import XLogo from "@/public/images/X_logo.png";
import TelegramLogo from "@/public/images/telegram-logo.png";
import Image from "next/image";
import { getCode } from "../InviteSection/getCode";
import axios from "axios";
import { toast } from "react-toastify";

export function LinkedAccounts({ setActiveTab }: any) {
  const [tgAccount, setTgAccount] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const session = useSession();
  const { account } = useSDK();
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const doAsync = async () => {
      if (account) {
        const data = await getCode(account);
        setTgAccount(Boolean(data?.telegramId));
      }
    };

    doAsync();
  }, [account]);

  useEffect(() => {
    tgAccount ? console.log(tgAccount) : null;
  }, [tgAccount]);

  // const test = async (id: number) => {
  //   console.log("Linking this tg account: ", id);

  //   linkTgAccount({ address: account, tgId: id });
  // };
  // 6819890766
  const connectTgAccount = () => {
    // window.Telegram.Login.auth({ bot_id: bot_id }, (data: any) => {
    //   if (data) {
    //     test(data?.id);
    //   }
    // });
    window.Telegram.Login.auth({ bot_id: 6819890766 }, (data: any) => {
      if (data?.user?.id || data?.id) {
        console.log(data);
        (data.user || data.id) && setTgAccount(true);
        toast.loading("Linking telegram account...");
        axios
          .post("", {
            twitterId: null,
            telegramId: data?.user?.id ?? data?.id,
          })
          .then((res) => {
            console.log(res);
            toast.dismiss();
            toast.success("Telegram account linked successfully");
          })
          .catch((err) => {
            toast.dismiss();
            toast.error("Error linking telegram account");
          });
        //   {
        //     "user": {
        //         "id": 33333333,
        //         "first_name": "Ivan",
        //         "last_name": "Ivanov",
        //         "username": "Ivan_Ivanov",
        //         "photo_url": "https:\/\/t.me\/i\/userpic\/320\/5unTUeP74dR77kq0CTHk_baZ7_SM_FN9rx1HxKFHiWk.jpg",
        //         "auth_date": 1728211141,
        //         "hash": "a41b769fe2b0fa65c3c43741e2546d3dda5553a98601d69bef71a24cab29af3b"
        //     },
        //     "html": "<button class=\"btn tgme_widget_login_button\" onclick=\"return TWidgetLogin.auth();\"><i class=\"tgme_widget_login_button_icon\"><\/i>Войти как <span dir=\"auto\">Yan<\/span><\/button><i class=\"tgme_widget_login_user_photo bgcolor5\" data-content=\"Y\" onclick=\"return TWidgetLogin.auth();\"><img src=\"https:\/\/cdn4.telesco.pe\/file\/QhCHe0lPnNzDB5KOHIqRPybvwakA4L7r8IXXeWWxZx2UDgHlRuLxivZk6xnX30Ov76vXGr8Qq0h3OST_7ulNhuCeBitCyDvWBsKuP6dGAJKy9MRKa6LNeIEA51GJUL6X9UWeLWudpwWFnUbFNspZOpvjSupZxjwImMNj9Lb9J8BehVSTIyTlIm4vV-k9o04wX-pmuPPkVfxyQFHRFaIMq2FgsD-d4OBIaSIqQf1aVzLN9mDz5fOT2HddEAX_w1LEaXXDqNo3sBHo4d5qgRHh7BAQWxtk-fw5KY5reSoj2W5jGbQ_Y3PIrkTb59sCW2nsyHomE6RX1RexqTODXz27uw.jpg\"><\/i>",
        //     "origin": "https:\/\/rewards.aspis.finance"
        // }
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
            {!tgAccount && (
              <div className="ml-auto">
                <CoolButton text="Connect" onClick={connectTgAccount} />
              </div>
            )}
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
