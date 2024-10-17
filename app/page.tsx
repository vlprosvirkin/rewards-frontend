"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import bgs from "@/public/sphere.png";

import {
  CoolButton,
  InviteSection,
  MintSection,
  StorySection,
} from "@/components";
import missions from "@/public/missions2.png";
import { useWindowSize } from "@/hooks/useWindowSize";
import PulseLogoLoader from "@/components/PulseLogo";

export default function Home() {
  const router = useRouter();
  const { isMobile, windowSize } = useWindowSize();
  if (!windowSize?.width) return <PulseLogoLoader />;

  return (
    <>
      {/* <main className="flex gap-[10px] z-50 h-full items-center">
				<div className="flex max-[390px]:flex-col gap-[10px] h-fit">
					<div className="flex flex-col text-white gap-10 w-full">
						<StorySection />
						<InviteSection />
					</div>

					<MintSection />
				</div>
			</main> */}
      <br />
      <br />
      <main
        className={`text-white grid grid-cols-${isMobile ? 1 : 2
          } z-50 justify-center gap-[10px] ${isMobile ? "mx-5" : "mx-10"
          } ${isMobile ? "pb-[150px]" : ""} my-auto`}
      >
        <div className={`grid grid-rows-1  grid-cols-1`}>
          <div className="w-full h-full pb-12">
            <StorySection />
          </div>
          <div className="w-full h-full">
            {isMobile ? <MintSection /> : <InviteSection />}
          </div>
        </div>

        <div className="grid grid-cols-1 grid-rows-2 gap-[10px]">
          <div className="w-full h-full">
            {isMobile ? <InviteSection /> : <MintSection />}
          </div>

          <div className="w-full h-full">
            <div
              onClick={() => router.push("/missions")}
              className="relative flex rounded-[23px] overflow-hidden cursor-pointer bg-[#10101A]/[.83] border border-white/[.1] pl-[33px] pt-[35px] pb-[28px] pr-[52px] h-full w-full backdrop-blur-sm"
            >
              <Image
                src={missions}
                alt="Missions Hub"
                className="absolute inset-0 w-full h-full object-cover z-[-1]"
              />

              <div className="flex flex-col my-auto relative z-10">
                <p
                  className="text-anon text-white text-[40px]"
                  style={{ fontSize: isMobile ? 28 : 40 }}
                >
                  Missions Hub
                </p>
                <p className="text-[13px] text-white/[.58]">
                  Connect with us on Twitter and Telegram to earn points through
                  daily quests that replicate the training of ancient Greek
                  soldiers. These activities are designed to hone your skills in
                  navigating both ancient and futuristic battle strategies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="overflow-hidden fixed flex right-0 top-0 translate-y-[16.67%]  z-0 w-1/2  mix-blend-overlay">
        <Image
          src={bgs}
          alt=""
          className="flex overflow-hidden rotate-[-62deg] w-fit h-fit opacity-40 mix-blend-overlay"
        />
      </div>
      <div className="overflow-hidden fixed flex right-0 top-0 translate-y-[16.67%] z-0 w-1/2  mix-blend-overlay">
        <Image
          src={bgs}
          alt=""
          className="overflow-hidden rotate-[35deg] w-fit h-fit opacity-40 mix-blend-overlay"
        />
      </div>
      <br />
      <br />
    </>
  );
}
