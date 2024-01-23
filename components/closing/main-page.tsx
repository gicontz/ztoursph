import { FullWidth, PanelSection } from "@components/commons/common";
import styled from "@emotion/styled";
import sunset from "@assets/images/sunsets.jpg";
import Link from "next/link";

const ClosingContainer = styled(FullWidth)`
  background: linear-gradient(
      to top,
      rgba(12, 16, 17, 1),
      rgba(12, 16, 17, 0.4),
      rgba(0, 0, 0, 0)
    ),
    url(${sunset.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  color: white;
  &::after {
    content: url("");
  }
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
  width: 43%;

  font-size: 0.9rem;
  gap: 0.5rem;

  @media screen and (max-width: 700px) {
    padding: 1rem 0;
    font-size: 0.7rem;
    width: 100%;
  }

  h1 {
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
          <h1>Escape from your 9 to 5</h1>
          <p>
            We are happy to give you the best and memorable experience vacation
            here in El nido.
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

/*
import styled from "@emotion/styled";
import { FullWidth, PanelSection } from "@components/commons/common";
import woman from "@assets/images/purple_woman.png";
import { Rate } from "antd";

const TestimonialContainer = styled(FullWidth)`
  background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 0.9)
    ),
    url(${woman.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
  color: white;
`;

const Panel = styled(PanelSection)`
  display: flex;
  justify-content: flex-end;
  margin: 10px 3rem;
  height: 100%;
  @media screen and (max-width: 700px) {
    margin: 10px 0.5rem;
  }
`;

const TextsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 10px;
  width: 43%;

  font-size: 0.9rem;
  gap: 0.5rem;

  @media screen and (max-width: 700px) {
    padding: 1rem 0;
    font-size: 0.7rem;
    width: 100%;
  }

  h1 {
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

  .rate {
    display: flex;
    font-size: 0.7rem;
    align-items: start;
    gap: 1rem;
  }
`;

const StyledRate = styled(Rate)`
  color: white;
  pointer-events: none;
  .ant-rate-star-second {
    background-color: #1bb580;
    border-radius: 1px;
    padding: 0.2rem;
    font-size: 10px;
  }
  .ant-rate-star-first {
    font-size: 10px;
    padding: 0.2rem;
  }
`;

const MainPageTestimonial = () => {
  return (
    <TestimonialContainer>
      <Panel>
        <TextsContainer>
          <h1>A truly wonderful experience</h1>
          <p>
            Brilliant for anyone looking to get away from the hustle and bustle
            of city life or detox from their tech for a few days. I could have
            stayed another week!
          </p>
          <p>
            They really have thought about everything here down to the finest
            details.
          </p>
          <div className="rate">
            <StyledRate disabled allowHalf defaultValue={4.8} />
            <p>Rating 4.8</p>
          </div>
        </TextsContainer>
      </Panel>
    </TestimonialContainer>
  );
};

export default MainPageTestimonial;

*/
