import type { Metadata } from "next";
import "./globals.css";
import { Anonymous_Pro } from "next/font/google";
import localFont from "next/font/local";
import Header from "@/components/header";
import { Providers } from "@/app/providers";
import "./app.css";
import { ToastContainer, Flip } from "react-toastify"; // https://fkhadra.github.io/react-toastify/introduction
import "react-toastify/dist/ReactToastify.css";

const gotham = localFont({
  src: "../GothamPro.woff",
  display: "swap",
});

const anon = Anonymous_Pro({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anonymous-pro",
});

export const metadata: Metadata = {
  title: "Aspis",
  description: "Aspis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ToastContainer
        // hideProgressBar
        progressClassName={"progress-bar"}
        transition={Flip}
        position="top-right"
        limit={1}
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
      <body
        className={`${gotham.className} ${anon.variable} flex flex-col min-h-screen w-screen`}
      >
        <Providers>
          <Header />

          <style>
            {`
							body {
								background: fixed
	                                                                linear-gradient(
									251.46deg,
									#080813 27.03%,
									#4d0ab8 110.69%
								);
							}
						`}
          </style>
          {children}
          <script
            async
            src="https://telegram.org/js/telegram-widget.js?22"
            data-telegram-login="aspisChecker_bot"
            data-size="small"
            data-radius="10"
            data-auth-url="https://rewards.aspis.finance/"
            data-request-access="write"
          ></script>
        </Providers>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </body>
    </html>
  );
}
