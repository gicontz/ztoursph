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
          <h1>Let the adventure begin! </h1>
          <p>
          Having a nature break is one of the best options for relaxation and self-reward; offering an escape from the unending hustle and bustle in your daily life. Take a pause, refresh your mind, and don't forget to have fun sometimes! In Z Tours.ph, your happiness and satisfaction are our priority.
          </p>
          <p>Spread the good news! Give us a quick review by sending your thoughts and success story of your travels with us! For we take those as our motivation to continuously provide you a better to best services in the near future encounter</p>
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
