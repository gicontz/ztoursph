import { Row } from "@components/commons/common";
import MainPageFooter from "@components/footer/main-page";
import Header from "@components/header";
import React from "react";
import { Poppins } from "next/font/google";

const defaultFont = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const Layout = ({ children }) => {
  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    if (e.currentTarget.scrollTop === 0) {
      document.getElementById("main-header")?.classList.remove("fixed");
    } else {
      document.getElementById("main-header")?.classList.add("fixed");
    }
  };

  return (
    <main
      className={`relative flex flex-col overflow-x-hidden sm:w-[100%] h-[100vh] App ${defaultFont.className}`}
      onScroll={handleScroll}>
      <Row
        id="main-header"
        className="top-0 left-0 w-full !max-w-full bg-white z-10">
        <Header />
      </Row>
      {children}
      <MainPageFooter />
    </main>
  );
};

export default Layout;
