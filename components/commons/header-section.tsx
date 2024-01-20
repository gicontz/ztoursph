import styled from "@emotion/styled";
import React from "react";

const Combine = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;
const HeaderText = styled.h1`
  min-width: fit-content;
  font-weight: bold;
  font-size: 1.4rem;
  white-space: nowrap;

  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const HeaderSection = ({ children }) => {
  return (
    <Combine>
      <HeaderText>{children}</HeaderText>
      <svg width="110" height="2" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#F5B963" />
      </svg>
    </Combine>
  );
};

export default HeaderSection;
