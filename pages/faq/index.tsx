import Button from "@components/commons/button";
import { PanelSection, StyledDivider } from "@components/commons/common";
import Layout from "@components/pages/layout";
import PageBanner from "@components/pages/page-banner";
import styled from "@emotion/styled";
import { Poppins } from "next/font/google";
import React from "react";
import Category from "@components/faq/faq-category";
import HeaderSection from "@components/commons/header-section";

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

  h2,
  h1 {
    font-weight: 400;
    font-size: 1.4rem;
    color: #233d2c;
  }

  strong {
    font-size: 1.7rem;
  }
`;

const StyledButton = styled(Button)<{ onClickCategory: boolean }>`
  height: fit-content;
  padding: 0;
  margin: 0;
  transition: font-weight, font-size 0.1s ease;
  font-size: ${(props) => (props.onClickCategory ? "1.4rem" : "1rem")};
  font-weight: ${(props) => (props.onClickCategory ? "700" : "400")};
  ${(props) => (props.onClickCategory ? "700" : "400")};
  @media screen and (max-width: 800px) {
    font-size: 1.1rem;
  }
`;

const StyledCategory = styled(Category)`
  width: 20rem;
`;

const FreaquentlyAskQuestion = () => {
  const [category, setCategory] = React.useState("About us");

  const handleCategoryClick = (categoryName) => {
    setCategory(categoryName);
  };

  return (
    <Layout>
      <Panel>
        <PageBanner
          title="FAQ's"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et nunc sapien. Aliquam vestibulum congue odio. "
          bannerImage="https://static.saltinourhair.com/wp-content/uploads/2019/02/23121212/things-to-do-el-nido-island-hopping-tour-2.jpg"
        />
        <FAQCategoryContainer>
          <div>
            <HeaderSection>Question Category</HeaderSection>
            <ul>
              {["About us", , "Our Tours", "Legals", "Contact"].map((item) => (
                <li key={item}>
                  <StyledButton
                    className={poppins.className}
                    onClick={() => handleCategoryClick(item)}
                    onClickCategory={category === item}
                    type="link">
                    {item}
                  </StyledButton>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h2>
              Frequently Asked Questions <strong>{category}</strong>
            </h2>
            <StyledCategory category={category} />
          </div>
        </FAQCategoryContainer>
      </Panel>
    </Layout>
  );
};

export default FreaquentlyAskQuestion;
