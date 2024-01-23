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
  height: 500px;
`;

const TextsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 10px;
  width: 43%;

  font-size: 0.9rem;
  font-weight: thin;
  gap: 0.5rem;

  h1 {
    font-family: "Source Serif Pro";
    font-weight: bold;
    font-size: 2.4rem;
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
