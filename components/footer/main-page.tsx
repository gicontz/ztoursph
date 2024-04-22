import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Image from "next/image";
import { ConfigProvider, Divider, Input } from "antd";
import styled from "@emotion/styled";
import Logo from "@assets/images/logo.png";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TelephoneIcon,
} from "@components/commons/icons";
import Button from "@components/commons/button";
import Link from "next/link";
import { PanelSection } from "@components/commons/common";

const FooterContainer = styled(PanelSection)`
  display: flex;
  padding-top: 1rem;
  padding-bottom: 1rem;
  flex-direction: column;
  background-color: rgba(12, 16, 17, 1);
  font-size: 0.7rem;
  color: white;
  justify-content: center;
  gap: 0.9rem;
`;

const HeaderText = styled.h4`
  font-size: 1rem;
  color: #c5fbd8;
`;

const Panel = styled.div`
  margin: 0 6rem;
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
  margin-top: 2rem;
  justify-content: center;
  justify-items: left;
  grid-template-columns: repeat(4, 1fr);

  @media screen and (max-width: 850px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Contents = styled.div`
  display: grid;
  grid-template-rows: 30px 1fr;
  margin-bottom: 10px;

  h4 {
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

const StyledLink = styled(Link)`
  transition: font-weight 0.1s ease, font-size 0.1s ease, color 0.1s ease;
  color: inherit;

  &:hover {
    color: #c5fbd8;
  }
`;

const MainPageFooter = () => {
  const { handleSubmit, control } = useForm();

  const onSubmit: SubmitHandler<{ email: string }> = (data) =>
    console.log(data);

  return (
    <FooterContainer>
      <PanelContents>
        <Contents>
          <HeaderText>Content</HeaderText>
          <ul>
            <li>
              <StyledLink href="/about-us">About us</StyledLink>
            </li>
            <li>
              <StyledLink href="/faq">FAQ</StyledLink>
            </li>
            <li>
              <StyledLink href="/cookies-policy">Cookies Policy</StyledLink>
            </li>
          </ul>
        </Contents>

        <Contents>
          <HeaderText>Tours</HeaderText>
          <ul>
            <li>
              <StyledLink href="/packages/expedition-tour">
                Expedition Tour
              </StyledLink>
            </li>
            <li>
              <StyledLink href="/tours/el-nido-island-hopping-tour-a">
                Elnido Island Hopping Tour A
              </StyledLink>
            </li>
            <li>
              <StyledLink href="/tours/el-nido-island-hopping-tour-b">
                Elnido Island Hopping Tour B
              </StyledLink>
            </li>
            <li>
              <StyledLink href="/tours/el-nido-island-hopping-tour-c">
                Elnido Island Hopping Tour C
              </StyledLink>
            </li>
          </ul>
        </Contents>

        <Contents>
          <HeaderText>Our Activities</HeaderText>
          <ul>
            <li>El Nido Island Hopping</li>
            <li>El Nido Expeditions</li>
            <li>Beach Relaxation</li>
            <li>PPC Underground River Tou</li>
            <li>City Tour</li>
            <li>Scuba- Diving</li>
            <li>Canopy Walk Adventure</li>
          </ul>
        </Contents>

        <Contents>
          <HeaderText>Contact</HeaderText>
          <ul>
            <li>
              <StyledLink href="/contact-us">Contact us</StyledLink>
            </li>
          </ul>
        </Contents>
      </PanelContents>

      <PanelMessage>
        <HeaderText>Sign-up to our Newsletter</HeaderText>
        <div>
          <p>
            Hola! If you want to get updated and catch the latest offers of
            ZTours.ph, just type your email and shoot it by clicking the
            &quot;Submit&quot; button.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  className="h-10 text-base lg:text-lg"
                  placeholder="ztoursph@gmail.com"
                  type="email"
                />
              )}
            />

            <Button className="h-10" type="primary" htmlType="submit">
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
            <p>+63 966 442 8625</p>
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
