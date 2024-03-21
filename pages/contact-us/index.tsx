import Button from "@components/commons/button";
import { PanelSection } from "@components/commons/common";
import {
  MapIcon,
  EmailIcon,
  FacebookDarkIcon,
  InstagramDarkIcon,
  TelephoneIcon
} from "@components/commons/icons";

import Layout from "@components/pages/layout";
import PageBanner from "@components/pages/page-banner";
import styled from "@emotion/styled";
import { Input } from "antd";
import Link from "next/link";
import React, { ReactNode } from "react";
import { useForm } from "react-hook-form";
const { TextArea } = Input;

const Panel = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContactContainer = styled(PanelSection)`
  padding: 2rem 7rem;
  display: flex;
  width: 100%;
  padding-bottom: 10rem;
  justify-content: space-around;
  gap: 1rem;

  @media screen and (max-width: 800px) {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem;
  }
  h2 {
    font-weight: 900;
    font-size: 1.4rem;
    color: #233d2c;
  }

  strong {
    font-size: 1.7rem;
  }
`;

const ContactDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  width: 25rem;
  ul {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    width: 100%;
  }
  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;
const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30rem;
  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0.3rem 0;
  gap: 0.3rem;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  p {
    font-size: 0.8rem;
  }
`;

const InputStyled = styled(Input)`
  height: 3rem;
  border: 0.13rem solid #233d2c;
  &:hover {
    border-color: #233d2c;
  }
`;

const TextAreaStyled = styled(TextArea)`
  height: 3.2rem;
  border: 0.13rem solid #233d2c;
  resize: none !important;
  &:hover {
    border-color: #233d2c;
  }
`;

const SubmitButton = styled(Button)`
  padding: 0 1.6rem;
  font-weight: bold;
  font-size: 1rem;
  width: 100%;
  height: 3rem;
`;

const Map = styled.iframe`
  width: 100%;
  height: 12rem;
`;

type TextWithIconProps = {
  icon: ReactNode;
  children: string;
  link?: string;
};

const TextWithIcon: React.FC<TextWithIconProps> = ({
  icon,
  link,
  children,
}) => (
  <Link
    className="flex items-center gap-2"
    style={{
      pointerEvents: link ? "auto" : "none",
      cursor: link ? "pointer" : "",
      width: "fit-content",
    }}
    target="_blank"
    href={link || "none"}>
    {icon} <p>{children}</p>
  </Link>
);

const Contact = () => {
  const { handleSubmit, register } = useForm();
  const handleMessage = (e) => {
    console.log(e);
  };
  return (
    <Layout>
      <Panel>
        <PageBanner
          title="Contact us"
          description="Know the answers at your fingertips! Every queries and feedback matters to us. Yes! Our lines are always open at your most convenient time."
          bannerImage="https://a.cdn-hotels.com/gdcs/production13/d1585/20120d80-bf76-4553-89f4-0098f94423d8.jpg"
        />
        <ContactContainer>
        
          <div className="flex flex-col gap-4">
            <ContactDetail>
              <h2>Our Contact Information</h2>
              <ul>
              <li>
                  <TextWithIcon icon={<TelephoneIcon boxSize={5} />}>
                  0966-442-8625
                  </TextWithIcon>
                </li>
                <li>
                  <TextWithIcon icon={<TelephoneIcon boxSize={5} />}>
                  0962-078-7353
                  </TextWithIcon>
                </li>
                <li>
                  <TextWithIcon icon={<EmailIcon boxSize={5} />}>
                    ztours@ztours.com
                  </TextWithIcon>
                </li>
                <li>
                  <TextWithIcon icon={<MapIcon boxSize={5} />}>
                    Rizal Street Brgy. Maligaya El Nido, Palawan 5313, El Nido,
                    Philippines
                  </TextWithIcon>
                </li>
                <li className="w-full h-auto ">
                  <Map src="https://maps.google.com/maps?q=Z+Tours.ph+Travel+and+Tours/@11.17836,119.3896885,21z&amp;t=&amp;z=18&amp;ie=UTF8&amp;iwloc=&amp;output=embed" />
                </li>
              </ul>
            </ContactDetail>
            <ContactDetail>
              <h2>Support us on Social Media</h2>
              <ul>
                <li>
                  <TextWithIcon
                    icon={<FacebookDarkIcon boxSize={5} />}
                    link="https://www.facebook.com/ZTours.Ph">
                    ZTours.Ph
                  </TextWithIcon>
                </li>
                <li>
                  <TextWithIcon icon={<InstagramDarkIcon boxSize={5} />}>
                    ZTours
                  </TextWithIcon>
                </li>
              </ul>
            </ContactDetail>
          </div>

          <MessageContainer>
            <div>
              <h2>Send Us a Message</h2>
              <p>Lorem ipsum dolor sit amet </p>
            </div>

            <Form onSubmit={handleSubmit(handleMessage)}>
              <Label {...register("name")}>
                <p>Name</p>
                <InputStyled id="name" type="text" />
              </Label>
              <Label {...register("email")}>
                <p>Email</p>
                <InputStyled id="email" type="email" />
              </Label>
              <Label {...register("message")}>
                <p>Message</p>
                <TextAreaStyled id="message" rows={5} />
              </Label>
              <Label></Label>
              <SubmitButton htmlType="submit" type="primary">
                Send Message
              </SubmitButton>
            </Form>
          </MessageContainer>
        </ContactContainer>
      </Panel>
    </Layout>
  );
};

export default Contact;
