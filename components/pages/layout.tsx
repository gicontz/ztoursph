import { Row } from "@components/commons/common";
import MainPageFooter from "@components/footer/main-page";
import Header from "@components/header";
import React, { useRef } from "react";
import { Poppins } from "next/font/google";
import { useInView } from "react-intersection-observer";
import CookiesPopUp from "@components/cookies/cookies-popup";

const defaultFont = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const Layout = ({ contained = false, children }) => {
  const { ref, inView } = useInView({ threshold: 0 });

  return (
    <main
      className={`relative flex flex-col overflow-x-hidden sm:w-[100%] h-[100vh] App ${defaultFont.className}`}>
      <Row
        ref={ref}
        className={`top-0 left-0 w-full absolute !max-w-full bg-white z-10`}>
        <Header />
      </Row>
      <Row
        className={`top-0 left-0 w-full !max-w-full bg-white z-1  ${
          inView
            ? "opacity-0 h-24 "
            : "ease-in-out duration-300 sticky opacity-1 z-20"
        }`}>
        <Header />
      </Row>
      <CookiesPopUp />
      {contained ? <div className="grow px-3">{children}</div> : children}
      <MainPageFooter />
    </main>
  );
};

export default Layout;
