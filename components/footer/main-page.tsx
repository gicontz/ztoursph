import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import { ConfigProvider, Divider } from "antd";
import styled from "@emotion/styled";
import Logo from "@assets/images/logo.png";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
} from "@components/commons/icons";
import Button from "@components/commons/button";
import { CustomInput } from "@components/commons/input";

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem 1rem;
  background-color: #0c1011;
  font-size: 0.7rem;
  color: white;
  justify-content: center;
  gap: 1rem;
`;

const HeaderText = styled.h1`
  font-size: 1rem;
  color: #c5fbd8;
`;

const Panel = styled.div`
  margin: 0 100px;
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
    padding: 0.4rem 0;
    justify-content: space-between;
    align-items: center;
  }

  form {
    display: flex;
    gap: 0.1rem;
  }

  p {
    width: 100ch;
  }

  input {
    width: 20rem;
  }
`;

const PanelContents = styled(Panel)`
  display: grid;
  justify-content: center;
  justify-items: left;
  grid-template-columns: repeat(5, 1fr);
`;

const Contents = styled.div`
  display: grid;
  grid-template-rows: 30px 1fr;

  h1 {
    grid-row-start: 1;
  }

  ul {
    grid-row-start: 2;
    font-size: 0.7rem;
  }
`;

const SocialMediaIcons = styled.div`
  display: flex;

  svg {
    box-size: 5;
    margin-right: 0.5rem;
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
          </ul>
        </Contents>
        <Contents>
          <ul>
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
        <HeaderText>Message us</HeaderText>
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu
            aliquam ligula.Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Nunc eu aliquam ligula.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CustomInput
              control={control}
              name="email"
              placeholder="featurelisting@gmail.com"
              type="email"
              rules={{ required: "email is needed." }}
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
            <Image src={Logo} width={200} alt="s" />
          </Divider>
        </ConfigProvider>

        <div>
          <p>ⓒ 2024 ZToursPH</p>
          <SocialMediaIcons>
            <FacebookIcon boxSize={5} />
            <InstagramIcon boxSize={5} />
            <LinkedInIcon boxSize={5} />
          </SocialMediaIcons>
        </div>
      </PanelContact>
    </FooterContainer>
  );
};

export default MainPageFooter;
