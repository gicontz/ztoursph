import styled from "@emotion/styled";
import Image from "next/image";
import React, { useState } from "react";
import { Rate } from "antd";
import Link from "next/link";

const CardContainer = styled.div`
  position: relative;
  height: 27rem;
  width: 20rem;
  min-width: 12rem;
  border-radius: 5px;
  overflow: hidden;
  background-color: #2b3030;
  font-size: 16px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 800px) {
    height: 20rem;
    width: 15rem;
    font-size: 8px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 50%;
`;

const ActionButton = styled.div`
  border-radius: 3px;
  position: absolute;
  padding: 8px;
  top: 10px;
  right: 10px;
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.7rem 1rem;
  color: white;
  font-size: 20px;

  .location {
    color: #d7fff1;
    font-size: 0.8rem;

    @media (max-width: 800px) {
      font-size: 12px;
    }
  }

  @media (max-width: 800px) {
    font-size: 12px;
  }
`;

const TitlePriceContainer = styled.div`
  font-weight: bold;
  display: flex;
  justify-content: space-between;
`;

const ReviewsContainer = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  gap: 1rem;
  font-size: 0.8rem;
  bottom: 1rem;
  .ant-rate {
    font-size: 0.8rem;
    color: white;

    @media (max-width: 800px) {
      font-size: 0.5rem;
    }
  }

  @media (max-width: 800px) {
    font-size: 8px;
  }
`;

const DescriptionContainer = styled.h1`
  margin: 0.7rem 0 1rem 0;
  font-size: 0.75rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;

  @media (max-width: 800px) {
    font-size: 8px;
  }
`;

const SVGHeart = ({ width, height, color }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.0041 12.3826L1.52973 7.42397C-1.44548 4.44876 2.92807 -1.26363 7.0041 3.35785C11.0801 -1.26363 15.4339 4.4686 12.4785 7.42397L7.0041 12.3826Z"
      fill={color}
    />
  </svg>
);

interface ListingCard {
  data: {
    location: string;
    title: string;
    description: string;
    price: number;
    rate: number;
    reviews: number;
    imageUrl: React.ComponentProps<typeof Image>["src"];
  };
}

const ListingCard: React.FC<ListingCard> = ({ data }) => {
  const [like, setLike] = useState(false);
  return (
    <CardContainer>
      <ImageContainer>
        <Link href={`/tours/${data.title}`}>
          <Image src={data.imageUrl} alt="Scenic Forest" layout="fill" />
        </Link>
        <ActionButton onClick={() => setLike(!like)}>
          <SVGHeart width={20} height={20} color={like ? "red" : "white"} />
        </ActionButton>
      </ImageContainer>
      <Link href={`/tours/${data.title}`}>
        <DetailsContainer>
          <p className="location">{data.location}</p>
          <TitlePriceContainer>
            <h1>{data.title}</h1>
            <h1>₱ {data.price}</h1>
          </TitlePriceContainer>
          <DescriptionContainer>{data.description}</DescriptionContainer>
          <ReviewsContainer>
            <Rate disabled defaultValue={data.rate} />
            <p>{data.reviews} Reviews</p>
          </ReviewsContainer>
        </DetailsContainer>
      </Link>
    </CardContainer>
  );
};

export default ListingCard;
