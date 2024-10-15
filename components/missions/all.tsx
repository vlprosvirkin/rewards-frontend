"use client";

import Image from "next/image";
import A from "@/public/A.svg";
import { use, useEffect, useState } from "react";
import { getTasks } from "./getTasks";
import { LoadingTasks } from "./loading";
import { useSDK } from "@metamask/sdk-react";
import { checkTask } from "./checkTask";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { useWindowSize } from "@/hooks/useWindowSize";
import { getCode, mint } from "../InviteSection/getCode";
import { Spinner } from "../MintSection/Loader";
import { toast } from "react-toastify";

interface TaskItemProps {
  item: any;
  showModal: (item: any) => void;
  isComplete?: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({ item, showModal, isComplete }) => {
  const { isMobile } = useWindowSize();
  return (
    <div
      onClick={() => (isComplete ? null : showModal(item))}
      className="w-full flex border border-white/[.1] rounded-[18px] pt-8 pb-6 px-6 backdrop-blur-2xl bg-white/[.05]"
    >
      <div className="flex flex-col mr-5">
        <p className={`text-${isMobile ? "l" : "2xl"} mb-4`}>{item.name}</p>
        <p className={`text-[13px] text-white/[.58] mb-5`}>
          {item.description || "No description"}
        </p>
        <p className="text-[13px] font-bold">
          {item.category || "No category"}
        </p>
      </div>
      <div
        className="flex relative ml-auto bg-white/[.07] rounded-[10px]"
        style={{ height: isMobile ? 108 : 116, minWidth: isMobile ? 108 : 116 }}
      >
        {isComplete && (
          <div className="absolute left-1/2 transform -translate-x-1/2 -top-4 py-1 px-3 bg-[#313824] rounded-[30px]">
            <p className="text-[#BCFE1E]">{"Completed"}</p>
          </div>
        )}
        <Image src={A} width={isMobile ? 108 : 116} alt="" className="" />
        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-4 py-1 px-3 bg-[#313824] rounded-[30px]">
          <p className="text-[#BCFE1E]">{item.points}</p>
        </div>
      </div>
    </div>
  );
};

const group = (items: any): Record<string, any> => {
  return items.reduce((acc: any, item: any) => {
    let category = item.category || "No category";
    category = category.replace(/\s+/g, "_").toLowerCase();

    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, any>);
};

export default function AllTasks({ category }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTask, setSelectedTask] = useState<any | null>();
  const [tasks, setTasks] = useState<any>(null);
  const [sorted, setSorted] = useState<any>();
  const { account } = useSDK();
  const [taskStatus, setTaskStatus] = useState<string | undefined>();
  const { isMobile } = useWindowSize();
  const [user, setUser] = useState<any>(undefined);

  useEffect(() => {
    const userFromStorage = localStorage?.getItem("user");
    if (
      userFromStorage !== undefined &&
      userFromStorage !== null &&
      userFromStorage !== "undefined" &&
      userFromStorage !== "null"
    ) {
      setUser(JSON.parse(userFromStorage));
    }
  }, []);

  const [updateCount, setUpdateCount] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdateCount((prev) => prev + 1);
    }, 5000);

