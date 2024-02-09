import { PanelSection } from "@components/commons/common";
import {
  MapIcon,
  EmailIcon,
  FacebookIconDark,
  InstagramIconDark,
} from "@components/commons/icons";

import Layout from "@components/pages/layout";
import PageBanner from "@components/pages/page-banner";
import styled from "@emotion/styled";
import Link from "next/link";
import React, { ReactNode } from "react";

const Panel = styled.div`
  * {
    // border: 1px solid blue;
  }
  display: flex;
  flex-direction: column;
`;

const ContactContainer = styled(PanelSection)`
  padding: 3rem 7rem;
  display: flex;
  width: 100%;
  padding-bottom: 10rem;
  justify-content: space-around;
  gap: 1rem;

  @media screen and (max-width: 800px) {
    flex-direction: column;
    gap: 1.5rem;
  }
  h2 {
    font-weight: 900;
    font-size: 1.4rem;
    color: #233d2c;
  }

  div {
    width: 100%;
  }

  strong {
    font-size: 1.7rem;
  }
`;

const ContactDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  ul {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    width: 20rem;
    @media screen and (max-width: 800px) {
      flex-direction: row;
      gap: 0.5rem;
    }
  }
`;

type TextWithIconProps = {
  icon: ReactNode;
  text: string;
  link?: string;
};

const TextWithIcon: React.FC<TextWithIconProps> = ({ icon, text, link }) => (
  <Link
    className="flex items-center gap-2"
    style={{
      pointerEvents: link ? "auto" : "none",
      cursor: link ? "pointer" : "",
    }}
    target="_blank"
    href={link || "none"}>
    {icon} <h1>{text}</h1>
  </Link>
);

const Contact = () => {
  return (
    <Layout>
      <Panel>
        <PageBanner
          title="Contact us"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id est arcu. Nulla eros risus, maximus eget sem id."
          bannerImage="https://a.cdn-hotels.com/gdcs/production13/d1585/20120d80-bf76-4553-89f4-0098f94423d8.jpg"
        />
        <ContactContainer>
          <ContactDetail>
            <div>
              <h2>Our Location</h2>
              <ul>
                <li>
                  <TextWithIcon
                    icon={<EmailIcon boxSize={5} />}
                    text={"ztours@ztours.com"}
                  />
                </li>
                <li>
                  <TextWithIcon
                    icon={<MapIcon boxSize={5} />}
                    text={
                      "Rizal Street Brgy. Maligaya El Nido, Palawan 5313, El Nido, Philippines"
                    }
                  />
                </li>
              </ul>
            </div>
            <ContactDetail>
              <h2>Support us on Social Media</h2>
              <ul>
                <li>
                  <TextWithIcon
                    icon={<FacebookIconDark boxSize={5} />}
                    text={"ZTours.Ph"}
                    link="https://www.facebook.com/ZTours.Ph"
                  />
                </li>
                <li>
                  <TextWithIcon
                    icon={<InstagramIconDark boxSize={5} />}
                    text={"ZTours"}
                  />
                </li>
              </ul>
            </ContactDetail>
          </ContactDetail>

          <div>
            <h2>Send Us a Message</h2>
          </div>
        </ContactContainer>
      </Panel>
    </Layout>
  );
};

export default Contact;
