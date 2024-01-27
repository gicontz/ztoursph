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
  > img {
    flex-grow: 1;
    width: 33%;
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
      height={350}
      className="cursor-pointer w-[250px] h-[350px] transition-transform 
      ease-linear duration-200 delay-100 
      hover:opacity-95 hover:transform hover:scale-105 hover:shadow-sm"
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
