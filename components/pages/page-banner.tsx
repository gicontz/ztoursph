import { classNames } from "@app/utils/helpers";
import styled from "@emotion/styled";
import { Source_Serif_4 } from "next/font/google";
import React from "react";

type PageBannerProps = {
  title: string;
  description: string;
  bannerImage: string | { src: string };
};

const SourceSans = Source_Serif_4({
  subsets: ["latin"],
  weight: ["900"],
});

const TextDescription = styled.h2`
  width: 70%;
  font-weight: 300;
  @media screen and (max-width: 700px) {
    width: 90%;
  }
`;

const Panel = styled.div<{ bannerImage: string | { src: string } }>`
  position: relative;
  display: flex;
  flex-direction: column;
  height: fit-content;
  color: white;
  padding: 5rem 7rem;
  background-image: linear-gradient(
      to right,
      rgba(12, 16, 17, 0.9),
      rgba(12, 16, 17, 0.1),
      rgba(0, 0, 0, 0)
    ),
    ${({ bannerImage }) =>
      typeof bannerImage === "string"
        ? `url(${bannerImage})`
        : `url(${bannerImage.src})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  transition: background-color 0.3s ease; /* Added transition for background-color */

  &:hover {
    background-color: rgba(
      255,
      255,
      255,
      0.1
    ); /* Change the background color on hover */
  }

  @media screen and (max-width: 700px) {
    padding: 3rem;
  }
`;

const PageBanner: React.FC<PageBannerProps> = ({
  title,
  description,
  bannerImage,
}) => {
  return (
    <Panel bannerImage={bannerImage}>
      <h1 className={classNames(SourceSans.className, "font-bold text-5xl lg:text-8xl")}>{title}</h1>
      <TextDescription>{description}</TextDescription>
    </Panel>
  );
};

export default PageBanner;
