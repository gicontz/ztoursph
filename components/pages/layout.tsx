import { Row } from "@components/commons/common";
import MainPageFooter from "@components/footer/main-page";
import Header from "@components/header";
import React from "react";
import { Poppins } from "next/font/google";
import { useInView } from "react-intersection-observer";
import CookiesPopUp from "@components/cookies/cookies-popup";

const defaultFont = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const Layout = ({ contained = false, children }) => {
  return (
    <main
      className={`relative flex flex-col overflow-x-hidden sm:w-[100%] h-[100vh] App ${defaultFont.className}`}>
      <Row
        className={`top-0 left-0 w-full  h-24 !max-w-full bg-white sticky opacity-1 z-20
        `}>
        <Header />
      </Row>
      <CookiesPopUp />
      {contained ? <div className="grow px-3">{children}</div> : children}
      <MainPageFooter />
    </main>
  );
};

export default Layout;
