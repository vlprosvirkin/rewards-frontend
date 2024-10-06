"use client";

import { CoolButton } from "@/components/CoolButton";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Mobile: React.FC = () => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col mx-[14px]">
      <p
        className={`text-xl text-anon tracking-wider mb-[18px] ${
          isExpanded ? "" : "line-clamp-4 overflow-hidden text-ellipsis"
        }`}
      >
        Join the Aspis Warriors Campaign to contribute to a narrative that not
        only celebrates historical valor but also champions the cause of
        protecting the future through advanced blockchain solutions. Together,
        we stand as a testament to the enduring power of strategic minds and
        brave hearts, even in the age of technology.
      </p>

      <div className="flex gap-[20px]">
        <CoolButton
          size="sm"
          color="green"
          text="Read Story"
          onClick={() => router.push("/story")}
        />
        <CoolButton
          size="sm"
          text={isExpanded ? "Hide" : "Show more"}
          onClick={toggleExpand}
        />
      </div>
    </div>
  );
};
