"use client";

import Image from "next/image";
import hoplite_lvl3 from "@/public/hoplite-lvl3.png";

import { CoolButton } from "../CoolButton";
import { useRouter } from "next/navigation";

import { ethers } from "ethers"; // Import ethers library
import { JsonRpcProvider, Wallet, Contract, BrowserProvider } from "ethers";
import { getKey, getRpcUrl } from "./getKey";
import { useState } from "react";
import { SuccessPopup } from "./SuccessPopup";
import { useDisclosure } from "@chakra-ui/react";
import { useWindowSize } from "@/hooks/useWindowSize";
import { toast } from "react-toastify";
import axios from "axios";
import { mint } from "../InviteSection/getCode";

// import dotenv from "dotenv";
// dotenv.config();

export const MintSection: React.FC = () => {
  const router = useRouter();
  const [isMinting, setIsMinting] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isMobile } = useWindowSize();

  const mintNFTAdmin = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        // Подключаемся к MetaMask
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts: any = await window.ethereum.request({
          method: "eth_accounts",
        });
        const recipientAddress = accounts[0];

        // Отправляем запрос на сервер для выполнения минтинга
        setIsMinting(true);
        toast.loading("Minting NFT...");
        const data = await mint(recipientAddress);
        setIsMinting(false);
        toast.dismiss();
        if (data?.hash) {
          toast.success(`Minting successful! Transaction hash: ${data.hash}`);
          toast.dismiss();
        } else {
          toast.error("Error minting NFT. Please try again.");
        }
      } catch (error) {
        console.error("Error minting NFT:", error);
        toast.error("Error minting NFT. " + error);
        setIsMinting(false);
      }
    } else {
      toast.info("MetaMask is not installed");
    }
  };

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
                style={{ width: "120px", height: "120px" }}
                alt=""
              />
            )}
          </div>
          {/* onClick={() => mintNFTAdmin()} */}
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
