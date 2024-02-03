import { Row } from "@components/commons/common";
import MainPageFooter from "@components/footer/main-page";
import Header from "@components/header";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const Layout = ({ children }) => {
  return (
    <main
      className={`relative flex flex-col justify-between   overflow-x-hidden sm:w-[100%] h-screen App ${poppins.className}`}>
      <Row>
        <Header />
      </Row>
      {children}
      <MainPageFooter />
    </main>
  );
};

export default Layout;
