import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import { ConfigProvider, Divider } from "antd";
import styled from "@emotion/styled";
import Logo from "@assets/images/logo.png";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TelephoneIcon,
} from "@components/commons/icons";
import Button from "@components/commons/button";
import { CustomInput } from "@components/commons/input";
import Link from "next/link";

const FooterContainer = styled.div`
  display: flex;
  padding-bottom: 1rem;
  flex-direction: column;
  background-color: #0c1011;
  font-size: 0.7rem;
  color: white;
  justify-content: center;
`;

const HeaderText = styled.h1`
  font-size: 1rem;
  color: #c5fbd8;
`;

const Panel = styled.div`
  margin: 10px 6rem;
  @media screen and (max-width: 600px) {
    margin: 0 3rem;
  }
`;

const PanelContact = styled(Panel)`
  div {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
  }
`;

const PanelMessage = styled(Panel)`
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
    gap: 0.8rem;
    flex-wrap: nowrap;
    @media screen and (max-width: 900px) {
      flex-wrap: wrap;
    }
  }

  form {
    display: flex;
    gap: 0.1rem;
    @media screen and (max-width: 900px) {
      width: 100%;
    }
  }

  p {
    width: 50%;
    @media screen and (max-width: 900px) {
      width: 100%;
    }
  }

  input {
    width: 20rem;
    @media screen and (max-width: 900px) {
      width: 100%;
    }

    @media screen and (max-width: 500px) {
      width: 100%;
      height: 2rem;
    }
  }
  button {
    @media screen and (max-width: 700px) {
      height: 2rem;
    }
  }
`;

const PanelContents = styled(Panel)`
  display: grid;
  margin-top: 4rem;
  justify-content: center;
  justify-items: left;
  grid-template-columns: repeat(4, 1fr);

  @media screen and (max-width: 850px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 600px) {
    margin-top: 3rem;
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Contents = styled.div`
  display: grid;
  grid-template-rows: 30px 1fr;
  margin-bottom: 10px;

  h1 {
    grid-row-start: 1;
    margin-bottom: 0.2rem;
  }

  ul {
    grid-row-start: 2;
    font-size: 0.7rem;
  }

  li {
    margin-bottom: 0.1rem;
  }
`;

const SocialMediaIcons = styled.div`
  display: flex;
  align-items: center;

  svg {
    box-size: 5;
    margin-right: 0.5rem;
  }
`;

const Icons = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 1rem;
  @media screen and (max-width: 500px) {
    flex-wrap: wrap;
    gap: 1rem;
  }
`;

const MainPageFooter = () => {
  const { handleSubmit, control } = useForm();

  const onSubmit: SubmitHandler<{ email: string }> = (data) => {
    console.log(data);
  };

  return (
    <FooterContainer>
      <PanelContents>
        <Contents>
          <HeaderText>Content</HeaderText>
          <ul>
            <li>About us</li>
            <li>Our history</li>
            <li>Why us?</li>
          </ul>
        </Contents>

        <Contents>
          <HeaderText>Tours</HeaderText>
          <ul>
            <li>Elnido Island Tour A</li>
            <li>Elnido Island Tour B</li>
            <li>Elnido Island Tour C</li>
          </ul>
        </Contents>

        <Contents>
          <HeaderText>Our Activities</HeaderText>
          <ul>
            <li>Island Hopping</li>
            <li>Hidden Lagoon Exploration</li>
            <li>Beach Relaxation</li>
            <li>Snorkeling Adventures</li>
            <li>Kayaking Tours</li>
            <li>Hiking to Viewpoints</li>
          </ul>
        </Contents>

        <Contents>
          <HeaderText>Support</HeaderText>
          <ul>
            <li>Text 1</li>
            <li>Text 2</li>
            <li>Text 3</li>
          </ul>
        </Contents>
      </PanelContents>

      <PanelMessage>
        <HeaderText>Sign-up to our Newsletter</HeaderText>
        <div>
          <p>
            {
              "Provide your email, and we'll get in touch promptly. Reserve your memorable experience with us 😊"
            }
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CustomInput
              control={control}
              name="email"
              placeholder="ztoursph@gmail.com"
              type="email"
              rules={{ required: "Email is needed." }}
            />
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </form>
        </div>
      </PanelMessage>

      <PanelContact>
        <ConfigProvider
          theme={{
            token: {},
            components: {
              Divider: {
                colorSplit: "#c5fbd8",
              },
            },
          }}>
          <Divider plain orientation="left">
            <Image src={Logo} width={200} alt="ZToursPH" />
          </Divider>
        </ConfigProvider>

        <Icons>
          <p>ⓒ 2024 ZToursPH</p>
          <SocialMediaIcons>
            <TelephoneIcon boxSize={4} />
            <p>+63 960 353 4800</p>
          </SocialMediaIcons>

          <SocialMediaIcons>
            <Link target="_blank" href="https://www.facebook.com/ZTours.Ph">
              <FacebookIcon boxSize={5} />
            </Link>
            <Link target="_blank" href="https://www.facebook.com/ZTours.Ph">
              <InstagramIcon boxSize={5} />
            </Link>
            <Link target="_blank" href="https://www.facebook.com/ZTours.Ph">
              <LinkedInIcon boxSize={5} />
            </Link>
          </SocialMediaIcons>
        </Icons>
      </PanelContact>
    </FooterContainer>
  );
};

export default MainPageFooter;
