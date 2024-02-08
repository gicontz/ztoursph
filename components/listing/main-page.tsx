import { PanelSection } from "@components/commons/common";
import HeaderSection from "@components/commons/header-section";
import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";
import ListingCard from "./listing-card";
import { TToursResponse } from "@app/modules/tours/types";
import Loading from "@components/commons/loading";
import { getTours, useTours } from "@app/modules/tours/actions";

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
  const [store, dispatch] = useTours();

  React.useEffect(() => {
    getTours(dispatch, { pageNumber: 1, pageSize: 3 });
  }, []);

  return (
    <Panel>
      <HeaderSection>Adventure, guided wonders await.</HeaderSection>
      <Description>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <Link href={"/tours"}>View All Tours</Link>
      </Description>
      <ListCardsContainer>
        {!store.isLoading && store.tours ? (
          store.tours
            ?.slice(0, 3)
            .map((data, key) => <ListingCard key={key} data={data} />)
        ) : (
          <Loading />
        )}
      </ListCardsContainer>
    </Panel>
  );
};

export default MainPageListing;
