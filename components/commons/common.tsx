import styled from "@emotion/styled";
import { Divider } from "antd";

export const FullWidth = styled.div`
  width: 100%;
  @media screen and (max-width: 1440px) {
    padding-left: 30px;
    padding-right: 30px;
  }
`;

export const Row = styled.div`
  width: 100%;
  margin: 0 auto;
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

export const StyledDivider = styled(Divider)`
  border-top: 1px solid #23432c;
  margin: 10px 0;
`;
