"use client";
import { useSDK } from "@metamask/sdk-react";
import { DesktopHeader } from "./DesktopHeader";
import { MobileHeader } from "./MobileHeader";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useEffect, useState } from "react";
import { getCode } from "./InviteSection/getCode";

export default function Header() {
  const { isMobile } = useWindowSize();
  const { account } = useSDK();
  const [user, setUser] = useState<any>();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const doAsync = async () => {
      if (!account) return;
      const data = await getCode(`${account}`);
      setUser(data);
    };

    doAsync();
  }, [account, count]);

  useEffect(() => {
    setInterval(() => {
      setCount(count + 1);
    }, 2000);
  }, []);

  return isMobile ? (
    <MobileHeader user={user} account={account} />
  ) : (
    <DesktopHeader account={account} user={user} />
  );
}
