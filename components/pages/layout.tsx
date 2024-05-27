import { Row } from "@components/commons/common";
import MainPageFooter from "@components/footer/main-page";
import Header from "@components/header";
import React, { useEffect, useRef } from "react";
import { Poppins } from "next/font/google";
import { InView, useInView } from "react-intersection-observer";
import CookiesPopUp from "@components/cookies/cookies-popup";
import { classNames } from "@app/utils/helpers";
import { useScroll } from "@app/utils/hooks";
import Head from "next/head";

const defaultFont = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const Layout = ({ contained = false, children }) => {
  const { ref, inView } = useInView({ threshold: 0, triggerOnce: true });
  const scrollY = useScroll();
  const sticky = scrollY >= 50;
  const isHome =
    typeof window !== "undefined" && window.location.pathname === "/";

  return (
    <>
    <Head>
      <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
      <meta
        id="meta-description"
        name="description"
        content="Travel Way Beyond Your Borders! Z Tours Philippines, Palawan Adventures."
        />
        <meta
          id="meta-keywords"
          name="keywords"
          content="Z Tours Philippines, Palawan Adventures, El Nido, Coron, Balabac"
          />
    </Head>
    <main
      className={`relative flex flex-col overflow-x-hidden sm:w-[100%] ${defaultFont.className}`}>
      <Row
        ref={ref}
        className={classNames(
          "top-0 left-0 w-full !max-w-full ease-in-out duration-300 opacity-1 z-20",
          isHome
            ? sticky
              ? "bg-white shadow-md fixed"
              : "bg-transparent text-white absolute"
            : "bg-white"
        )}>
        <Header sticky={sticky || !isHome} />
      </Row>
      <CookiesPopUp />
      {contained ? <div className="grow px-3">{children}</div> : children}
      <MainPageFooter />
    </main>
    </>
  );
};

export default Layout;
