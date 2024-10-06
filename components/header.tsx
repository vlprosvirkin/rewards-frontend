"use client";
import { DesktopHeader } from "./DesktopHeader";
import { MobileHeader } from "./MobileHeader";
import { useWindowSize } from "@/hooks/useWindowSize";

export default function Header() {
  const { isMobile } = useWindowSize();

  return isMobile ? <MobileHeader /> : <DesktopHeader />;
}
