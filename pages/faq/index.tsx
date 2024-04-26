import Button from "@components/commons/button";
import { PanelSection, StyledDivider } from "@components/commons/common";
import Layout from "@components/pages/layout";
import PageBanner from "@components/pages/page-banner";
import styled from "@emotion/styled";
import { Poppins } from "next/font/google";
import React from "react";
import Category from "@components/faq/faq-category";
import HeaderText from "@components/commons/header-text";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const Panel = styled.div`
  * {
    // border: 1px solid blue;
  }
  display: flex;
  flex-direction: column;
`;

const FAQCategoryContainer = styled(PanelSection)`
  padding: 3rem 7rem;
  display: flex;
  width: 100%;
  padding-bottom: 10rem;
  justify-content: space-around;
  @media screen and (max-width: 800px) {
    flex-direction: column;
    gap: 1.5rem;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    width: 20rem;
    @media screen and (max-width: 800px) {
      flex-direction: row;
      gap: 0.5rem;
    }
  }

  h2 {
    font-weight: 400;
    font-size: 1.4rem;
    color: #233d2c;
  }

  strong {
    font-size: 1.7rem;
  }
`;

const StyledButton = styled(Button)<{ highlightcategory: String }>`
  height: fit-content;
  padding: 0;
  margin: 0;
  transition: font-weight, font-size 0.1s ease;
  font-size: ${({ highlightcategory }) =>
    Boolean(highlightcategory) ? "1.4rem" : "1rem"};
  font-weight: ${({ highlightcategory }) =>
    Boolean(highlightcategory) ? "700" : "400"};
  ${({ highlightcategory }) => (Boolean(highlightcategory) ? "700" : "400")};
  @media screen and (max-width: 800px) {
    font-size: 1.1rem;
  }
`;

const StyledCategory = styled(Category)`
  width: 20rem;
`;

const FreaquentlyAskQuestion = () => {
  const [category, setCategory] = React.useState<{
    _cat: string;
    activeKey: string | undefined;
  }>({
    _cat: "About us",
    activeKey: "1",
  });
  const categoryArray = ["About us", "Our Tours", "Legals", "Contact"];

  React.useEffect(() => {
    const handleHashChange = () => {
      const [hash, activeKey] = window.location.hash
        .replace("#", "")
        .split("-");
      const _cat = hash.charAt(0).toUpperCase() + hash.slice(1);
      if (!_cat && !categoryArray.includes(_cat) && !activeKey) {
        setCategory((prev) => ({ ...prev, activeKey: undefined }));
      } else if (hash && activeKey) {
        setCategory({ activeKey, _cat });
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const handleCategoryClick = (categoryName) => {
    setCategory((prev) => ({ ...prev, _cat: categoryName }));
  };

  return (
    <Layout>
      <Panel>
        <PageBanner
          title="Frequently Asked Questions (FAQs)"
          description="Ask and know: This is a client’s go-to source of common queries, serving you clear and concise answers about the different services we offer."
          bannerImage="https://static.saltinourhair.com/wp-content/uploads/2019/02/23121212/things-to-do-el-nido-island-hopping-tour-2.jpg"
        />
        <FAQCategoryContainer>
          <div>
            <HeaderText>Question Category</HeaderText>
            <ul>
              {categoryArray.map((item) => (
                <li key={item}>
                  <StyledButton
                    className={poppins.className}
                    onClick={() => handleCategoryClick(item)}
                    highlightcategory={String(category._cat === item)}
                    type="link">
                    {item}
                  </StyledButton>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h2>
              Frequently Asked Questions <strong>{category._cat}</strong>
            </h2>
            <StyledCategory
              category={category._cat}
              activeKey={category.activeKey}
            />
          </div>
        </FAQCategoryContainer>
      </Panel>
    </Layout>
  );
};

export default FreaquentlyAskQuestion;
