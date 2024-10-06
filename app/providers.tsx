"use client";

import { WalletProvider } from "@/hooks/WalletProvider";
import { MetaMaskProvider } from "@metamask/sdk-react";
import { SessionProvider } from "next-auth/react";

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../utils/modalTheme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <WalletProvider>
        <MetaMaskProvider
          debug={false}
          sdkOptions={{
            dappMetadata: {
              name: "Aspis",
              url: "https://hedfkoa.pw",
            },
            infuraAPIKey: "8dfa517f5f87445bbee9c3d303e26f8a",
          }}
        >
          <SessionProvider>{children}</SessionProvider>
        </MetaMaskProvider>
      </WalletProvider>
    </ChakraProvider>
  );
}
