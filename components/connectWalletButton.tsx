/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Image from "next/image";
import x from "@/public/modal-close.svg";
import skip from "@/public/skip.svg";
import { StyleHTMLAttributes, use, useEffect, useRef, useState } from "react";
import { MetaMaskSDK, SDKProvider } from "@metamask/sdk";
import { useWalletProvider } from "@/hooks/useWalletProvider";

import a from "@/public/characters/a.svg";

import {
  send_eth_signTypedData_v4,
  send_personal_sign,
} from "../helpers/SignHelpers";

import {
  ConnectionStatus,
  EventType,
  ServiceStatus,
} from "@metamask/sdk-communication-layer";
import { registerUser } from "@/utils/actions";
import { useSDK } from "@metamask/sdk-react";
import { useRouter } from "next/navigation";
import {
  border,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { DisconnectButton } from "./DisconnectButton";
import { useWindowSize } from "@/hooks/useWindowSize";
import { Spinner } from "./MintSection/Loader";

interface input {
  "data-focus": string;
  "data-hover": string;
}
const boxStyle = {
  display: "flex",
  padding: "10px 20px",
  justifyContent: "center",
  alignItems: "center",
  gap: 20,
  margin: "auto",
};

const btnStyle = {
  background: "#FFFFFF0D",
  padding: "10px 20px",
  color: "#FFFFFF",
  borderRadius: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
};

export default function ConnectWalletButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [referral, setReferral] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { windowSize, isMobile } = useWindowSize();

  /*
		const [account, setAccount] = useState<string>();
	const { sdk, connected, connecting, provider, chainId } = useSDK();
	const { wallets, connectWallet } = useWalletProvider();

	const connect = async () => {
		try {
			const accounts = await sdk?.connect();
			setAccount(accounts?.[0]);
		} catch (err) {
			console.warn("failed to connect..", err);
		}
	};
	*/

  // ###########################################################################

  const [sdk, setSDK] = useState<MetaMaskSDK>();
  const [chain, setChain] = useState("");
  const [account, setAccount] = useState<string>("");
  const [response, setResponse] = useState<any>("");
  const [connected, setConnected] = useState(false);
  const [isRegistred, setIsRegistred] = useState(false);

  const [serviceStatus, setServiceStatus] = useState<ServiceStatus>();
  const [activeProvider, setActiveProvider] = useState<SDKProvider>();
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [isDisconecting, setIsDisconecting] = useState<boolean | "ok">(false);

  const { account: acc } = useSDK();

  const router = useRouter();

  useEffect(() => {
    setIsRegistred(
      localStorage?.getItem("isRegistred") === "true" ? true : false
    );
  }, []);

  useEffect(() => {
    const storedLanguage = window?.localStorage?.getItem("MetaMaskSDKLng");
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage);
    }
  }, []);

  const languages = sdk?.availableLanguages ?? ["en"];
  const updateWallet = async (wallet: string) => {
    if (!wallet) {
      return;
    }
    // ##########################################################################
    const res = await registerUser({ address: wallet, referral: referral });

    console.log("result of updating wallet: ", res);
    if (res?.errors && res?.errors[0]?.message === "User already registered") {
      localStorage?.setItem("isRegistred", "true");
    }
    onClose();
    router.refresh();
  };
  useEffect(() => {
    if (acc) {
      onClose();
      setAccount(acc);
    } else {
      setIsDisconecting(false);
      setAccount("");
    }
  }, [acc]);

  useEffect(() => {
    if (account) {
      console.log("account:", acc);
      //updateWallet(account);
    }
  }, [acc]);

  const changeLanguage = async (currentLanguage: string) => {
    localStorage.setItem("MetaMaskSDKLng", currentLanguage);
    window.location.reload();
  };

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCurrentLanguage(event.target.value);

    changeLanguage(event.target.value).then(() => {
      console.debug(`language changed to ${event.target.value}`);
    });
  };

  useEffect(() => {
    const doAsync = async () => {
      const clientSDK = new MetaMaskSDK({
        useDeeplink: false,
        communicationServerUrl: process.env.NEXT_PUBLIC_COMM_SERVER_URL,
        checkInstallationImmediately: false,
        i18nOptions: {
          enabled: true,
        },
        dappMetadata: {
          name: "Aspis",
          url: "https://localhost:3000",
        },
        logging: {
          developerMode: false,
        },
        storage: {
          enabled: true,
        },
      });
      await clientSDK.init();
      setSDK(clientSDK);
    };
    doAsync();
  }, []);

  useEffect(() => {
    if (!sdk || !activeProvider) {
      return;
    }

    // activeProvider is mapped to window.ethereum.
    console.debug(`App::useEffect setup active provider listeners`);
    if (window.ethereum?.getSelectedAddress()) {
      console.debug(`App::useEffect setting account from window.ethereum `);
      setAccount(window.ethereum?.getSelectedAddress() ?? "");
      setConnected(true);
    } else {
      setConnected(false);
    }

    const onChainChanged = (chain: unknown) => {
      console.log(`App::useEfect on 'chainChanged'`, chain);
      setChain(chain as string);
      setConnected(true);
    };

    const onInitialized = () => {
      console.debug(`App::useEffect on _initialized`);
      setConnected(true);
      if (window.ethereum?.getSelectedAddress()) {
        setAccount(window.ethereum?.getSelectedAddress() ?? "");
      }

      if (window.ethereum?.getChainId()) {
        setChain(window.ethereum.getChainId());
      }
    };

    const onAccountsChanged = (accounts: unknown) => {
      console.log(`App::useEfect on 'accountsChanged'`, accounts);
      setAccount((accounts as string[])?.[0]);
      setConnected(true);
    };

    const onConnect = (_connectInfo: any) => {
      console.log(`App::useEfect on 'connect'`, _connectInfo);
      setConnected(true);
      setChain(_connectInfo.chainId as string);
      onClose();
    };

    const onDisconnect = (error: unknown) => {
      console.log(`App::useEfect on 'disconnect'`, error);
      setConnected(false);
      setChain("");
    };

    const onServiceStatus = (_serviceStatus: ServiceStatus) => {
      console.debug(`sdk connection_status`, _serviceStatus);
      setServiceStatus(_serviceStatus);
    };

    window.ethereum?.on("chainChanged", onChainChanged);

    window.ethereum?.on("_initialized", onInitialized);

    window.ethereum?.on("accountsChanged", onAccountsChanged);

    window.ethereum?.on("connect", onConnect);

    window.ethereum?.on("disconnect", onDisconnect);

    sdk.on(EventType.SERVICE_STATUS, onServiceStatus);

    return () => {
      console.debug(`App::useEffect cleanup activeprovider events`);
      window.ethereum?.removeListener("chainChanged", onChainChanged);
      window.ethereum?.removeListener("_initialized", onInitialized);
      window.ethereum?.removeListener("accountsChanged", onAccountsChanged);
      window.ethereum?.removeListener("connect", onConnect);
      window.ethereum?.removeListener("disconnect", onDisconnect);
      sdk.removeListener(EventType.SERVICE_STATUS, onServiceStatus);
    };
  }, [activeProvider]);

  useEffect(() => {
    if (!sdk?.isInitialized()) {
      return;
    }

    const onProviderEvent = (accounts?: string[]) => {
      if (accounts?.[0]?.startsWith("0x")) {
        setConnected(true);
        setAccount(accounts?.[0]);
      } else {
        setConnected(false);
        setAccount("");
      }
      setActiveProvider(sdk.getProvider());
    };
    // listen for provider change events
    sdk.on(EventType.PROVIDER_UPDATE, onProviderEvent);
    return () => {
      sdk.removeListener(EventType.PROVIDER_UPDATE, onProviderEvent);
    };
  }, [sdk]);

  const connect = () => {
    if (!window.ethereum) {
      throw new Error(`invalid ethereum provider`);
    }

    window.ethereum
      .request({
        method: "eth_requestAccounts",
        params: [],
      })
      .then((accounts) => {
        if (accounts) {
          console.debug(`connect:: accounts result`, accounts);
          setAccount((accounts as string[])[0]);
          setConnected(true);
          updateWallet(`${(accounts as string[])[0]}`);
        }
      })
      .catch((e) => console.log("request accounts ERR", e));
  };

  const connectAndSign = async () => {
    try {
      const signResult = await sdk?.connectAndSign({
        msg: "Connect + Sign message",
      });
      setResponse(signResult);
      setAccount(window.ethereum?.getSelectedAddress() ?? "");
      setConnected(true);
      setChain(window.ethereum?.getChainId() ?? "");
    } catch (err) {
      console.warn(`failed to connect..`, err);
    }
  };

  const eth_signTypedData_v4 = async () => {
    if (!activeProvider || !activeProvider.getChainId()) {
      setResponse(`invalid ethereum provider`);
      return;
    }
    const result = await send_eth_signTypedData_v4(
      activeProvider,
      activeProvider.getChainId()
    );
    setResponse(result);
  };

  const eth_personal_sign = async () => {
    if (!activeProvider) {
      setResponse(`invalid ethereum provider`);
      return;
    }
    const result = await send_personal_sign(activeProvider);
    setResponse(result);
  };

  const sendTransaction = async () => {
    const to = "0x0000000000000000000000000000000000000000";
    const transactionParameters = {
      to, // Required except during contract publications.
      from: activeProvider?.getSelectedAddress(), // must match user's active address.
      value: "0x5AF3107A4000", // Only required to send ether to the recipient from the initiating external account.
    };

    try {
      // txHash is a hex string
      // As with any RPC call, it may throw an error
      const txHash = (await activeProvider?.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      })) as string;

      setResponse(txHash);
    } catch (e) {
      console.log(e);
    }
  };

  const changeNetwork = async (hexChainId: string) => {
    console.debug(`switching to network chainId=${hexChainId}`);
    try {
      const response = await activeProvider?.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: hexChainId }], // chainId must be in hexadecimal numbers
      });
      console.debug(`response`, response);
    } catch (err) {
      console.error(err);
    }
  };

  const addEthereumChain = () => {
    if (!activeProvider) {
      throw new Error(`invalid ethereum provider`);
    }

    activeProvider
      .request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x89",
            chainName: "Polygon",
            blockExplorerUrls: ["https://polygonscan.com"],
            nativeCurrency: { symbol: "MATIC", decimals: 18 },
            rpcUrls: ["https://polygon-rpc.com/"],
          },
        ],
      })
      .then((res: any) => console.log("add", res))
      .catch((e: any) => console.log("ADD ERR", e));
  };

  const readOnlyCalls = async () => {
    if (!sdk?.hasReadOnlyRPCCalls() && window.ethereum === undefined) {
      setResponse(
        "readOnlyCalls are not set and provider is not set. Please set your infuraAPIKey in the SDK Options"
      );
      return;
    }
    try {
      const result = await window.ethereum?.request({
        method: "eth_blockNumber",
        params: [],
      });
      console.log(`got blockNumber`, result);
      const gotFrom = sdk!!.hasReadOnlyRPCCalls()
        ? "infura"
        : "MetaMask provider";
      setResponse(`(${gotFrom}) ${result}`);
    } catch (e) {
      console.log(`error getting the blockNumber`, e);
      setResponse("error getting the blockNumber");
    }
  };

  const terminate = () => {
    // sdk?.terminate();
    setChain("");
    setAccount("");
    setResponse("");
  };
  // ###########################################

  useEffect(() => {
    console.log("account:: ", account);
    account && onClose();
  }, [account]);

  // useEffect(() => {
  //   account && connect();

  // }, []);
  const [dc, setDc] = useState(false);

  const disconnect = () => {
    setIsDisconecting(true);
    sdk
      ?.disconnect()
      .then(() => {
        setIsDisconecting(true);
        setAccount("");
        setTimeout(() => {
          setIsDisconecting("ok");
        }, 1000);
      })
      .catch((e) => {
        setIsDisconecting(false);
        console.log("error disconnecting", e);
      });
    terminate();
    setDc(false);
  };

  useEffect(() => {
    if (!isModalOpen) {
      if (isDisconecting === "ok") {
        setIsDisconecting(false);
      }
    }
  }, [isModalOpen]);

  const [showDisconnect, setShowDisconnect] = useState(false);
  const disconnectButtonRef = useRef<HTMLDivElement>(null);
  const isDisconected = isDisconecting === "ok";
  const handleClick = () => {
    if (!account) {
      if (!isRegistred) {
        onOpen();
      } else {
        connect();
      }
    } else if (showDisconnect) {
      // Закрываем дисконнект при повторном нажатии
      handleClose();
    } else {
      if (isMobile) {
        setIsModalOpen(true);
      } else {
        setShowDisconnect(true);
        setTimeout(() => setDc(true), 10); // Небольшая задержка для плавного появления
      }
    }
  };

  const handleClose = () => {
    setDc(false);
    setTimeout(() => setShowDisconnect(false), 300); // Задержка перед удалением компонента из DOM
  };

  // Закрытие при клике вне элемента DisconnectButton
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        disconnectButtonRef.current &&
        !disconnectButtonRef.current.contains(event.target)
      ) {
        handleClose();
      }
    };

    if (showDisconnect) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDisconnect]);

  return (
    <>
      <div className="relative" style={{ width: isMobile ? "100%" : "unsed" }}>
        <button
          className="font-bold text-sm text-white py-[14px] px-[42px] rounded-lg bg-[#FFFFFF] bg-opacity-5 backdrop-blur-md ease-in-out duration-200 hover:bg-opacity-0 hover:outline"
          style={{ width: isMobile ? "100%" : "auto" }}
          onClick={handleClick}
        >
          {`${
            account
              ? account?.substring(0, 5) +
                "..." +
                account?.substring(account?.length - 5, acc?.length)
              : "Connect"
          }`}
        </button>
        {!isMobile && showDisconnect && (
          <div
            ref={disconnectButtonRef}
            className={`absolute top-1 right-0 translate-y-full transition-all duration-300 transform z-[100] ${
              dc ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <DisconnectButton disconnect={disconnect} />
          </div>
        )}
      </div>

      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
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
                  {"Connect your wallet"}
                </p>
                <Image
                  src={x}
                  onClick={onClose}
                  alt=""
                  width={14}
                  height={14}
                  className="absolute  top-0 right-0 -translate-x-full translate-y-full cursor-pointer"
                />
              </div>
              <div className="text-xs mb-8 mr-12">
                <p className="text-white/[.58]">
                  If you come from a friend and you have alink or code. You can
                  specify it and get{" "}
                  <span className="font-extrabold text-[#BCFE1E] opacity-80">
                    123 points{" "}
                  </span>
                  of rewards at once.
                </p>
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="A0-B1-C2"
                  className="bg-[#322356] pb-2 pt-8 px-2 w-full rounded-[10px] focus:outline-none text-white/[.58]"
                  onChange={(e) => setReferral(e.target.value)}
                />
                <span className="absolute top-2 left-2 text-[11px] text-white/[.58]">
                  Code
                </span>
              </div>
            </ModalBody>
            <ModalFooter>
              <button
                className="rounded-lg bg-white bg-opacity-5 text-white font-bold py-[14px] px-[42px] mr-6"
                onClick={connect}
              >
                Submit
              </button>
              <button
                className="relative flex items-center gap-[11px] rounded-lg bg-transparent bg-opacity-5 text-white font-bold py-[14px] group"
                onClick={connect}
              >
                Skip
                <div className="flex">
                  <Image
                    src={skip}
                    alt=""
                    className="transition-transform duration-300 ease-in-out transform group-hover:scale-x-150 group-hover:origin-left"
                  />
                </div>
              </button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="xl"
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          style={{
            maxWidth: isMobile ? "90%" : "",
            backgroundColor: "rgb(19 16 36 / 84%)",
          }}
        >
          <ModalBody>
            <div
              style={{
                ...boxStyle,

                flexDirection: "column",
              }}
            >
              <p
                className="mt-4 text-white text-[24px] items-center"
                style={{ textAlign: "center" }}
              >
                {isDisconected ? "Wallet disconnected" : "Disconnect wallet?"}
              </p>
              <button
                style={{
                  ...btnStyle,
                  backgroundColor: isDisconected ? "#BCFE1E" : "#FFFFFF0D",
                  color: isDisconected ? "#000" : "#FFFFFF",
                }}
                onClick={
                  isDisconected
                    ? () => {
                        setIsModalOpen(false);
                        router.replace("/");
                      }
                    : disconnect
                }
              >
                {isDisconecting && !isDisconected ? (
                  <>
                    Disconnecting...
                    <Spinner />
                  </>
                ) : isDisconected ? (
                  "Story"
                ) : (
                  "Disconnect"
                )}
              </button>
            </div>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}