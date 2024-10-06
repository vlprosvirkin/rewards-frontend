"use client";

import { CoolButton } from "@/components/CoolButton";
import { useRouter } from "next/navigation";

export const Desktop: React.FC = () => {
  const router = useRouter();
  return (
    <div className="pl-[33px] flex flex-col h-full">
      <p className="mb-5 text-xl text-anon tracking-wider mr-[15px]">
        Join the Aspis Warriors Campaign to contribute to a narrative that not
        only celebrates historical valor but also champions the cause of
        protecting the future through advanced blockchain solutions. Together,
        we stand as a testament to the enduring power of strategic minds and
        brave hearts, even in the age of technology.
      </p>
      <div className="mt-auto">
        <CoolButton
          size="lg"
          text="Read story"
          color="green"
          onClick={() => router.push("/story")}
        />
      </div>
    </div>
  );
};
