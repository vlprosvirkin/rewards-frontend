import type { Metadata } from "next";
import "./globals.css";
import { Anonymous_Pro } from "next/font/google";
import localFont from "next/font/local";
import Header from "@/components/header";
import { Providers } from "@/app/providers";
import "./app.css";
import SessionWrapper from "./SessionWrapper";
import { Root } from "@/components/Root";


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
    <SessionWrapper>
      <html lang="en">
        <script
          async
          src="https://telegram.org/js/telegram-widget.js?22"
          data-telegram-login="aspisChecker_bot"
          data-size="small"
          data-radius="10"
          data-auth-url="https://rewards.aspis.finance/"
          data-request-access="write"
        ></script>
        <body
          className={`${gotham.className} ${anon.variable} flex flex-col min-h-screen w-screen`}
        >
          <Root>
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
            </Providers>
          </Root>
        </body>
      </html>
    </SessionWrapper>
  );
}
