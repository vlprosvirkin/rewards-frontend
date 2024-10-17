"use client";

import Image from "next/image";
import { CoolButton } from "@/components/CoolButton";

import hand from "@/public/hand.png";
import { useSDK } from "@metamask/sdk-react";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useUser } from "@/context/UserContext";

export const InviteSection: React.FC = () => {
  const { account } = useSDK();
  const { isMobile } = useWindowSize();
  const router = useRouter();
  const { user } = useUser()

  const showCode = async () => {
    if (!account || !user) return toast.info("You must connect your wallet first");

    toast.success(`Your referral code is: ${user.referral}`);
    router.replace("/profile");
  };

  return (
    <div
      className="rounded-[23px] bg-[#10101A]/[.83] border border-white/[.1] pl-[33px] pt-[35px] pb-[28px] pr-[33px]"
      style={{
        padding: isMobile ? "30px 20px 30px 20px" : "30px 30px 30px 30px",
      }}
    >
      {!isMobile && (
        <Image src={hand} width={48} height={48} alt="" className="mb-6" />
      )}
      <div>
        <div className="flex gap-[10px]">
          <span className="flex flex-col">
            <p>Invite Friends</p>
            <p className="text-[13px] text-white/[.58] mb-8">
              Improve your ranks by inviting friends with a unique referral link
              and code. Assemble your guild and earn points from your referrals
              {"'"} activities.
            </p>
          </span>
          {isMobile && (
            <Image
              src={hand}
              style={{ width: "120px", height: "120px" }}
              alt=""
            />
          )}
        </div>

        <CoolButton
          color={isMobile ? "green" : undefined}
          size="lg"
          text="Get Code"
          onClick={() => {
            showCode();
          }}
        />
      </div>
    </div>
  );
};