    // return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log("user", user);
    (async () => {
      if (account) {
        const user = await getCode(account);
        if (user) {
          localStorage?.setItem("user", JSON.stringify(user));
          setUser(user);
          console.log("user", user);
        }
      }
    })();
  }, [account, updateCount]);

  useEffect(() => {
    const doAsync = async () => {
      const data = await getTasks();
      setTasks(data);
    };
    doAsync();
  }, []);

  useEffect(() => {
    tasks && setSorted(group(tasks));
  }, [tasks]);

  useEffect(() => {
    console.log("Selected category:", category);
  }, [category]);

  const showModal = (item: any) => {
    setSelectedTask(item);
    onOpen();
  };

  const completeTask = async () => {
    if (!account || !selectedTask) return alert("Please connect your wallet");
    try {
      setTaskStatus("Verifying...  ");
      toast.loading("Verifying task completion...");
      // toast.loading("Verifying task completion...");
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const res = await checkTask(
        selectedTask?.id,
        account,
        selectedTask?.code
      );
      toast.dismiss();
      console.log("Task completion response:", res);
      if (res.message) {
        if (res.message && res.message === "Quest completed") {
          setTaskStatus("Success!");
          toast.success("Task completed successfully");
          const userData = user;
          userData.completedQuests.push(selectedTask);
          localStorage?.setItem("user", JSON.stringify(userData));
          setUser(userData);
        } else {
          setTaskStatus("Quest already completed");
        }
      } else if (res?.errors && res?.errors[0]) {
        setTaskStatus(res?.errors[0]);
        toast.error(res?.errors[0]);
      } else {
        setTaskStatus("Conditions not met");
      }
    } catch (e) {
      console.log(e);
      toast.error(String(e));
      setTaskStatus("Something went wrong.");
    }
  };
  useEffect(() => {
    if (!isOpen) setTaskStatus(undefined);
  }, [isOpen]);
  const categoryMap: Record<string, any> = {
    all: tasks || [],
    getting_started: sorted?.["getting_started"] || [],
    daily_tasks: sorted?.["daily_task"] || [],
    social_challenges: sorted?.["social_challenges"] || [],
    ambassadors: sorted?.["ambassadors"] || [],
  };
  const [isMinting, setIsMinting] = useState(false);
  const [text, setText] = useState();
  const [txHash, setTxHash] = useState();
  const [isError, setIsError] = useState(false);

  const mintNFTAdmin = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts: any = await window.ethereum.request({
          method: "eth_accounts",
        });
        const recipientAddress = accounts[0];
        console.log("recipientAddress", recipientAddress);
        setTaskStatus("Verifying...  ");
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
          }
          return { data: undefined };
        });
        setIsMinting(false);
        toast.dismiss();

        if (data.hash) {
          setTaskStatus("Success!");
          setTimeout(onClose, 2000);
          toast.success(`Minting successful! Transaction hash: ${data.hash}`);
        } else {
          !errText && setIsError(true);
        }
      } catch (error) {
        console.error("Error minting NFT:", error);
        setTaskStatus("Something went wrong.");
        setIsError(true);
        setIsMinting(false);
      }
    } else {
      toast.info("MetaMask is not installed");
    }
  };

  const taskList = categoryMap[category] || [];
  const isMint = selectedTask?.name === "Mint NFT";
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        key={`taskModal_${selectedTask?.id}`}
        isCentered
      >
        <ModalContent
          style={{
            maxWidth: isMobile ? "95%" : "700px",
            backgroundColor: "rgb(19 16 36 / 84%)",
          }}
        >
          <>
            <ModalBody className={"text-white"}>
              <div className="flex h-full">
                <div className="flex flex-col w-full">
                  <div className="w-full flex items-center">
                    <p className="mt-4 text-2xl mb-6">{selectedTask?.name}</p>
                  </div>
                  <div className="text-xs">
                    <p className="text-white/[.58] text-[13px] mb-6">
                      {selectedTask?.description}
                    </p>
                  </div>
                  {selectedTask?.link ? (
                    <a
                      href={selectedTask?.link}
                      className="py-[14px] px-[42px] rounded-lg mr-auto mt-auto text-black bg-[#BCFE1E] font-black text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Go!
                    </a>
                  ) : null}
                </div>
                <div
                  className={`flex flex-col ${
                    isMobile ? "" : "w-1/3"
                  } h-full mb-4`}
                >
                  <div className={`relative h-full`}>
                    <div className="flex relative ml-auto bg-white/[.07] rounded-[10px] mt-4">
                      <Image
                        src={A}
                        alt=""
                        className={
                          isMobile ? "h-[42px] w-[42px]" : "h-full w-full"
                        }
                      />
                      <div
                        className={`absolute left-1/2 bottom-0 translate-y-1/2 transform -translate-x-1/2 py-${
                          isMobile ? 1 : 2
                        } px-${isMobile ? 2 : 8} text-${
                          isMobile ? "xs" : "2xl"
                        } bg-[#313824] rounded-[30px]`}
                      >
                        <p className="text-[#BCFE1E]">{selectedTask?.points}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <div
                className={`flex bg-[#322356] p-4 rounded-[10px] w-full h-fit pb-4 ${
                  isMobile ? "flex-col" : "flex-row"
                }`}
                style={{ gap: isMobile ? 15 : 5 }}
              >
                <div
                  className={
                    "flex flex-col mr-4 h-fit" + isMobile ? "" : " w-full"
                  }
                >
                  <p className="text-[13px] font-bold text-white">
                    Have you completed this mission?
                  </p>
                  <div className="text-[11px] text-white/[.58] w-full">
                    Click the button to confirm (verification may take up to 24
                    hours). Please confirm within 7 days to complete this task.
                  </div>
                </div>
                <div className="flex text-center w-full my-auto ml-auto h-fit">
                  <button
                    onClick={isMint ? mintNFTAdmin : completeTask}
                    className="bg-white/[.05] py-[14px] ml-auto px-[42px] rounded-lg text-sm font-bold text-white w-fit h-fit m-auto"
                  >
                    {taskStatus ? taskStatus : "Confirm"}
                    {taskStatus === "Verifying...  " && <Spinner />}
                  </button>
                </div>
              </div>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>

      <div
        className={`grid grid-cols-${isMobile ? 1 : 2} sm:grid-cols-2 gap-[${
          isMobile ? 18 : 18
        }px] text-white w-full mb-8`}
      >
        {!tasks && <LoadingTasks />}
        {taskList.length === 0 ? (
          <p>No tasks found for this category.</p>
        ) : (
          taskList.map((item: any, index: any) => (
            <TaskItem
              isComplete={
                Boolean(
                  user &&
                    user.completedQuests?.find(
                      (q: any) => q.description === item.description
                    )
                ) ||
                (user?.hasMint && item.name === "Mint NFT")
              }
              key={`task_${index}`}
              item={item}
              showModal={showModal}
            />
          ))
        )}
      </div>
    </>
  );
}
