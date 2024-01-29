import FsLightbox from "fslightbox-react";
import { useState } from "react";
import Image from "next/image";
import styled from "@emotion/styled";

const ImageGridContainer = styled.div`
  width: 100%;
`;

const ImagesShow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  > img {
    flex-grow: 1;
    width: 15rem;
    height: 15rem;
    cursor: pointer;
    object-fit: cover;
    object-position: center;
    transition: transform 200ms ease-in, box-shadow 200ms ease-in,
      filter 200ms ease-in;

    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

    @media screen and (max-width: 740px) {
      width: 48%;
    }

    &:hover {
      transform: scale(1.01) translate(-0.5%, -0.5%);
      box-shadow: 0 4px 3px rgba(0, 0, 0, 0.5);
      filter: brightness(1.1);
    }
  }
`;

export interface ImageTemplateProps {
  data: { src: string | { src: string }; alt: string }[];
}

const ImageTemplate: React.FC<ImageTemplateProps> = ({ data }) => {
  const [slide, setSlide] = useState(0);
  const [toggler, setToggler] = useState(false);

  const src = data.map((e) => {
    return typeof e.src === "string" ? e.src : e.src.src;
  });

  const openBoxOnSlide = (e: number) => {
    setToggler(!toggler);
    setSlide(e + 1);
  };

  const contentImage = data.map((e, index) => (
    <Image
      key={index}
      src={typeof e.src === "string" ? e.src : e.src.src}
      alt={e.alt}
      onClick={() => openBoxOnSlide(index)}
      width={1000}
      height={350}
    />
  ));

  return (
    <ImageGridContainer>
      <FsLightbox toggler={toggler} slide={slide} sources={src} />
      <ImagesShow>{contentImage}</ImagesShow>
    </ImageGridContainer>
  );
};

export default ImageTemplate;
