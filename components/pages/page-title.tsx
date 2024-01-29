import styled from "@emotion/styled";
import React from "react";

interface Props {
  title: string;
  bgImage: string | { src: string };
}

const TextHeader = styled.h1`
  text-align: center;
  display: flex;
  justify-content: center;
  width: 740px;
  font-family: "Source Serif Pro";
  font-size: 4rem;
  margin: auto;

  @media screen and (max-width: 740px) {
    width: 85%;
    font-size: 3rem;
  }
`;

interface HeaderContainerProps {
  bgImg: string | { src: string };
}

const HeaderContainer = styled.div<HeaderContainerProps>`
  position: relative;
  padding: 1rem 3rem;
  height: fit-content;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${({ bgImg }) =>
      typeof bgImg === "string" ? bgImg : bgImg.src});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    filter: brightness(85%);
    z-index: -1;
  }
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
