import { Row } from "@components/commons/common";
import MainPageFooter from "@components/footer/main-page";
import Header from "@components/header";

const Layout = ({children}) => {
  return (
    <main className="relative flex flex-col overflow-x-hidden sm:w-[100%] h-[100vh] App">
      <Row>
        <Header />
      </Row>
      {children}
      <MainPageFooter />
    </main>
  )
};

export default Layout;