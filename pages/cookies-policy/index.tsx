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
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum iaculis lectus, sed interdum velit convallis a. "
        bannerImage="https://a.cdn-hotels.com/gdcs/production13/d1585/20120d80-bf76-4553-89f4-0098f94423d8.jpg"
      />
      <CookiesContainer>
        <HeaderText size={2} underline>
          What are cookies?
        </HeaderText>
        <p>
          This Cookie Policy explains what cookies are and how we use them, the
          types of cookies we use i.e, the information we collect using cookies
          and how that information is used, and how to manage the cookie
          settings.
        </p>
        <p>
          Cookies are small text files that are used to store small pieces of
          information. They are stored on your device when the website is loaded
          on your browser. These cookies help us make the website function
          properly, make it more secure, provide better user experience, and
          understand how the website performs and to analyze what works and
          where it needs improvement.
        </p>
        <HeaderText size={2}>How do we use cookies?</HeaderText>
        <p>
          As most of the online services, our website uses first-party and
          third-party cookies for several purposes. First-party cookies are
          mostly necessary for the website to function the right way, and they
          do not collect any of your personally identifiable data.
        </p>
        <p>
          The third-party cookies used on our website are mainly for
          understanding how the website performs, how you interact with our
          website, keeping our services secure, providing advertisements that
          are relevant to you, and all in all providing you with a better and
          improved user experience and help speed up your future interactions
          with our website.
        </p>
      </CookiesContainer>
    </Layout>
  );
};

export default CookiesPolicy;
