import { PanelSection } from "@components/commons/common";
import HeaderSection from "@components/commons/header-section";
import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";
import ListingCard from "./listing-card";

const ListCardsContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
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
  const dataArray = Array.from({ length: 3 }, (e, index) => ({
    location: `Tour ${index + 1}`,
    title: "Kayangan Lake",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu aliquam ligula. Pellentesque ut nunc consequat, dapibus nisi vitae, euismod velit. Pellentesque sit amet enim elit.",
    price: (index + 1) * 1000,
    rate: 5,
    reviews: 45,
  }));

  console.log(dataArray);
  return (
    <Panel>
      <HeaderSection>Adventure, guided wonders await.</HeaderSection>
      <Description>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <Link href={"/tours"}>View All Tours</Link>
      </Description>
      <ListCardsContainer>
        {dataArray.map((datas, key) => (
          <ListingCard key={key} data={datas} />
        ))}
      </ListCardsContainer>
    </Panel>
  );
};

export default MainPageListing;
