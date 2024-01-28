import styled from "@emotion/styled";
import React from "react";

interface Props {
  title: string;
  bgImage: string;
}

const TextHeader = styled.h1`
  text-align: center;
  width: 100%;
  font-family: "Source Serif Pro";
  font-size: 4rem;
  white-space: nowrap;

  @media screen and (max-width: 740px) {
    font-size: 3rem;
  }
`;

const HeaderContainer = styled.div<{ bgImg: string }>`
  background-image: url(${({ bgImg }) => bgImg});
  padding: 3rem;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const PageTitle: React.FC<Props> = ({ bgImage, title }) => {
  return (
    <HeaderContainer bgImg={bgImage}>
      <strong>
        <TextHeader className="text-white">{title}</TextHeader>
      </strong>
    </HeaderContainer>
  );
};

export default PageTitle;
