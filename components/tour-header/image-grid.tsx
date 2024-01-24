import FsLightbox from "fslightbox-react";
import { useState } from "react";
import Image from "next/image";
import styled from "@emotion/styled";

const ImageGridContainer = styled.div`
  width: fit-content;
`;

const ImagesShow = styled.div`
  columns: 3;
  column-gap: 1rem;
  img {
    margin-bottom: 1rem;
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
      width={250}
      height={250}
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
