import { PanelSection } from "@components/commons/common";
import HeaderSection from "@components/commons/header-section";
import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";
import ListingCard from "./listing-card";
import TourA from "@assets/images/tour_a.jpg";
import TourB from "@assets/images/tour_b.jpg";
import TourC from "@assets/images/tour_c.jpg";

const ListCardsContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Panel = styled(PanelSection)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Description = styled.div`
  font-size: 0.9rem;
  display: flex;
  color: #596363;
  justify-content: space-between;

  a {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 0.6rem;
  }
`;

const MainPageListing = () => {
  const data = [
    {
      location: `Tour A`,
      title: "El Nido Island Tour A",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu aliquam ligula. Pellentesque ut nunc consequat, dapibus nisi vitae, euismod velit. Pellentesque sit amet enim elit.",
      price: 1000,
      rate: 5,
      reviews: 84,
      imageUrl: TourA,
    },
    {
      location: `Tour B`,
      title: "El Nido Island Tour B",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu aliquam ligula. Pellentesque ut nunc consequat, dapibus nisi vitae, euismod velit. Pellentesque sit amet enim elit.",
      price: 1000,
      rate: 5,
      reviews: 87,
      imageUrl: TourB,
    },
    {
      location: `Tour C`,
      title: "El Nido Island Tour C",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu aliquam ligula. Pellentesque ut nunc consequat, dapibus nisi vitae, euismod velit. Pellentesque sit amet enim elit.",
      price: 1000,
      rate: 5,
      reviews: 97,
      imageUrl: TourC,
    },
  ];

  return (
    <Panel>
      <HeaderSection>Adventure, guided wonders await.</HeaderSection>
      <Description>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <Link href={"/tours"}>View All Tours</Link>
      </Description>
      <ListCardsContainer>
        {data.map((data, key) => (
          <ListingCard key={key} data={data} />
        ))}
      </ListCardsContainer>
    </Panel>
  );
};

export default MainPageListing;
