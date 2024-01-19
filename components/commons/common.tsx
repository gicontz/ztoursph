import styled from "@emotion/styled";

export const Row = styled.div`
  max-width: 1444px;
  width: 100%;
  margin: 0 auto;
`;

export const FullWidth = styled.div`
  width: 100%;
  @media screen and (max-width: 1440px) {
    padding-left: 30px;
    padding-right: 30px;
  }
`;

export const PanelSection = styled.div`
  padding: 100px 5rem;

  @media (max-width: 1200px) {
    padding: 80px 3rem;
  }

  @media (max-width: 768px) {
    padding: 60px 2rem;
  }

  @media (max-width: 480px) {
    padding: 40px 1rem;
  }
`;
