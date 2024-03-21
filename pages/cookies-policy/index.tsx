import Layout from "@components/pages/layout";
import PageBanner from "@components/pages/page-banner";
import React from "react";
import styled from "@emotion/styled";
import { PanelSection } from "@components/commons/common";
import HeaderText from "@components/commons/header-text";

const CookiesContainer = styled(PanelSection)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 3rem;
`;

const CookiesPolicy = () => {
  return (
    <Layout>
      <PageBanner
        title="Cookies Policy"
        description="This is made to help our website remember information about your visit."
        bannerImage="https://a.cdn-hotels.com/gdcs/production13/d1585/20120d80-bf76-4553-89f4-0098f94423d8.jpg"
      />
      <CookiesContainer>
        <HeaderText size={2} underline>
          What are cookies?
        </HeaderText>
        <p>
        Cookies are tiny text files placed or used to store small pieces of information when you visit a website. This Cookies Policy outlines their purpose, which is to ensure and help make the website function properly, securely, and enhance the user's experience. It also details the types of cookies used, the information collected, and how to manage cookie settings for the best browsing.
        </p>
        <HeaderText size={2}>How Do We Utilize Cookies?</HeaderText>
        <p>
        Our website relies on both first-party and third-party cookies. First-party cookies are necessary for the best website functionality and do not collect personally identifiable data. Third-party cookies on our website aim to analyze the website's performance, understand interactions, maintain and ensure security services, deliver relevant advertisements, and overall enhance your user experience.
        </p>

        <HeaderText size={2}>What Do We Collect?</HeaderText>
        <p>
        Our website gathers certain types of information through using cookies. This may include your IP address, the device you're using, as well as personal information such as name, birthdate, age, sex, address, and phone number. We utilize cookies to understand how you engage with our website content. Rest assured that all the information or data we collected is well cared of in accordance with our privacy policy.</p>
      </CookiesContainer>
    </Layout>
  );
};

export default CookiesPolicy;
