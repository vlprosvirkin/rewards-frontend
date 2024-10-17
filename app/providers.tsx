"use client";

import { WalletProvider } from "@/hooks/WalletProvider";
import { MetaMaskProvider } from "@metamask/sdk-react";
import { ToastContainer, Flip } from "react-toastify";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../utils/modalTheme";
import { CacheProvider } from "@chakra-ui/next-js";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "@/context/UserContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToastContainer
        // hideProgressBar
        progressClassName={"progress-bar"}
        transition={Flip}
        position="top-right"
        autoClose={3000}
        limit={2}
        progressStyle={{ background: "#cac4d0", height: "2px" }}
        // bodyStyle={{
        //   maxWidth: "400px",
        //   borderRadius: "16px",
        //   position: "fixed",
        // }}
        style={{ borderRadius: "16px" }}
        theme="dark"

      // bodyStyle={{ background: "#0D001E" }}
      />
      <CacheProvider>
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
              <UserProvider>
                {children}
              </UserProvider>
            </MetaMaskProvider>
          </WalletProvider>
        </ChakraProvider>
      </CacheProvider>
    </>

  );
}
