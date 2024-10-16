"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";

import x from "@/public/x.svg";
import { useEffect, useState } from "react";
import { Spinner } from "./Loader";
import kartinka from "@/public/modal/left.png";
import kartinka2 from "@/public/modal/right.png";
import { getCode, mint } from "../InviteSection/getCode";
import { useSDK } from "@metamask/sdk-react";
import { toast } from "react-toastify";
import { useWindowSize } from "@/hooks/useWindowSize";
import { checkTask } from "../missions/checkTask";

export const SuccessPopup = ({ isOpen, onOpen, onClose }: any) => {
  const [isMinting, setIsMinting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [done, setDone] = useState(false);
  const [text, setText] = useState("");
  const [hasMint, setHasMint] = useState(false);
  const { account } = useSDK();

  const resetStates = () => {
    setIsMinting(false);
    setSuccess(false);
    setIsError(false);
    setTxHash("");
    setDone(false);
  };
  const [user, setUser] = useState({});
  useEffect(() => {
    const user = localStorage?.getItem("user");
    if (user) {
      const user_ = JSON.parse(user);
      setUser(user_);
      setHasMint(user_?.hasMint ? true : false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (!user && account) {
        const res = await getCode(account);
        setUser(res);
        setHasMint(res?.hasMint ? true : false);
      }
    })();
  }, [account]);

  const mintNFTAdmin = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts: any = await window.ethereum.request({
          method: "eth_accounts",
        });
        const recipientAddress = accounts[0];
        console.log("recipientAddress", recipientAddress);
        setIsMinting(true);
        // const res = await fetch("/api/mint", {
        // 	method: "POST",
        // 	headers: {
        // 		"Content-Type": "application/json",
        // 	},
        // 	body: JSON.stringify({ recipientAddress }),
        // });
        let errText = "";
        toast.loading("Minting NFT...");
        const data = await mint(recipientAddress).catch((err) => {
          console.log(err);
          if (err?.response?.data.errors) {
            // alert(err?.response?.data.errors[0]);
            setText(err?.response?.data.errors[0]);
            errText = err?.response?.data.errors[0];
            toast.error(err?.response?.data.errors[0]);
            toast.error(err?.response?.data.errors[0]);
          }
          return { data: undefined };
        });
        toast.dismiss();
        toast.dismiss();
        setIsMinting(false);

        if (data?.hash) {
          try {
            await checkTask(1, recipientAddress, 'nft_mint')
          } catch (e) {
            !errText && setIsError(true);
            toast.error("Error minting NFT. Please try again.");
            console.log(e)
            return
          }

          setTxHash(data.txHash);
          setSuccess(true);
          toast.success(`Minting successful! Transaction hash: ${data.hash}`);
        } else {
          !errText && setIsError(true);
          toast.error("Error minting NFT. Please try again.");
        }
      } catch (error) {
        console.error("Error minting NFT:", error);
        setIsError(true);
        setIsMinting(false);
        toast.error("Error minting NFT. " + error);
      }
    } else {
      alert("MetaMask is not installed");
      toast.info("MetaMask is not installed");
    }
  };

  if ((success || isError) && !done) {
    return (
      <Congratulations
        setSuccess={setDone}
        isError={isError}
        tryAgain={resetStates}
        hash={txHash}
      />
    );
  }

  const Proceed: React.FC = () => {
    return (
      <button
        className="w-fit mx-auto font-[900] text-sm text-black rounded-lg py-[14px] px-[42px] border-white/[.29] bg-[#BCFE1E]"
        onClick={() => mintNFTAdmin()}
      >
        Proceed
      </button>
    );
  };

  const Loading: React.FC = () => {
    return (
      <button className="font-[900] mx-auto rounded-lg py-[14px] px-[42px] bg-white/[.1]">
        <div className="flex items-center gap-[10px]">
          {!text ? (
            <>
              <span className="text-white/[.5] text-[14px]">Loading</span>
              <Spinner />
            </>
          ) : (
            <span className="text-white/[.5] text-[14px]">{text}</span>
          )}
        </div>
      </button>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent style={{
        maxWidth: "700px",
      }}>
        <ModalBody className="text-center backdrop-blur-md rounded-[18px] border border-white/[.09]">
          <Image
            src={x}
            alt=""
            className="absolute top-0 right-0 translate-y-full -translate-x-full"
            onClick={onClose}
          />

          {hasMint ? (
            <div className="flex flex-col py-4">
              <p className="text-white text-[24px]"></p>
              <p className="text-white/[.58] text-[13px] mb-6">
                Nft is already minted!
              </p>
              {/* <Proceed /> */}
            </div>
          ) : !isMinting ? (
            <div className="flex flex-col py-4">
              <p className="text-white text-[24px]">Get early access</p>
              <p className="text-white/[.58] text-[13px] mb-6">
                Click to proceed with on-chain action
              </p>
              <Proceed />
            </div>
          ) : null}
          {isMinting && (
            <div className="flex flex-col py-4">
              <p className="text-white text-[24px]">Sit tight</p>
              <p className="text-white/[.58] text-[13px] mb-6">
                NFT is being minted, and you should soon receive it!
              </p>
              <Loading />
            </div>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
interface GratzProps {
  setSuccess: (value: boolean) => void;
  isError: boolean;
  tryAgain: () => void;
  hash: string;
}

const Congratulations: React.FC<GratzProps> = ({
  setSuccess,
  isError,
  tryAgain,
  hash,
}) => {
  const { isMobile } = useWindowSize();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, []);

  const openPolygoscan = async () => {
    await window?.open("https://polygonscan.com/tx/" + hash, "_blank")
  }

  const closeModal = () => {
    setSuccess(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent style={{
        maxWidth: isMobile ? "95%" : "700px",
      }}>
        <ModalBody className="text-center backdrop-blur-md rounded-[18px] border border-white/[.09] overflow-hidden min-h-1/3">
          <div className="z-50 py-10">
            {!isError ? (
              <>
                <div className="text-[24px] text-white">Congratulations!</div>
                <div className="text-[13px] text-white/[.58] mb-6">
                  Your unique access NFT is minted
                </div>
                <button className="text-[14px] font-bold bg-[#BCFE1E] py-[14px] px-[42px] rounded-lg border border-white/[.29]" onClick={openPolygoscan}>
                  Transaction
                </button>
              </>
            ) : (
              <>
                <div className="text-[24px] text-white">Oops!</div>
                <div className="text-[13px] text-white/[.58] mb-6">
                  Something went wrong. Please try again later.
                </div>
              </>
            )}
          </div>
          <Image
            src={x}
            alt=""
            className="absolute top-0 right-0 translate-y-full -translate-x-full"
            onClick={closeModal}
          />
          <Image
            src={kartinka}
            alt=""
            className="absolute top-0 left-0 -z-50 w-1/3"
          />
          <Image
            src={kartinka2}
            alt=""
            className="absolute top-0 right-0 -z-50 w-1/3"
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
