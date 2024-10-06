"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import scrollSphere from "@/public/scrollSphere.svg";
import story from "./story.json";
import { useWindowSize } from "@/hooks/useWindowSize";
import { CoolButton } from "@/components";
import PulseLogoLoader from "@/components/PulseLogo";

export default function Story() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = story.length;
  const { windowSize, isMobile } = useWindowSize();

  const [spherePosition, setSpherePosition] = useState(0);

  useEffect(() => {
    const newPosition = (currentStep / (totalSteps - 1)) * 100;
    setSpherePosition(newPosition);
  }, [currentStep, totalSteps]);

  const goNext = () => {
    if (currentStep + 2 > story.length) {
      router.replace("/");
    } else if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  if (!windowSize?.width) return <PulseLogoLoader />;

  return (
    <main
      className={`flex px-10 w-full`}
      style={isMobile ? { maxHeight: "70%", marginTop: "90px" } : undefined}
    >
      <div
        className={`flex flex-col ml-[${
          isMobile ? 15 : 20
        }px] mt-1 text-white ${isMobile ? "" : "w-[80%]"}`}
      >
        <p className="text-[#BCFE1E] mb-3">
          {currentStep + 1}/{totalSteps}
        </p>
        <div
          className={`flex text-white text-anon text-[${
            isMobile ? 20 : 40
          }px] mr-4 ${isMobile ? "min-h-28" : ""}`}
        >
          <p>{story[currentStep]}</p>
        </div>
        {isMobile && <br />}
        {currentStep + 1 != totalSteps ? (
          <div className="mt-8 flex gap-10 mb-4">
            {isMobile ? (
              <CoolButton onClick={() => router.push("/")} text="Skip" />
            ) : (
              <button className="py-[14px] px-[17px] tracking-wider text-2xl">
                <span
                  className={
                    isMobile ? "" : "pb-[2px] border-b border-white/[.5]"
                  }
                >
                  Skip
                </span>
              </button>
            )}
            {isMobile ? (
              <CoolButton onClick={goNext} text="Next" color="green" />
            ) : (
              <button
                className={`py-[${isMobile ? 10 : 38}px] px-[${
                  isMobile ? 20 : 20
                }px] text-${isMobile ? "xl" : "2xl"} rounded-lg bg-white/[.05]`}
                onClick={goNext}
              >
                Next
              </button>
            )}
          </div>
        ) : isMobile ? (
          <CoolButton
            onClick={() => router.push("/missions")}
            text="How can i help?"
            color="green"
          />
        ) : (
          <button
            className="text-black font-bold py-[28px] px-[42px] bg-[#BCFE1E] text-[24px] mt-12 rounded-lg"
            onClick={() => router.push("/missions")}
          >
            How can i help?
          </button>
        )}
        {isMobile && (
          <div
            id="scroller"
            className="flex ml-auto flex-row items-center w-[50%] text-white/0 mt-3 mr-auto relative"
            style={{ position: "relative" }}
          >
            <div className="relative flex flex-row w-full h-[60px] m-auto">
              {" "}
              {/* Задаем фиксированную высоту шкале */}
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="w-[16.666%] relative flex justify-center" // Ширина каждого элемента
                >
                  <div className="absolute inset-0 flex justify-start items-center">
                    <div
                      className={`w-full h-[2px] ${
                        index <=
                        Math.floor((currentStep / (totalSteps - 1)) * 5)
                          ? "border-b-2 border-[#BCFE1E]"
                          : "border-b-2 border-[#383838]"
                      }`}
                    />
                  </div>
                </div>
              ))}
              <div
                className="absolute top-[0px] transform -translate-y-1/2 transition-transform duration-500 ease-in-out z-10"
                style={{
                  left: `${spherePosition}%`, // Управляем позицией ползунка по горизонтали
                }}
              >
                <Image
                  src={scrollSphere}
                  width={60}
                  height={60}
                  alt=""
                  className="absolute min-w-[60px] min-h-[60px] -top-[30px] left-0 transform translate-y-1/2"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {!isMobile && (
        <div
          id="scroller"
          className="flex ml-auto flex-col items-center w-max text-white/0 mt-20 mb-52 mr-12 relative"
        >
          <div className="relative flex flex-col h-full">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-[16.666%] relative flex justify-center"
              >
                {""}
                <div className="absolute inset-0 flex justify-center items-start">
                  <div
                    className={`h-full w-[2px] ${
                      index <= Math.floor((currentStep / (totalSteps - 1)) * 5)
                        ? "border-l-2 border-[#BCFE1E]"
                        : "border-l-2 border-[#383838]"
                    }`}
                  />
                </div>
              </div>
            ))}
            <div
              className="absolute left-[-30px] transform -translate-x-1/2 transition-transform duration-500 ease-in-out z-10"
              style={{
                top: `${spherePosition}%`,
              }}
            >
              <Image
                src={scrollSphere}
                width={60}
                height={60}
                alt=""
                className="absolute min-w-[60px] min-h-[60px] -left-[30px] top-0 transform translate-x-1/2"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
