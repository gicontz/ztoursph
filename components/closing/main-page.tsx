import { FullWidth, PanelSection } from "@components/commons/common";
import styled from "@emotion/styled";
import sunset from "@assets/images/sunsets.jpg";
import Link from "next/link";

const ClosingContainer = styled(FullWidth)`
  background: linear-gradient(
      to top,
      rgba(12, 16, 17, 1),
      rgba(12, 16, 17, 0.2),
      rgba(0, 0, 0, 0)
    ),
    url('/home-end-banner.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position-y: 84%;
  color: white;
`;

const Panel = styled(PanelSection)`
  display: flex;
  justify-content: flex-start;
  margin: 10px 2rem;
  height: 100%;
  @media screen and (max-width: 700px) {
    margin: 10px 0.5rem;
  }
`;

const TextsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 10px;
  width: 50%;

  font-size: 0.9rem;
  gap: 0.5rem;

  @media screen and (max-width: 700px) {
    padding: 1rem 0;
    font-size: 0.7rem;
    width: 100%;
  }

  h4 {
    width: 16ch;
    font-family: "Source Serif Pro";
    font-weight: bold;
    font-size: 2.4rem;
    @media screen and (max-width: 700px) {
      font-size: 2rem;
    }
  }

  p {
    margin: 5px 0;
  }

  a {
    width: fit-content;
    color: white;
    height: fit-content;
    border: white 1px solid;
    border-radius: 3px;
    padding: 0.4rem 0.8rem;
  }
`;

const MainPageClosing = () => {
  return (
    <ClosingContainer>
      <Panel>
        <TextsContainer>
          <h4>Yes, it&apos;s all adventure-packed indeed! </h4>
          <p>
          ZTours.ph is happy to provide you a variety of hassle-free tour packages and activities manually picked for you and your loved ones. 
          </p>
          <Link href="/tours" target="_blank">
            See All Tours
          </Link>
        </TextsContainer>
      </Panel>
    </ClosingContainer>
  );
};

export default MainPageClosing;
