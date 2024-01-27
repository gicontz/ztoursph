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
`;

const HeaderContainer = styled.div<{ bgImg: string }>`
  background-image: url(${({ bgImg }) => bgImg});    
  padding: 150px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const PageTitle:React.FC<Props> = ({
  bgImage,
  title
}) => {
  return (
    <HeaderContainer bgImg={bgImage}>
      <TextHeader className="text-white">
        <strong>{title}</strong>
      </TextHeader>
    </HeaderContainer>
  )
}

export default PageTitle;