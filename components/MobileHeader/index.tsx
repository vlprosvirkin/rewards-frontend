import logo from "@/public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import StoryImg from "@/public/images/story-mobile-icon.png";
import MissionImg from "@/public/images/mission-hub-icon.png";
import LeaderboardImg from "@/public/images/leaderboard-icon.png";
import CharactersImg from "@/public/images/characters-icon.png";
import ProfileImg from "@/public/images/profile-icon.png";
import CoinLogo from "@/public/coin-logo.png";
import { useEffect, useState } from "react";
import { useSDK } from "@metamask/sdk-react";
import { getCode } from "../InviteSection/getCode";
import ConnectWalletButton from "../connectWalletButton";
import { usePathname } from "next/navigation";

const links = [
  {
    title: "Story",
    href: "/",
    img: StoryImg,
  },
  {
    title: "Missions Hub",
    href: "/missions",
    img: MissionImg,
  },
  {
    title: "Leaderboard",
    href: "/leaderboard",
    img: LeaderboardImg,
  },
  {
    title: "Characters",
    href: "/characters",
    img: CharactersImg,
  },
];

const boxStyle = {
  display: "flex",
  padding: "10px 20px",
  justifyContent: "space-between",
  alignItems: "center",
};

export const MobileHeader = ({
  user,
  account,
}: {
  user: any;
  account: string | undefined;
}) => {
  const [points, setPoints] = useState<any>();
  const currentPath = usePathname();
  const pageName = currentPath?.split("/")[1];

  const [isVisible, setIsVisible] = useState(true); // Управляем видимостью
  const [lastScrollY, setLastScrollY] = useState(0); // Храним последнее положение прокрутки

  useEffect(() => {
    if (user) {
      setPoints(user.points);
    }
  }, [user]);
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // Проверяем направление прокрутки
    if (currentScrollY - 5 > lastScrollY) {
      // Если прокрутка вниз, скрываем навигацию
      setIsVisible(false);
    } else if (currentScrollY + 5 < lastScrollY) {
      // Если прокрутка вверх, показываем навигацию
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    // Добавляем обработчик прокрутки
    window.addEventListener("scroll", handleScroll);
    return () => {
      // Убираем обработчик при размонтировании компонента
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const pageLabel = (pageName: string) => {
    switch (pageName) {
      case "missions":
        return "Missions Hub";
      case "leaderboard":
        return "Leaderboard";
      case "characters":
        return "Characters";
      case "profile":
        return "Profile";
      default:
        return "Story";
    }
  };

  return (
    <>
      <header
        className="py-[18px] px-[10px]"
        style={{
          color: "rgb(255 255 255)",
          position: pageName == "" ? "relative" : "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 100,
        }}
      >
        {pageName !== "" && pageName !== "story" && (
          <span
            className="shadow"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              zIndex: -1,
              backgroundColor: "rgb(0 0 0 / 100%)",
              // background:
              //   "linear-gradient(180deg, rgb(0 0 0 / 100%) 80%, #00000000 100%)",

              height: "100px",
            }}
          />
        )}
        <div className="py-[10px] px-[10px] flex w-full" style={{}}>
          <Link href="/" className="mr-auto flex">
            <Image src={logo} alt="" className="my-auto" />
          </Link>
          <Link
            href="https://app.aspis.finance/"
            target="_blank"
            className={
              "flex text-white text-sm items-center font-bold ml-auto py-4 px-6 bg-white/[.05] rounded-lg"
            }
          >
            App
          </Link>{" "}
        </div>
        {pageName !== "" && pageName !== "story" && (
          <h1
            className="w-full"
            style={{ color: "white", fontSize: 24, padding: "0px 15px" }}
          >
            {pageLabel(pageName)}
          </h1>
        )}
        <div
          style={{
            width: "100%",
            height: "144px",
            background: "#0E0D19",
            position: "fixed",
            left: 0,
            zIndex: 100,
            padding: "10px",
            borderRadius: "10px 10px 0 0",
            transition: " bottom 0.3s ease-in-out",
            bottom: 0,
            // isVisible ? 0 : "-180px",
          }}
        >
          <div style={boxStyle}>
            {links.map((link, index) => (
              <Link
                href={link.href}
                key={index}
                className={
                  "flex items-center gap-2 mobile-nav-link" +
                  (pageName == link.href.replace("/", "") ? " active" : "")
                }
              >
                {link.img && (
                  <Image width={30} src={link.img} alt={link.title} />
                )}
              </Link>
            ))}
          </div>

          <div style={{ ...boxStyle, width: "100%" }}>
            <div
              style={{
                ...boxStyle,
                gap: 5,
                alignContent: "center",
                padding: 0,
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              {account && (
                <>
                  <Link
                    href="/profile"
                    className={
                      "flex items-center mobile-nav-link" +
                      (pageName === "profile" ? " active" : "")
                    }
                  >
                    <Image
                      width={30}
                      style={{ minWidth: 30 }}
                      src={ProfileImg}
                      alt="ProfileImg"
                    />{" "}
                    <span className="px-2">Profile</span>
                  </Link>
                  <span style={{ ...boxStyle, gap: 3, padding: 5 }}>
                    <Image
                      style={{ minWidth: 9 }}
                      width={9}
                      src={CoinLogo}
                      alt="CoinLogo"
                    />
                    <text>{points ?? 0}</text>
                  </span>
                </>
              )}

              <ConnectWalletButton />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
