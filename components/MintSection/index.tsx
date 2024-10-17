"use client";

import Image from "next/image";
import hoplite_lvl3 from "@/public/hoplite-lvl3.png";

import { CoolButton } from "../CoolButton";

import { SuccessPopup } from "./SuccessPopup";
import { useDisclosure } from "@chakra-ui/react";
import { useWindowSize } from "@/hooks/useWindowSize";



export const MintSection: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isMobile } = useWindowSize();


  return (
    <div className="flex flex-col gap-[10px] w-full">
      <div
        className={`rounded-[23px] bg-[#10101A]/[.83] border border-white/[.1] pl-[33px] pt-[35px] pb-[28px] pr-[33px] h-full backdrop-blur-xl`}
        style={{
          padding: isMobile ? "30px 20px 30px 20px" : "30px 30px 30px 30px",
        }}
      >
        {!isMobile && (
          <Image
            src={hoplite_lvl3}
            width={48}
            height={48}
            alt=""
            className="mb-6"
            quality={100}
          />
        )}
        <div>
          <div className="flex gap-[10px]">
            <span className="flex flex-col">
              <p className="text-white">
                Mint the exclusive early-access “Time-Warrior NFT”
              </p>
              <p
                className={`text-[${isMobile ? 12 : 14
                  }px] text-white/[.58] mb-8`}
              >
                This NFT equips your digital persona with armor and weapons that
                blend ancient Greek design with futuristic, cyberpunk
                aesthetics, preparing you for the battles ahead.
              </p>
            </span>
            {isMobile && (
              <Image
                src={hoplite_lvl3}
                width={120}
                height={120}
                style={{ width: "120px", height: "120px" }}
                alt=""
                quality={100}
              />
            )}
          </div>
          <CoolButton
            color={isMobile ? "green" : undefined}
            size="lg"
            text="Mint"
            onClick={onOpen}
          />
        </div>
      </div>

      <SuccessPopup isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </div>
  );
};
